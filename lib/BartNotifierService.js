/*******************************************************************************
 * Bart Notifier App
 ******************************************************************************/

var fs = require('fs')
var http = require('http')
var path = require('path')
var qs = require('querystring')
var timers = require('timers')
var url = require('url')
var util = require('util')

var _ = require('lodash')
var fibrous = require('fibrous')
var xml2js = require('xml2js')

var carbon = require('carbon-io')
var carbond = carbon.carbond
var o = carbon.atom.o(module)
var _o = carbon.bond._o(module)
var oo = carbon.atom.oo(module)
var __ = carbon.fiber.__(module, true)

var ENV = {
  DB_URI: 'BART_NOTIFIER_DB_URI',
  BART_API_KEY: 'BART_NOTIFIER_BART_API_KEY',
  TWILIO_API_KEY: 'BART_NOTIFIER_TWILIO_API_KEY',
  TWILIO_SID: 'BART_NOTIFIER_TWILIO_SID',
  TWILIO_NUMBER: 'BART_NOTIFIER_TWILIO_NUMBER',
}

module.exports = { 
  _type: carbond.ObjectServer,

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
    _type: 'carbond/security/MongoDBApiKeyAuthenticator',
    dbName: 'bart-notifier',
    userCollection: 'users',
    apiKeyField: 'apiKey'
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
      option: {
        'path': {
          position: 1,
          metavar: 'PATH',
          default: path.join(__dirname, 'fixtures'),
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
   * instance variables
   *
   ************************************************************************/

  _notifier: null,

  /*************************************************************************
   *
   * startup
   *
   ************************************************************************/

  __seedDb: function(options) {
    var self = this
    try {
      self._initializeDatabaseConnections()
      self._clearDb()
      self._seedDb(options.seedDb.path)
      self.stop(function () { process.exit(0) })
    }
    catch (e) {
      self.logError(e.toString())
      self.stop(function () { process.exit(1) })
    }
  },

  __clearDb: function(options) {
    var self = this
    try {
      self._initializeDatabaseConnections()
      self._clearDb()
      self.stop(function () { process.exit(0) })
    }
    catch (e) {
      self.logError(e.toString())
      self.stop(function () { process.exit(1) })
    }
  },

  _main: {
    'seedDb': function(options) {
      this.__seedDb(options)
    },
    'clearDb': function(options) {
      this.__clearDb(options)
    }
  },
  
  doStart: function(options, cb) {
    var self = this
    self._start_notifier()
    carbond.ObjectServer.prototype.doStart.call(self, options, cb)
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
        self.db.getCollection(col.name).drop()
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

    var col = self.objectserver.db.getCollection(self.cols.stations)
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

    var col = self.objectserver.db.getCollection(self.cols.arrivals)

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

      data = xml2js.parseString.sync(response.body)

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
  _getUserFromAPIKey: function(req) {
    var self = this

    // FIXME: we should be getting this from the headers
    //        var key = req.get(API_KEY_HEADER_NAME)
    var key = req.query[API_KEY_HEADER_NAME]

    if (typeof key == 'undefined') {
      throw new carbond.HttpErrors.Unauthorized('missing required header: ' + 
                                                API_KEY_HEADER_NAME)
    }

    var users_col = self.objectserver.db.getCollection(self.cols.users)

    var user = users_col.findOne({ key: key })
    if (user == null) {
      throw new carbond.HttpErrors.Forbidden()
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
    
    // FIXME: api key should be in the headers
    
    notifications: _o('./endpoints/notifications')
  }
}
