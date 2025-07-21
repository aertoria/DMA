import express, { type Express } from "express"; // Import Express types and functions
import fs from "fs"; // Node file system module
import path from "path"; // Node path utilities
import { createServer as createViteServer, createLogger } from "vite"; // Vite dev server factory and logger
import { type Server } from "http"; // Node HTTP server type
import viteConfig from "../vite.config"; // Project Vite configuration
import { nanoid } from "nanoid"; // Unique ID generator for cache busting

const viteLogger = createLogger(); // Create a Vite logger instance

export function log(message: string, source = "express") { // Simple timestamped console logger
  const formattedTime = new Date().toLocaleTimeString("en-US", { // Format current time
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`); // Output combined log line
}

export async function setupVite(app: Express, server: Server) { // Attach Vite middleware in dev
  const serverOptions = {
    middlewareMode: true, // Run Vite in middleware mode rather than standalone server
    hmr: { server }, // Share existing HTTP server for HMR websocket
    allowedHosts: true, // Allow any host (useful in containers)
  };

  const vite = await createViteServer({ // Create Vite dev server instance
    ...viteConfig, // Spread existing config
    configFile: false, // Prevent Vite from re-reading config file
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options); // Log Vite internal errors
        process.exit(1); // Exit process on fatal error
      },
    },
    server: serverOptions, // Apply custom server options
    appType: "custom", // We'll manually handle HTML serving
  });

  app.use(vite.middlewares); // Mount Vite middlewares into Express
  app.use("*", async (req, res, next) => { // Catch-all route for SPA in dev
    const url = req.originalUrl; // Requested URL path

    try {
      const clientTemplate = path.resolve( // Path to index.html
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8"); // Read HTML template
      template = template.replace( // Inject cache-busting query into entry script
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template); // Let Vite transform HTML (HMR, etc.)
      res.status(200).set({ "Content-Type": "text/html" }).end(page); // Send transformed HTML
    } catch (e) {
      vite.ssrFixStacktrace(e as Error); // Improve stacktrace if Vite SSR error
      next(e); // Propagate error to Express handler
    }
  });
}

export function serveStatic(app: Express) { // Serve production build assets
  const distPath = path.resolve(import.meta.dirname, "public"); // Path to built assets

  if (!fs.existsSync(distPath)) { // Ensure build exists
    throw new Error( // Throw descriptive error if missing
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath)); // Serve static files

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => { // SPA fallback route
    res.sendFile(path.resolve(distPath, "index.html")); // Send index.html for unmatched paths
  });
}
