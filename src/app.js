const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs')
const userRoutes = require('./routes/user.routes');

// Loading OpenAPI Spec
const swaggerDocument = YAML.load('./swagger.yaml');

// running server
const app = express();



app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
module.exports = app;