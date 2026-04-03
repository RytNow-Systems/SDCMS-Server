import express from 'express';
import cors from 'cors';
import yaml from 'yamljs';

// Import Domain Routes (Note the mandatory .js extension)
import authRoutes from './interfaces/http/routes/auth.routes.js';
import orderRoutes from './interfaces/http/routes/order.routes.js';

// Import Error Middlewares
import { notFound, errorHandler } from './shared/middleware/error.middleware.js';


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
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);

// SwaggerUI Documentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// ----------------------------------------------------
// Error Middlewares (MUST BE ABSOLUTE LAST)
// ----------------------------------------------------
app.use(notFound);       // If the URL didn't match /api/users or /api-docs, it hits this 404
app.use(errorHandler);   // If a controller throws an Error, this catches it

// Exporting using ES Module syntax
export default app;
