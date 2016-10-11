/*******************************************************************************
 * Bart Notifier App
 ******************************************************************************/

var fs = require('fs')
var http = require('http')
var path = require('path')
var qs = require('querystring')
var url = require('url')
var util = require('util')

var _ = require('lodash')
var fibrous = require('fibrous')
var xml2js = require('xml2js')

var carbon = require('carbon-io')
var carbond = carbon.carbond
var HttpErrors = carbon.HttpErrors
var o = carbon.atom.o(module)
var _o = carbon.bond._o(module)
var oo = carbon.atom.oo(module)
var __ = carbon.fiber.__.main(module)

var ENV = {
  DB_URI: 'BART_NOTIFIER_DB_URI',
  BART_API_KEY: 'BART_NOTIFIER_BART_API_KEY',
  TWILIO_API_KEY: 'BART_NOTIFIER_TWILIO_API_KEY',
  TWILIO_SID: 'BART_NOTIFIER_TWILIO_SID',
  TWILIO_NUMBER: 'BART_NOTIFIER_TWILIO_NUMBER',
}

var bns = {
  _type: carbond.Service,

  /*************************************************************************
   *
   * config
   *
   ************************************************************************/

  // -- carbond properties

  serviceName: 'Bart Notifier Service',
  description: 'An API to query up-to-date arrival times and schedule arrival notifications',
  dbUri: _o('env:' + ENV.DB_URI) || 'mongodb://localhost:27017/bart-notifier',

  // -- authentication

  authenticator: o({
    _type: carbond.security.MongoDBApiKeyAuthenticator,
    apiKeyParameterName: 'api_key',
    apiKeyLocation: 'header',
    userCollection: 'users',
    apiKeyField: 'key'
  }),

  // -- app properties

  cols: {
    users: 'users',
    stations: 'stations',
    arrivals: 'arrivals',
    notifications: 'notifications'
  },
  service: {
    arrivalCacheDuration: 60,
    notifierUpdateInterval: 300
  },
  bart: {
    arrivalOffset: 120,
    api: {
      uri: "http://api.bart.gov/api/",
      key: _o('env:' + ENV.BART_API_KEY) || 'MW9S-E7SL-26DU-VV8V',
      endpoints: {
        estimated_departure_times: {
          path: "etd.aspx"
        },
        stations: {
          path: "stn.aspx"
        }
      }
    }
  },
  twillio: {
    number: _o('env:' + ENV.TWILIO_NUMBER),
    sid: _o('env:' + ENV.TWILIO_SID),
    key: _o('env:' + ENV.TWILIO_API_KEY)
  },
  
  /*************************************************************************
   *
   * command line
   *
   ************************************************************************/
  
  cmdargs: {
    'seedDb': {
      command: true,
      full: 'seed-db', 
      property: true,
      help: 'clear and reinitialize the database',
      cmdargs: {
        'path': {
          position: 0,
          metavar: 'PATH',
          property: true
        }
      }
    },
    'clearDb': {
      command: true,
      full: 'clear-db',
      property: true,
      help: 'clear the database'
    }
  },

  /*************************************************************************
   *
   * environment variables
   *
   ************************************************************************/
  environmentVariables: {
    [ENV.DB_URI]: {
      help: 'the database uri'
    },
    [ENV.BART_API_KEY]: {
      help: 'your BART API key'
    },
    [ENV.TWILIO_API_KEY]: {
      help: 'your twilio API key'
    },
    [ENV.TWILIO_SID]: {
      help: 'your twilio SID'
    },
    [ENV.TWILIO_NUMBER]: {
      help: 'your twilio number'
    }
  },

  /*************************************************************************
   *
   * instance variables
   *
   ************************************************************************/

  _notifier: null,

  /*************************************************************************
   *
   * busyLimiter
   *
   ************************************************************************/
  //busyLimiter: {
  //  absMaxOutstandingReqs: 5
  //},

  /*************************************************************************
   *
   * startup
   *
   ************************************************************************/

  __seedDb: function(options) {
    var self = this
    var exitVal = 0
    try {
      self._initializeDatabaseConnections()
      self._clearDb()
      self._seedDb(options.seedDb.path)
    }
    catch (e) {
      self.logError(e.toString())
      exitVal = 1
    }
    self._closeDatabaseConnections()
    process.exit(exitVal)
  },

  __clearDb: function(options) {
    var self = this
    var exitVal = 0
    try {
      self._initializeDatabaseConnections()
      self._clearDb()
    }
    catch (e) {
      self.logError(e.toString())
      exitVal = 1
    }
    self._closeDatabaseConnections()
    process.exit(exitVal)
  },

  _main: {
    'seedDb': function(options) {
      this.__seedDb(options)
    },
    'clearDb': function(options) {
      this.__clearDb(options)
    }
  },
  
  doStart: function(options) {
    var self = this
    self._start_notifier()
    carbond.Service.prototype.doStart.call(self, options)
  },

  /*************************************************************************
   *
   * instance methods
   *
   ************************************************************************/

  _clearDb: function() {
    var self = this
    _.map(self.db.getCollectionNames(), function(col) {
      try {
        self.db.getCollection(col).drop()
      }
      catch (e) {
        //pass
      }
    })
  },

  _seedDb: function(fixturePath) {
    // XXX: without the {safe: true} options, the collection does not get created
    //      the following never gets called in db.js:
    //
    //        1053   this.listCollections({name:collectionName}).toArray(function(err, collections) {
    var self = this

    var col = self.db.createCollection(self.cols.stations, {safe: true})
  
    var stations = null
    try {
      stations = JSON.parse(
                  fs.readFileSync(
                    path.join(fixturePath, 'stations.json'), 'utf8'))
    }
    catch (e) {
      self.logError('failed to read stations fixture: ' + e.toString())
      return 1
    }

    for (var name in stations) {
      var doc = _.extend({'_id': name}, stations[name])
      // XXX: using the vanilla version of this, i get "'Error: writeConcern requires callback'"
      col.insert(doc, {w: 0})
    }

    col = self.db.createCollection(self.cols.users, {safe: true})

    var users = null
    try {
      users = JSON.parse(
                fs.readFileSync(
                  path.join(fixturePath, 'users.json'), 'utf8'))
    }
    catch (e) {
      self.logError('failed to read users fixture: ' + e.toString())
      return 1
    }
    for (var i = 0; i < users.length; i++) {
      col.insert(users[i], {w: 0})
    }
    
    self.db.createCollection(self.cols.arrivals, {safe: true})
    self.db.createCollection(self.cols.notifications, {safe: true})
  },

  _start_notifier: function() {
    // start up the notifier fiber
    this._notifier = o({_type: _o('./notifier')})
    __(this._notifier.run.bind(this._notifier))
  },

  _getBartProtocol: function() {
    return url.parse(self.bart.api.uri).protocol
  },

  _getBartETDOpts: function(station) {
    var self = this
    return {
      params: {
        orig: station,
        cmd: 'etd',
        key: self.bart.api.key
      },
      json: false,
      strictSSL: false,
      headers: {
        'Accept': 'application/xml',
        'Accept-Charset': 'utf-8'
      }
    }
  },

  /************************************************************************
   * Check if a station id is valid
   *
   * @param {string} station - the station id
   *
   * @return {boolean}
   *
   * @private
   ************************************************************************/
  _isStationValid: _.memoize(function(station) {
    var self = this

    var col = self.service.db.getCollection(self.cols.stations)
    var station = col.find({'_id': station}, {limit: 1}).toArray().pop()

    return typeof station != 'undefined'
  }),

  /************************************************************************
   * Get the estimated departure time http options
   *
   * @param {string} station - the station id
   *
   * @return {object} - the arrival times for a particular station
   *
   * @private
   ************************************************************************/
  _getOrSetRecentArrivals: function(station) {
    var self = this

    var col = self.service.db.getCollection(self.cols.arrivals)

    var arrival = col.find({
      station: station, 
      created: {
        '$gt': Date.now() - self.service.arrivalCacheDuration * 1000
      }
    }, {limit: 1, sort: 'desc'}).toArray()

    var doc = arrival.pop()
    
    if (typeof doc == "undefined") {
      var opts = self._getBartETDOpts(station)
      var client = _o(self.bart.api.uri + 
                      self.bart.api.endpoints.estimated_departure_times.path,
                      opts)

      try {
        var response = client.get()
      }
      catch (e) {
        self._log.error(e.toString()) 
        throw new self.errors.ServiceUnavailable
      }

      var data = xml2js.parseString.sync(response.body)

      try {
        if ('error' in data.root.message[0]) {
          self._log.error(JSON.stringify(data.root.message[0].error.details))
          throw new self.errors.ServiceUnavailable
        }
      }
      catch (e) {
        if (e instanceof self.errors.ServiceUnavailable ||
            ! e instanceof TypeError) {
          throw e
        }
      }

      doc = {
        station: station,
        created: Date.parse(data.root.date[0] + ' ' + data.root.time[0]),
        arrivals: {}
      }

      var etds = data.root.station[0].etd
      for (var i = 0; i < etds.length; i++) {
        for (var j = 0; j < etds[i].estimate.length; j++) {
          var destination = etds[i].abbreviation[0]
          doc.arrivals[destination] = _.filter(_.map(etds[i].estimate, function(val) {
            // subtract 2 minutes to get "arrival" time
            return (doc.created + 
                    (parseInt(val.minutes[0]) * 60 * 1000) - 
                    (self.bart.arrivalOffset * 1000))
          }), function(num) { return _.isNumber(num) && ! _.isNaN(num) && num > 0 })
        }
      }

      col.insert(doc, {w: 0})
    }

    return doc
  },

  /************************************************************************
   * Retrieve a user record for the supplied API key
   *
   * @param {object} req - an express Request object
   *
   * @return {object} - the arrival times for a particular station
   *
   * @throws {Unauthorized, Forbidden}
   ************************************************************************/
  _getUser: function(req) {
    var self = this
    /*
    // XXX: using query parameter for the time being
    var key = req.headers[self.authenticator.apiKeyParameterName.toLowerCase()]

    if (typeof key == 'undefined') {
      throw new HttpErrors.Unauthorized('missing required header: ' +
                                        self.authenticator.apiKeyParameterName)
    }
    */
    var key = req.query[self.authenticator.apiKeyParameterName.toLowerCase()]

    if (typeof key == 'undefined') {
      throw new HttpErrors.Unauthorized('missing required parameter: ' +
        self.authenticator.apiKeyParameterName)
    }

    var users_col = self.service.db.getCollection(self.cols.users)

    var user = users_col.findOne({ key: key })
    if (user == null) {
      throw new HttpErrors.Forbidden()
    }

    return user
  },

  endpoints: {

    // ------------------------------------------------------------------------
    // 
    // --- /stations/
    //   |
    //   --- /stations/:id/
    //      |
    //      --- /stations/:id/destinations/
    //      |
    //      --- /stations/:id/arrivals/
    //
    // ------------------------------------------------------------------------
    
    stations: _o('./endpoints/stations'),

    // ------------------------------------------------------------------------
    // 
    // --- /notifications/
    //   |
    //   --- /notifications/:id/
    // 
    // ------------------------------------------------------------------------
    
    notifications: _o('./endpoints/notifications')
  }
}

module.exports = bns

if (require.main === module) {
  __(function() {
    o.main(bns)
  })
}

