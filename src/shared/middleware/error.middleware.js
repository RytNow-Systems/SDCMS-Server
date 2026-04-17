// ============================================================================
// File: src/shared/middleware/error.middleware.js
// Description: Global error handling middleware.
// Enforces the standard response envelope: { success: false, error: string }
// per API Contract v2.0 §1.2.
//
// MySQL Error Translation (api_procedure_spec_v1.md §12):
//   - prc_check_duplicate_XXX SIGNAL (SQLSTATE 45000 + 'duplicate') → 409
//   - ER_DUP_ENTRY / errno 1062 (hard constraint)                  → 409
//   - Generic SIGNAL / Rollback (SQLSTATE 45000, non-duplicate)     → 400
//   - No rows found (handled by service layer throw)                → 404
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

  // ------------------------------------------------------------------
  // MySQL Error Translation Layer
  // Maps stored procedure errors to appropriate HTTP status codes.
  // Order matters: check specific patterns before generic ones.
  // ------------------------------------------------------------------

  // 1. prc_check_duplicate_XXX trigger — SIGNAL SQLSTATE '45000' with 'duplicate' keyword
  //    These are custom duplicate checks fired by the stored procedure.
  if (err.sqlState === '45000' && err.message && err.message.toLowerCase().includes('duplicate')) {
    statusCode = 409;
    message = err.message; // Use the SP's descriptive duplicate message
  }

  // 2. Hard constraint duplicate (ER_DUP_ENTRY / errno 1062)
  //    Fired by MySQL UNIQUE constraints when the SP doesn't catch it first.
  else if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
    statusCode = 409;
    message = 'A record with this value already exists';
  }

  // 3. Generic SIGNAL / Business rule violations (SQLSTATE 45000, non-duplicate)
  //    These are custom business rule errors fired by stored procedures
  //    (e.g., invalid state transitions, blocked operations).
  else if (err.sqlState === '45000') {
    statusCode = 400;
    message = err.message; // Use the SP's custom business rule message
  }

  // 4. Other MySQL errors (connection, syntax, etc.)
  //    Don't expose raw DB internals to the client.
  else if (err.sqlState && statusCode === 500) {
    message = 'A database error occurred. Please try again later.';
  }

  // Standard response envelope: { success: false, error: string }
  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};
