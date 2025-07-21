import { Pool, neonConfig } from '@neondatabase/serverless'; // Import Pool class and configuration helper from Neon serverless package
import { drizzle } from 'drizzle-orm/neon-serverless'; // Import Drizzle ORM factory for Neon
import ws from "ws"; // Node WebSocket implementation for Neon to use
import * as schema from "@shared/schema"; // Shared database schema types

neonConfig.webSocketConstructor = ws; // Tell Neon to use the ws implementation for WebSockets

if (!process.env.DATABASE_URL) { // Ensure the DATABASE_URL env variable exists
  throw new Error( // Throw an explicit error if it does not
    "DATABASE_URL must be set. Did you forget to provision a database?", // Helpful error message
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL }); // Create a Postgres connection pool
export const db = drizzle({ client: pool, schema }); // Initialise Drizzle ORM with the pool and schema