import express, { type Request, Response, NextFunction } from "express"; // Import Express framework and relevant types
import { registerRoutes } from "./routes"; // Function to register API routes
import { setupVite, serveStatic, log } from "./vite"; // Dev/build server helpers and logger

const app = express(); // Create Express application instance
app.use(express.json()); // Enable JSON body parsing middleware
app.use(express.urlencoded({ extended: false })); // Enable URL-encoded body parsing

app.use((req, res, next) => { // Custom middleware for request timing & logging
  const start = Date.now(); // Record start time
  const path = req.path; // Capture request path
  let capturedJsonResponse: Record<string, any> | undefined = undefined; // Placeholder for JSON response body

  const originalResJson = res.json; // Keep original res.json method reference
  res.json = function (bodyJson, ...args) { // Monkey-patch res.json to intercept body
    capturedJsonResponse = bodyJson; // Save body for later logging
    return originalResJson.apply(res, [bodyJson, ...args]); // Call original res.json
  };

  res.on("finish", () => { // After response finishes
    const duration = Date.now() - start; // Calculate request duration
    if (path.startsWith("/api")) { // Only log API routes
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`; // Basic log message
      if (capturedJsonResponse) { // Append JSON response if available
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`; // Attach serialized body
      }

      if (logLine.length > 80) { // Truncate overly long log lines
        logLine = logLine.slice(0, 79) + "…"; // Add ellipsis
      }

      log(logLine); // Output via vite logger helper
    }
  });

  next(); // Continue to next middleware
});

(async () => { // Immediately-invoked async function to start server
  const server = await registerRoutes(app); // Register API routes and get HTTP server

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => { // Global error handler
    const status = err.status || err.statusCode || 500; // Determine status code
    const message = err.message || "Internal Server Error"; // Determine message

    res.status(status).json({ message }); // Send JSON error response
    throw err; // Re-throw for logging/crash
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") { // If in development mode
    await setupVite(app, server); // Attach Vite dev middleware
  } else {
    serveStatic(app); // Serve pre-built static assets in production
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000; // Define listening port
  server.listen({ // Start HTTP server
    port,
    host: "0.0.0.0", // Listen on all network interfaces
    reusePort: true, // Allow port reuse (Docker / clustering)
  }, () => {
    log(`serving on port ${port}`); // Log successful startup
  });
})(); // Execute async bootstrap
