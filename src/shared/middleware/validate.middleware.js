// ============================================================================
// File: src/shared/middleware/validate.middleware.js
// Description: Unifies Zod validation for all incoming requests.
// Extracts validation errors into a clean string to match standard API envelope.
// ============================================================================

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
