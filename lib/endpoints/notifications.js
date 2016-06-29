var _ = require('lodash')
var BSON = require('leafnode').BSON

var carbon = require('carbon-io')
var carbond = carbon.carbond
var o = carbon.atom.o(module)
var _o = carbon.bond._o(module)

var params = require('../parameters')
var schemas = require('../schemas')

function checkNotificationTime(dt, delta) {
  return !(_.isNaN(dt)) && dt - delta > Date.now()
}

var notificationEntity = {
  _type: carbond.Endpoint,

  // -- metadata

  description: 'Arrival notification details.',

  // --------------------------------------------------------------------------
  // -- parameters
  // --------------------------------------------------------------------------

  // :id path parameter
  
  // --------------------------------------------------------------------------
  // -- GET operations
  // --------------------------------------------------------------------------
  
  get: {

    // ------------------------------------------------------------------------
    // -- metadata
    // ------------------------------------------------------------------------

    description: 'Retrieve a specific notification.',

    // ------------------------------------------------------------------------
    // -- GET parameters
    // ------------------------------------------------------------------------
    
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

    // ------------------------------------------------------------------------
    // -- GET response
    // ------------------------------------------------------------------------
    
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

    // ------------------------------------------------------------------------
    // -- GET implementation
    // ------------------------------------------------------------------------

    service: function(req) {
      var self = this

      var user = self.objectserver._getUser(req)
      var notifications_col = self.objectserver.db.getCollection(self.objectserver.cols.notifications)

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
    }
  },
  
  // --------------------------------------------------------------------------
  // -- PATCH
  // --------------------------------------------------------------------------

  patch: {

    // ------------------------------------------------------------------------
    // -- PATCH metadata
    // ------------------------------------------------------------------------

    description: 'Update a notification.',
    
    // ------------------------------------------------------------------------
    // -- PATCH parameters
    // ------------------------------------------------------------------------
    
    parameters: {
      body: {
        description: 'Notification object.',
        location: 'body',
        required: true,
        schema: params.notification_update_body
      },
      'bart-key': {
        description: 'test header',
        location: 'header',
        required: false,
        schema: {type: 'string'}

      }
    },

    // ------------------------------------------------------------------------
    // -- PATCH implementation
    // ------------------------------------------------------------------------

    service: function(req, res) {
      var self = this

      var user = self.objectserver._getUser(req)
      var col = self.objectserver.db.getCollection(
        self.objectserver.cols.notifications)

      var notification = col.findOne({
            user: user._id.toString(),
            _id: BSON.ObjectID(req.params.id),
            '$or': [{deleted: {'$exists': false}}, {deleted: false}]
      })

      if (notification === null) {
        throw new self.objectserver.errors.NotFound()
      }

      notification.datetime = req.body.datetime || notification.datetime
      if (typeof notification.datetime === 'string') {
        notification.datetime = Date.parse(notification.datetime)
      }
      
      if (req.body.delta) {
        notification.delta = req.body.delta * 60 * 1000
      }

      if (!checkNotificationTime(notification.datetime, notification.delta)) {
        throw new carbond.HttpErrors.BadRequest('bad datetime: ' + req.body.datetime)
      }

      var scol = self.objectserver.db.getCollection(self.objectserver.cols.stations)

      if (req.body.station) {
        if (scol.findOne({'_id': req.body.station.toUpperCase()}) == null) {
          throw new self.objectserver.errors.BadRequest('unknown station: ' + req.body.station)
        }
        notification.station = req.body.station
      }

      if (req.body.destination) {
        // FIXME: this test should be tighter
        if (scol.findOne({'_id': req.body.destination.toUpperCase()}) == null) {
          throw new carbond.HttpErrors.BadRequest('unknown destination: ' + req.body.destination)
        }
        notification.destination = req.body.destination
      }

      var util = require('util')
      console.log(util.inspect(notification))

      col.save(notification, {w: 1})

      res.status(204).end()
    }
  },
 
  // --------------------------------------------------------------------------
  // -- DELETE
  // --------------------------------------------------------------------------

  delete: {

    // ------------------------------------------------------------------------
    // -- DELETE metadata
    // ------------------------------------------------------------------------

    description: 'Cancel a specific notification.',

    // ------------------------------------------------------------------------
    // -- DELETE implementation
    // ------------------------------------------------------------------------

    service: function(req, res) {
      var self = this

      var user = self.objectserver._getUser(req)
      var col = self.objectserver.db.getCollection(
        self.objectserver.cols.notifications)

      var ret = col.update({
        '$or': [
          {
            user: user._id.toString(),
            _id: BSON.ObjectID(req.params.id),
            deleted: {'$exists': false}
          },
          {
            user: user._id.toString(),
            _id: BSON.ObjectID(req.params.id),
            deleted: false
          }
        ]
      }, 
      {
        '$set': {deleted: true}
      }, {w: 1})

      if (ret === 0) {
        throw new self.objectserver.errors.NotFound()
      }
      res.status(204).end()
    }
  }
}

