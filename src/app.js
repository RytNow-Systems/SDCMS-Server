import express from 'express';
import cors from 'cors';
import yaml from 'yamljs';

// Import Domain Routes (Note the mandatory .js extension)
import authRoutes from './interfaces/http/routes/auth.routes.js';
import employeeRoutes from './interfaces/http/routes/employee.routes.js';
import courierRoutes from './interfaces/http/routes/courier.routes.js';
import productRoutes from './interfaces/http/routes/product.routes.js';
import orderRoutes from './interfaces/http/routes/order.routes.js';
import senderRoutes from './interfaces/http/routes/sender.routes.js';
import receiverRoutes from './interfaces/http/routes/receiver.routes.js';
import parcelRoutes from './interfaces/http/routes/parcel.routes.js';
import parcelEventsRoutes from './interfaces/http/routes/parcel-events.routes.js';
import bulkUploadRoutes from './interfaces/http/routes/bulk-upload.routes.js';
import systemRoutes from './interfaces/http/routes/system.routes.js';
import dashboardRoutes from './interfaces/http/routes/dashboard.routes.js';
import notificationRoutes from './interfaces/http/routes/notification.routes.js';

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
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/courier-partners', courierRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/senders', senderRoutes);
app.use('/api/v1/receivers', receiverRoutes);
app.use('/api/v1/parcels', parcelRoutes);
app.use('/api/v1/parcel-events', parcelEventsRoutes);
app.use('/api/v1/bulk-uploads', bulkUploadRoutes);
app.use('/api/v1/system', systemRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1', notificationRoutes);

// SwaggerUI Documentation
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// ----------------------------------------------------
// Error Middlewares (MUST BE ABSOLUTE LAST)
// ----------------------------------------------------
app.use(notFound);       // If the URL didn't match /api/users or /api-docs, it hits this 404
app.use(errorHandler);   // If a controller throws an Error, this catches it

// Exporting using ES Module syntax
export default app;
