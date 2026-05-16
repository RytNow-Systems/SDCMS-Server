// ============================================================================
// File: src/shared/middleware/validate.middleware.js
// Description: Unifies Zod validation for all incoming requests.
// Extracts validation errors into a clean string to match standard API envelope.
// ============================================================================

export const validateParams = (schema) => (req, res, next) => {
  try {
    req.params = schema.parse(req.params);
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const zodIssues = error.issues || error.errors || [];
      const errorMsg = zodIssues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({ success: false, error: `Validation Error - ${errorMsg}` });
    }
    return res.status(400).json({ success: false, error: 'Bad Request' });
  }
};

// Express 5 defines req.query as a read-only getter — cannot reassign it.
// Store validated + coerced query params on req.validatedQuery instead.
export const validateQuery = (schema) => (req, res, next) => {
  try {
    req.validatedQuery = schema.parse(req.query);
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      const zodIssues = error.issues || error.errors || [];
      const errorMsg = zodIssues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({ success: false, error: `Validation Error - ${errorMsg}` });
    }
    return res.status(400).json({ success: false, error: 'Bad Request' });
  }
};

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // Validates and parses (handles types/defaults)
    next();
  } catch (error) {
    if (error.name === 'ZodError') {
      // Zod 3.24+ uses `.issues`; older versions used `.errors`.
      const zodIssues = error.issues || error.errors || [];
      const errorMsg = zodIssues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(400).json({ success: false, error: `Validation Error - ${errorMsg}` });
    }
    return res.status(400).json({ success: false, error: 'Bad Request Payload' });
  }
};
