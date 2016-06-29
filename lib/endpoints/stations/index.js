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

  // -- config

  // XXX: document this
  enabled: {
    find: true,
    findObject: true,
    '*': false
  },
  collection: 'stations',
    
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


