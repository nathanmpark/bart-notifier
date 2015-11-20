var _ = require('lodash')
var BSON = require('leafnode').BSON

var carbon = require('carbon-io')
var carbond = carbon.carbond
var o = carbon.atom.o(module)
var _o = carbon.bond._o(module)

var params = require('../parameters')
var schemas = require('../schemas')

var notificationEntity = {
  _type: carbond.Endpoint,

  // -- metadata

  description: 'Arrival notification details.',

  // -- parameters

  parameters: {
    ':id': _.extend({}, params.id, {
      description: 'The notification ID.',
      schema: {type: 'string'}
    })
  },
  
  // -- GET operations
  
  get: {

    // -- metadata

    description: 'Retrieve a specific notification.',

    // -- GET parameters
    
    parameters: {
      destination: {
        description: 'Filter by destination ID.',
        location: 'query',
        schema: {
          type: 'string',
          pattern: schemas.patterns.stationId
        }
      },
    },

    // -- GET response
    
    responseSchema: {
      type: 'object',
      properties: {
        id: {type: 'string'},
        station: {
          type: 'string',
          pattern: schemas.patterns.stationId
        },
        destination: {
          type: 'string',
          pattern: schemas.patterns.stationId
        },
        datetime: {type: 'string'},
        notified: {type: 'boolean'},
        delta: {type: 'integer'}
      }
    },

    // -- GET implementation

    service: function(req) {
      var self = this

      var user = self.objectserver._getUserFromAPIKey(req)
      var notifications_col = self.objectserver.db.getCollection(self.cols.notifications)

      try {
        var query = { 
          user: user._id.toString(), 
          _id: BSON.ObjectID(req.params.id)
        }
      }
      catch (e) {
        throw new carbond.HttpErrors.BadRequest('bad id: ' + req.params.id)
      }

      if (typeof req.query.destination != 'undefined') {
        query['destination'] = req.query.destination.toUpperCase()
      }

      var notification = notifications_col.findOne(query)

      if (notification == null) {
        return null
      }

      notification.datetime = (new Date(notification.datetime)).toString()
      notification.id = notification._id.toString()
      return _.omit(notification, 'deleted', 'user', '_id')
    },
  }
}

var notificationList = {
  _type: carbond.Endpoint,

  // -- metadata

  description: 'Arrival notifications.',

  // -- parameters

  parameters: {
    'X-Bart-Notifier-API-Key': {
      description: 'user API key required for notification management',
      location: 'query',
      required: true,
      schema: { type: 'string' }
    }
  },

  // -- operations
  
  // -- GET
  
  get: {

    // -- GET metadata

    description: 'List active arrival notifications.',

    // -- GET response
    
    responseSchema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {type: 'string'},
          station: {
            type: 'string',
            pattern: schemas.patterns.stationId
          },
          destination: {
            type: 'string',
            pattern: schemas.patterns.stationId
          },
          datetime: {type: 'string'},
          notified: {type: 'boolean'},
          delta: {type: 'integer'}
        }
      }
    },

    // -- GET parameters

    parameters: {
      destination: {
        description: 'Filter results by destination.',
        location: 'query',
        schema: {
          type: 'string',
          pattern: schemas.patterns.stationId
        }
      },
      skip: params.skip,
      limit: params.limit
    },

    // -- GET implementation

    service: function(req) {
      var self = this

      var user = self.objectserver._getUserFromAPIKey(req)
      var notifications_col = self.objectserver.db.getCollection(self.cols.notifications)
      var query = { 
        user: user._id.toString(), 
        '$or': [
          {
            deleted: {
              '$exists': false
            }
          },
          {
            deleted: false
          }
        ],
        datetime: {
          '$gt': Date.now()
        }
      }

      if (typeof req.query.destination != 'undefined') {
        query['destination'] = req.query.destination.toUpperCase()
      }

      var notifications = notifications_col.find(query, {
        skip: req.query.skip || 0, limit: req.query.limit || 10
      })
      return _.map(notifications.toArray(), function(val) {
        val.datetime = (new Date(val.datetime)).toString()
        val.id = val._id.toString()
        return _.omit(val, 'deleted', 'user', '_id')
      })
    },
  },

  // -- POST

  post: {
    /*
     * {
     * "station": "12th",
     * "destination": "frmt",
     * "datetime": "1441673395099",
     * "delta": 10
     * }
     *
     * {
     * "station": "12th",
     * "destination": "frmt",
     * "datetime": "2015-09-08T00:49:55.099Z",
     * "delta": 10
     * }
     * 
     */

    // -- POST metadata
    
    description: 'create a new notification',

    // -- POST parameters
    
    parameters: {
      body: {
        description: 'create a notification',
        location: 'body',
        required: true,
        schema: {
          type: 'object',
          properties: {
            station: { type: 'string' },
            destination: { type: 'string' },
            datetime: {
              'anyOf': [
                { type: 'string' },
                { type: 'integer', minimum: 0 }
              ]
            },
            delta: { 
              type: 'integer',
              minimum: 10,
              maximum: 30
            }
          }
        }
      }
    },

    // -- POST response

    responseSchema: {
      type: 'object'
    },

    // -- POST implementation
    
    service: function(req) {
      var self = this

      var user = self.objectserver._getUserFromAPIKey(req)

      var col = self.objectserver.db.getCollection(self.cols.stations)
      if (col.findOne({'_id': req.body.station.toUpperCase()}) == null) {
        throw new carbond.HttpErrors.BadRequest('unknown station: ' + req.body.station)
      }
      // FIXME: this test should be tighter
      if (col.findOne({'_id': req.body.destination.toUpperCase()}) == null) {
        throw new carbond.HttpErrors.BadRequest('unknown destination: ' + req.body.destination)
      }
      var delta = req.body.delta * 60 * 1000
      var dt = (new Date(req.body.datetime)).getTime()
      if (_.isNaN(dt) || dt - delta < Date.now()) {
        throw new carbond.HttpErrors.BadRequest('bad datetime: ' + req.body.datetime)
      }

      var col = self.objectserver.db.getCollection(self.cols.notifications)

      col.insert({
        user: user._id.toString(),
        station: req.body.station.toUpperCase(),
        destination: req.body.destination.toUpperCase(),
        datetime: dt,
        delta: delta,
        notified: false,
        deleted: false
      }, { w: 0 })

      return { 'creation': 'succeeded' }
    }
  },

  // -- DELETE

  delete: {

    // -- DELETE metadata

    description: 'Cancel all active notifications.',

    // -- DELETE implementation

    service: function(req) {
      // XXX: why doesn't this get called?
      var self = this

      var user = self.objectserver._getUserFromAPIKey(req)
      var col = self.objectserver.db.getCollection(self.cols.notifications)

      col.remove({}, {safe: true})

      return { 'deletion': 'succeeded' }
    }
  },
  
  // -- endpoints
  
  endpoints: {
    ':id': o(notificationEntity)
  }
}

module.exports = o(notificationList)

