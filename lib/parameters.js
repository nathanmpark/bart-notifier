var schemas = require('./schemas')

module.exports = {
  id: {
    description: 'The entity ID.',
    location: 'path',
    required: true,
    schema: {
      type: 'string',
      pattern: schemas.patterns.stationId
    }
  },
  skip: {
    description: 'Skip the first N results.',
    location: 'query',
    default: 0, 
    schema: {
      type: 'integer',
      minimum: 0
    }
  },
  limit: {
    description: 'Limit the number of results returned.',
    location: 'query',
    default: 10,
    schema: {
      type: 'integer',
      minimum: 1
    }
  }
}


