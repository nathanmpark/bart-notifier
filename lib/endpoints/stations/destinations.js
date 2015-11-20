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
  
  description: 'Per station destinations.',

  // -- operations

  get: {
  
    // -- GET metadata
  
    description: 'Retrieve a list of valid destinations for a particular station.',

    // -- GET response
    
    responseSchema: {
      type: 'array',
      items: {
        type: 'string',
        pattern: schemas.patterns.stationId
      },
      additionalItems: false
    },

    // -- GET implementation

    service: function(req) {
      var self = this

      var station = req.params.id.toUpperCase()

      if (! self.objectserver._isStationValid(station)) {
        throw new self.objectserver.errors.BadRequest(
                      'unrecognized station ' + station)
      }

      var doc = self.objectserver._getOrSetRecentArrivals(station)

      return _.keys(doc.arrivals)
    }
  }
})

