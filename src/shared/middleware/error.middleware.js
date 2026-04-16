// ============================================================================
// File: src/shared/middleware/error.middleware.js
// Description: Global error handling middleware.
// Enforces the standard response envelope: { success: false, error: string }
// per API Contract v2.0 §1.2.
// ============================================================================

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // If the status code is 200 but we threw an error, make it a 500 (Server Error)
  // Otherwise, use the status code defined in your service/controller (like 400 or 401)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // You can also use err.statusCode if you attached it in your Service layer
  if (err.statusCode) statusCode = err.statusCode;

  let message = err.message;

  // MySQL-specific error translation (api_procedure_spec_v0.md §14)
  if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
    statusCode = 409;
    message = 'A record with this value already exists';
  }

  // Standard response envelope: { success: false, error: string }
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
