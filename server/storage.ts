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
    // Sophisticated demo campaign
    const demoCampaign: Campaign = {
      id: this.currentCampaignId++,
      name: "Test Campaign",
      description: "Advanced marketing automation with A/B testing, personalization, and behavioral triggers",
      status: "active",
      flowData: {
        nodes: [
          {
            id: 'start-1',
            type: 'start',
            position: { x: 50, y: 200 },
            data: { 
              label: 'Campaign Start',
              trigger: 'New subscriber signup'
            }
          },
          {
            id: 'email-1',
            type: 'email',
            position: { x: 250, y: 200 },
            data: { 
              label: 'Welcome Email',
              subject: 'Welcome! Your journey starts here 🚀',
              openRate: '24%'
            }
          },
          {
            id: 'delay-1',
            type: 'delay',
            position: { x: 450, y: 200 },
            data: { 
              label: 'Wait Period',
              duration: '2 days'
            }
          },
          {
            id: 'split-1',
            type: 'split',
            position: { x: 650, y: 200 },
            data: { 
              label: 'A/B Test Split',
              condition: 'Email engagement level'
            }
          },
          {
            id: 'email-2a',
            type: 'email',
            position: { x: 850, y: 100 },
            data: { 
              label: 'High Engagement Path',
              subject: 'Ready for advanced features?',
              openRate: '31%'
            }
          },
          {
            id: 'email-2b',
            type: 'email',
            position: { x: 850, y: 300 },
            data: { 
              label: 'Re-engagement Path',
              subject: 'We miss you! Here\'s what you\'re missing',
              openRate: '18%'
            }
          },
          {
            id: 'delay-2',
            type: 'delay',
            position: { x: 1050, y: 100 },
            data: { 
              label: 'Follow-up Wait',
              duration: '1 day'
            }
          },
          {
            id: 'webhook-1',
            type: 'webhook',
            position: { x: 1250, y: 100 },
            data: { 
              label: 'CRM Integration',
              url: 'https://api.salesforce.com/lead-scoring'
            }
          },
          {
            id: 'email-3',
            type: 'email',
            position: { x: 1050, y: 300 },
            data: { 
              label: 'Educational Content',
              subject: 'Master these 5 marketing strategies',
              openRate: '22%'
            }
          },
          {
            id: 'analytics-1',
            type: 'analytics',
            position: { x: 1250, y: 300 },
            data: { 
              label: 'Engagement Tracker',
              event: 'Email click-through',
              conversionRate: '15.2%'
            }
          },
          {
            id: 'leadScoring-1',
            type: 'leadScoring',
            position: { x: 1450, y: 100 },
            data: { 
              label: 'Lead Qualifier',
              score: '85/100',
              criteria: 'Multiple email opens + CTA clicks'
            }
          },
          {
            id: 'split-2',
            type: 'split',
            position: { x: 1650, y: 200 },
            data: { 
              label: 'Conversion Split',
              condition: 'Lead score >= 80'
            }
          }
        ],
        edges: [
          { id: 'e1', source: 'start-1', target: 'email-1' },
          { id: 'e2', source: 'email-1', target: 'delay-1' },
          { id: 'e3', source: 'delay-1', target: 'split-1' },
          { id: 'e4a', source: 'split-1', target: 'email-2a', sourceHandle: 'a' },
          { id: 'e4b', source: 'split-1', target: 'email-2b', sourceHandle: 'b' },
          { id: 'e5', source: 'email-2a', target: 'delay-2' },
          { id: 'e6', source: 'delay-2', target: 'webhook-1' },
          { id: 'e7', source: 'email-2b', target: 'email-3' },
          { id: 'e8', source: 'webhook-1', target: 'split-2' },
          { id: 'e9', source: 'email-3', target: 'split-2' }
        ]
      },
      settings: {
        targetAudience: 'B2B SaaS prospects',
        goals: ['increase_engagement', 'lead_nurturing', 'conversion_optimization'],
        abTestVariants: 2,
        estimatedReach: 5420
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.campaigns.set(demoCampaign.id, demoCampaign);

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
      id,
      name: insertCampaign.name,
      description: insertCampaign.description || null,
      status: insertCampaign.status || "draft",
      flowData: insertCampaign.flowData || null,
      settings: insertCampaign.settings || null,
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
      id,
      name: insertProject.name,
      description: insertProject.description || null,
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
      id,
      email: insertCustomer.email,
      firstName: insertCustomer.firstName || null,
      lastName: insertCustomer.lastName || null,
      tags: insertCustomer.tags || null,
      metadata: insertCustomer.metadata || null,
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
      id,
      campaignId: insertMessage.campaignId || null,
      role: insertMessage.role,
      content: insertMessage.content,
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
