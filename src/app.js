import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import yaml from 'yamljs';

// Import Domain Routes (Note the mandatory .js extension)
import userRoutes from './interfaces/http/routes/user.routes.js';

// Import Error Middlewares
import { notFound, errorHandler } from './shared/middleware/error.middleware.js';

// Loading OpenAPI Spec
const swaggerDocument = yaml.load('./swagger.yaml');

// running server
const app = express();

// ----------------------------------------------------
// Top-Level Middlewares (Parsers and CORS)
// ----------------------------------------------------
app.use(cors());
app.use(express.json()); // Essential so that req.body works in your controllers!
app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// Application Routes
// ----------------------------------------------------
// Standard practice: group routes by their domain module
app.use('/api/users', userRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// ----------------------------------------------------
// Error Middlewares (MUST BE ABSOLUTE LAST)
// ----------------------------------------------------
app.use(notFound);       // If the URL didn't match /api/users or /api-docs, it hits this 404
app.use(errorHandler);   // If a controller throws an Error, this catches it

// Exporting using ES Module syntax
export default app;
