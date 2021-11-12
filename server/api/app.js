const path = require('path');
const express = require('express');
const OpenApiValidator = require('express-openapi-validator');
const setAPIRouting = require('./routes');
const errorHandler = require('./middlewares/error.handler');

const app = express();
// swagger setup
const root = path.normalize(`${__dirname}/..`);
const apiSpec = path.join(__dirname, 'api.yml');
const validateResponses = !!(
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION &&
  process.env.OPENAPI_ENABLE_RESPONSE_VALIDATION.toLowerCase() === 'true'
);

// here we are again with new express version and bundled middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${root}/public`));
app.use(process.env.OPENAPI_SPEC || '/api/spec', express.static(apiSpec));
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateResponses,
    ignorePaths: /.*\/spec(\/|$)/,
  })
);

setAPIRouting(app);
app.use(errorHandler);

module.exports = app;