var notificationList = {
  _type: carbond.Endpoint,

  // --------------------------------------------------------------------------
  // -- metadata
  // --------------------------------------------------------------------------

  description: 'Arrival notifications.',

  // --------------------------------------------------------------------------
  // -- parameters
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // -- operations
  // --------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------
  // -- GET
  // --------------------------------------------------------------------------
  
  get: {

    // ------------------------------------------------------------------------
    // -- GET metadata
    // ------------------------------------------------------------------------

    description: 'List active arrival notifications.',

    // ------------------------------------------------------------------------
    // -- GET response
    // ------------------------------------------------------------------------
    
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

    // ------------------------------------------------------------------------
    // -- GET parameters
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    // -- GET implementation
    // ------------------------------------------------------------------------

    service: function(req) {
      var self = this

      var user = self.objectserver._getUser(req)
      var notifications_col = self.objectserver.db.getCollection(self.objectserver.cols.notifications)
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

  // --------------------------------------------------------------------------
  // -- POST
  // --------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    // -- POST metadata
    // ------------------------------------------------------------------------
    
    description: 'Create a new notification.',

    // ------------------------------------------------------------------------
    // -- POST parameters
    // ------------------------------------------------------------------------
    
    parameters: {
      body: {
        description: 'Notification object',
        location: 'body',
        required: true,
        schema: params.notification_create_body
      }
    },

    // ------------------------------------------------------------------------
    // -- POST response
    // ------------------------------------------------------------------------

    responseSchema: {
      type: 'object'
    },

    // ------------------------------------------------------------------------
    // -- POST implementation
    // ------------------------------------------------------------------------
    
    service: function(req, res) {
      // XXX: add check for pre-existing notifications
      
      var self = this

      var user = self.objectserver._getUser(req)

      var col = self.objectserver.db.getCollection(self.objectserver.cols.stations)
      if (col.findOne({'_id': req.body.station.toUpperCase()}) == null) {
        throw new self.objectserver.errors.BadRequest('unknown station: ' + req.body.station)
      }
      // FIXME: this test should be tighter
      if (col.findOne({'_id': req.body.destination.toUpperCase()}) == null) {
        throw new self.objectserver.errors.BadRequest('unknown destination: ' + req.body.destination)
      }
      var delta = req.body.delta * 60 * 1000
      var dt = Date.parse(req.body.datetime)
      if (!checkNotificationTime(dt, delta)) {
        throw new self.objectserver.errors.BadRequest('bad datetime: ' + req.body.datetime)
      }

      var col = self.objectserver.db.getCollection(self.objectserver.cols.notifications)

      var ret = col.insert({
        user: user._id.toString(),
        station: req.body.station.toUpperCase(),
        destination: req.body.destination.toUpperCase(),
        datetime: dt,
        delta: delta,
        notified: false,
        deleted: false
      }, {w: 1})

      return { 'creation': 'succeeded' }
    }
  },

  // --------------------------------------------------------------------------
  // -- DELETE
  // --------------------------------------------------------------------------

  delete: {

    // ------------------------------------------------------------------------
    // -- DELETE metadata
    // ------------------------------------------------------------------------

    description: 'Cancel all active notifications.',

    // ------------------------------------------------------------------------
    // -- DELETE implementation
    // ------------------------------------------------------------------------

    service: function(req) {
      var self = this

      var user = self.objectserver._getUser(req)
      var col = self.objectserver.db.getCollection(
        self.objectserver.cols.notifications)

      var ret = col.update(
        {
          '$or': [
            {
              user: user._id.toString(),
              deleted: {'$exists': false}
            },
            {
              user: user._id.toString(),
              deleted: false
            }
          ]
        }, 
        {
          '$set': {deleted: true}
        }, {w: 1})

      if (ret === 0) {
        throw new self.objectserver.errors.NotFound()
      }
      res.status(204).end()
    }
  },
  
  // --------------------------------------------------------------------------
  // -- endpoints
  // --------------------------------------------------------------------------
  
  endpoints: {
    ':id': o(notificationEntity)
  }
}

module.exports = o(notificationList)

