export const errorHandler = (err, req, res, next) => {
  console.error("Error caught by middleware:", err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
};
