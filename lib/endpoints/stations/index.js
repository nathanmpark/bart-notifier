var _ = require('lodash')

var carbon = require('carbon-io')
var carbond = carbon.carbond
var o = carbon.atom.o(module)
var _o = carbon.bond._o(module)

var params = require('../../parameters')

module.exports = o({
  _type: carbond.mongodb.MongoDBCollection,
  
  // -- metadata

  // XXX: does the doc generator pick up the default parameters that come
  //      with MongoDBcollection endpoints?
  description: 'get station information',

  /*
  limiter: o({
    _type: carbond.security.limiter.PolicyLimiter,
    selector: o({
      _type: carbond.security.limiter.selector.ReqPropertyLimiterSelector,
      propertyPath: 'user._id',
      transform: function(id) {
        return id.toString()
      },
    }),
    policy: o({
      _type: carbond.security.limiter.policy.WindowLimiterPolicy
    })
  }),
  */

  // -- config

  // XXX: document this
  enabled: {
    find: true,
    findObject: true,
    '*': false
  },

  collection: 'stations',

  defaultSchema: {
    type: 'object',
    properties: {
      _id: { type: 'string' }
    },
    required: ['_id'],
    additionalProperties: true
  },

  // -- endpoints

  endpoints: {
    
    // -------------------------------
    // -- /stations/:id/destinations/
    // -------------------------------

    ':id/destinations': _o('./destinations'),

    // ---------------------------
    // -- /stations/:id/arrivals/
    // ---------------------------

    ':id/arrivals': _o('./arrivals')
  }
})


