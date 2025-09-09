export const responseTimeMiddleware = (req, res, next) => {
  const startTime = Date.now();
  const requestTimestamp = new Date().toISOString();

  // Override the res.end method to capture when the response is sent
  const originalEnd = res.end;
  res.end = function (...args) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    const responseTimestamp = new Date().toISOString();

    // Add response time and timestamps to headers
    res.set("X-Response-Time", `${responseTime}ms`);
    res.set("X-Request-Timestamp", requestTimestamp);
    res.set("X-Response-Timestamp", responseTimestamp);

    // Log the response time with timestamps in green color
    console.log(
      `\x1b[32m[${requestTimestamp}] ${req.method} ${req.originalUrl} - ${responseTime}ms [Response: ${responseTimestamp}]\x1b[0m`
    );

    // Call the original end method
    return originalEnd.apply(this, args);
  };

  next();
};
