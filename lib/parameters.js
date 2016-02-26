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
  },
  notification_create_body: {
    type: 'object',
    properties: {
      station: {type: 'string'},
      destination: {type: 'string'},
      datetime: {
        'anyOf': [
          {type: 'string'},
          {type: 'integer', minimum: 0}
        ]
      },
      delta: { 
        type: 'integer',
        minimum: 10,
        maximum: 30
      }
    },
    required: ['station', 'destination', 'datetime', 'delta'],
    additionalProperties: false
  },
  notification_update_body: {
    type: 'object',
    properties: {
      station: {type: 'string'},
      destination: {type: 'string'},
      datetime: {
        'anyOf': [
          {type: 'string'},
          {type: 'integer', minimum: 0}
        ]
      },
      delta: { 
        type: 'integer',
        minimum: 10,
        maximum: 30
      }
    },
    minProperties: 1,
    additionalProperties: false
  }
}


