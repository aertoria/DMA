import { 
  users, campaigns, projects, customers, chatMessages,
  type User, type InsertUser,
  type Campaign, type InsertCampaign,
  type Project, type InsertProject,
  type Customer, type InsertCustomer,
  type ChatMessage, type InsertChatMessage
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Campaigns
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: number, updates: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: number): Promise<boolean>;

  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Customers
  getCustomers(): Promise<Customer[]>;
  getCustomer(id: number): Promise<Customer | undefined>;
  createCustomer(customer: InsertCustomer): Promise<Customer>;
  updateCustomer(id: number, updates: Partial<InsertCustomer>): Promise<Customer | undefined>;
  deleteCustomer(id: number): Promise<boolean>;

  // Chat Messages
  getChatMessages(campaignId?: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private campaigns: Map<number, Campaign>;
  private projects: Map<number, Project>;
  private customers: Map<number, Customer>;
  private chatMessages: Map<number, ChatMessage>;
  private currentUserId: number;
  private currentCampaignId: number;
  private currentProjectId: number;
  private currentCustomerId: number;
  private currentChatMessageId: number;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    this.projects = new Map();
    this.customers = new Map();
    this.chatMessages = new Map();
    this.currentUserId = 1;
    this.currentCampaignId = 1;
    this.currentProjectId = 1;
    this.currentCustomerId = 1;
    this.currentChatMessageId = 1;

    // Add some initial sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample campaigns
    const sampleCampaign: Campaign = {
      id: this.currentCampaignId++,
      name: "Email Drip Campaign",
      description: "Welcome series for new subscribers",
      status: "active",
      flowData: {
        nodes: [
          {
            id: '1',
            type: 'start',
            position: { x: 100, y: 100 },
            data: { label: 'Campaign Start' }
          },
          {
            id: '2',
            type: 'email',
            position: { x: 300, y: 100 },
            data: { label: 'Welcome Email', subject: 'Welcome to DeepMonetizy!' }
          }
        ],
        edges: [
          { id: 'e1-2', source: '1', target: '2' }
        ]
      },
      settings: {},
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.set(sampleCampaign.id, sampleCampaign);

    // Sample project
    const sampleProject: Project = {
      id: this.currentProjectId++,
      name: "Q1 Marketing Initiative",
      description: "Email campaigns for Q1 product launch",
      createdAt: new Date(),
    };
    this.projects.set(sampleProject.id, sampleProject);

    // Sample customers
    const sampleCustomer: Customer = {
      id: this.currentCustomerId++,
      email: "user@example.com",
      firstName: "John",
      lastName: "Doe",
      tags: ["new_subscriber"],
      metadata: {},
      createdAt: new Date(),
    };
    this.customers.set(sampleCustomer.id, sampleCustomer);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.currentCampaignId++;
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: number, updates: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const campaign = this.campaigns.get(id);
    if (!campaign) return undefined;

    const updatedCampaign: Campaign = {
      ...campaign,
      ...updates,
      updatedAt: new Date(),
    };
    this.campaigns.set(id, updatedCampaign);
    return updatedCampaign;
  }

  async deleteCampaign(id: number): Promise<boolean> {
    return this.campaigns.delete(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;

    const updatedProject: Project = { ...project, ...updates };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getCustomers(): Promise<Customer[]> {
    return Array.from(this.customers.values());
  }

  async getCustomer(id: number): Promise<Customer | undefined> {
    return this.customers.get(id);
  }

  async createCustomer(insertCustomer: InsertCustomer): Promise<Customer> {
    const id = this.currentCustomerId++;
    const customer: Customer = {
      ...insertCustomer,
      id,
      createdAt: new Date(),
    };
    this.customers.set(id, customer);
    return customer;
  }

  async updateCustomer(id: number, updates: Partial<InsertCustomer>): Promise<Customer | undefined> {
    const customer = this.customers.get(id);
    if (!customer) return undefined;

    const updatedCustomer: Customer = { ...customer, ...updates };
    this.customers.set(id, updatedCustomer);
    return updatedCustomer;
  }

  async deleteCustomer(id: number): Promise<boolean> {
    return this.customers.delete(id);
  }

  async getChatMessages(campaignId?: number): Promise<ChatMessage[]> {
    const messages = Array.from(this.chatMessages.values());
    if (campaignId !== undefined) {
      return messages.filter(msg => msg.campaignId === campaignId);
    }
    return messages;
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatMessageId++;
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
