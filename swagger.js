const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'cse341-personal-xvsu.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js', './routes/carbrands.js', './routes/country.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);