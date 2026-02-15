const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'dishdash-api-qiws.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/african.js', './routes/asian.js', './routes/western.js', './routes/other.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);