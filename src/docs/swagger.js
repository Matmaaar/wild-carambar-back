const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wild Carambar API',
      version: '1.0.0',
      description: 'API de blagues Carambar 🍬'
    },
    servers: [
      { url: 'http://localhost:5000/api/v1' }
    ]
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
