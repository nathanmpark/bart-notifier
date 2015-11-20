var _ = require('lodash')

var carbon = require('carbon-io')
var carbond = carbon.carbond
var o = carbon.atom.o(module)
var _o = carbon.bond._o(module)

var params = require('../../parameters')
var schemas = require('../../schemas')

module.exports = o({
  _type: carbond.Endpoint,

  // -- metadata

  description: 'Per station estimated arrival times.',

  // -- operations

  get: {

    // -- metadata

    description: 'Retrieve a list of estimated arrival times for a particular ' +
                 'station',

    // -- parameters

    parameters: {
      ':id': _.extend({}, params.id, {description: 'The station id.'}),
      destination: _.extend({}, params.id, {
        description: 'Filter results by destination (e.g., "RICH" for all ' +
                     'Richmond bound trains)',
        location: 'query'
      })
    },

    // -- response

    responseSchema: {
      type: 'object',
      properties: {
        patternProperties: {
          '^[a-zA-Z0-9]{4}$': {
            type: 'string'
          }
        }
      },
    },

    // -- implementation

    service: function(req) {
      var self = this

      var station = req.params.id.toUpperCase()

      if (! self.objectserver._isStationValid(station)) {
        throw new self.objectserver.errors.BadRequest(
                      'unrecognized station ' + station)
      }

      var doc = self.objectserver._getOrSetRecentArrivals(station)
      var created = doc.created
      var now = Date.now()

      doc = doc.arrivals
      
      // filter for destination
      if (typeof req.query.destination != "undefined") {
        if (! (req.query.destination instanceof Array)) {
          req.query.destination = [req.query.destination]
        }
        req.query.destination = _.map(req.query.destination,
                                      function(val) {return val.toUpperCase()})
        req.query.destination.forEach(function(station) {
          if (! self.objectserver._isStationValid(station)) {
            throw new self.objectserver.errors.BadRequest(
                          'unrecognized station ' + station)
          }
        })
        doc = _.pick(doc, _.map(req.query.destination,
          function(val) {return val.toUpperCase()}))
      }

      // filter out results for trains already arrived
      for (var station in doc) {
        doc[station] = 
          _.map(_.filter(doc[station], 
                         function(val) { return val >= now }),
                function(val) { return (new Date(val)).toTimeString() })
      }

      return doc
    }
  }
})


