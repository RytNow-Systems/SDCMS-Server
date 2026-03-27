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

  // (Optional) Catch MySQL specific errors if your procedure fails
  // e.g., if (err.code === 'ER_DUP_ENTRY') message = 'Record already exists';

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
