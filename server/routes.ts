import type { Express } from "express"; // Express app type
import { createServer, type Server } from "http"; // Node HTTP server utilities
import { storage } from "./storage"; // Data access layer
import { insertCampaignSchema, insertProjectSchema, insertCustomerSchema, insertChatMessageSchema } from "@shared/schema"; // Zod schemas for validation
import { generateAIResponse } from "./lib/openai"; // OpenAI helper for chat responses

export async function registerRoutes(app: Express): Promise<Server> { // Register all API endpoints and return HTTP server
  // Campaigns
  app.get("/api/campaigns", async (_req, res) => { // List campaigns
    try {
      const campaigns = await storage.getCampaigns(); // Fetch from DB
      res.json(campaigns); // Return JSON
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" }); // Server error
    }
  });

  app.get("/api/campaigns/:id", async (req, res) => { // Get single campaign
    try {
      const id = parseInt(req.params.id); // Parse ID param
      const campaign = await storage.getCampaign(id); // Fetch record
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" }); // Not found
      }
      res.json(campaign); // Return campaign
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaign" }); // Server error
    }
  });

  app.post("/api/campaigns", async (req, res) => { // Create campaign
    try {
      const validatedData = insertCampaignSchema.parse(req.body); // Validate input
      const campaign = await storage.createCampaign(validatedData); // Insert
      res.status(201).json(campaign); // Return created
    } catch (error) {
      res.status(400).json({ message: "Invalid campaign data" }); // Bad request
    }
  });

  app.put("/api/campaigns/:id", async (req, res) => { // Update campaign
    try {
      const id = parseInt(req.params.id); // ID param
      const updates = req.body; // Data to update
      const campaign = await storage.updateCampaign(id, updates); // Update DB
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" }); // Not found
      }
      res.json(campaign); // Return updated
    } catch (error) {
      res.status(500).json({ message: "Failed to update campaign" }); // Server error
    }
  });

  app.delete("/api/campaigns/:id", async (req, res) => { // Delete campaign
    try {
      const id = parseInt(req.params.id); // ID param
      const deleted = await storage.deleteCampaign(id); // Remove from DB
      if (!deleted) {
        return res.status(404).json({ message: "Campaign not found" }); // Not found
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: "Failed to delete campaign" }); // Server error
    }
  });

  // Projects
  app.get("/api/projects", async (_req, res) => { // List projects
    try {
      const projects = await storage.getProjects(); // Fetch all
      res.json(projects); // Return JSON
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" }); // Server error
    }
  });

  app.post("/api/projects", async (req, res) => { // Create project
    try {
      const validatedData = insertProjectSchema.parse(req.body); // Validate
      const project = await storage.createProject(validatedData); // Insert
      res.status(201).json(project); // Created
    } catch (error) {
      res.status(400).json({ message: "Invalid project data" }); // Bad request
    }
  });

  // Customers
  app.get("/api/customers", async (_req, res) => { // List customers
    try {
      const customers = await storage.getCustomers(); // Fetch all
      res.json(customers); // Return JSON
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch customers" }); // Server error
    }
  });

  app.post("/api/customers", async (req, res) => { // Create customer
    try {
      const validatedData = insertCustomerSchema.parse(req.body); // Validate payload
      const customer = await storage.createCustomer(validatedData); // Insert
      res.status(201).json(customer); // Created response
    } catch (error) {
      res.status(400).json({ message: "Invalid customer data" }); // Bad request
    }
  });

  // Chat Messages
  app.get("/api/chat/messages", async (req, res) => { // List chat messages
    try {
      const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined; // Optional filter
      const messages = await storage.getChatMessages(campaignId); // Fetch messages
      res.json(messages); // Return JSON
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch chat messages" }); // Server error
    }
  });

  app.post("/api/chat/messages", async (req, res) => { // Add user message & AI reply
    try {
      const validatedData = insertChatMessageSchema.parse(req.body); // Validate input
      const userMessage = await storage.createChatMessage(validatedData); // Store user message
      
      // Generate AI response
      const campaignId = validatedData.campaignId !== null ? validatedData.campaignId : undefined; // Determine context
      const messages = await storage.getChatMessages(campaignId); // Get conversation history
      const aiResponse = await generateAIResponse(messages); // Call OpenAI
      
      const aiMessage = await storage.createChatMessage({ // Store assistant message
        campaignId: validatedData.campaignId,
        role: "assistant",
        content: aiResponse,
      });

      res.status(201).json({ userMessage, aiMessage }); // Return both messages
    } catch (error) {
      console.error("Failed to create chat message:", error); // Log error
      res.status(400).json({ message: "Failed to process message" }); // Bad request
    }
  });

  const httpServer = createServer(app); // Wrap Express app into HTTP server
  return httpServer; // Return server to caller
}
