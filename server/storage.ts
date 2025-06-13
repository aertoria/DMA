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
            position: { x: 50, y: 400 },
            data: { 
              label: 'Campaign Start',
              trigger: 'New subscriber signup'
            }
          },
          {
            id: 'analytics-start',
            type: 'analytics',
            position: { x: 250, y: 400 },
            data: { 
              label: 'Entry Tracking',
              event: 'Campaign entry',
              conversionRate: '100%'
            }
          },
          {
            id: 'email-1',
            type: 'email',
            position: { x: 450, y: 400 },
            data: { 
              label: 'Welcome Email',
              subject: 'Welcome! Your journey starts here 🚀',
              openRate: '24%'
            }
          },
          {
            id: 'delay-1',
            type: 'delay',
            position: { x: 650, y: 400 },
            data: { 
              label: 'Initial Wait',
              duration: '6 hours'
            }
          },
          {
            id: 'split-1',
            type: 'split',
            position: { x: 850, y: 400 },
            data: { 
              label: 'Open Rate Split',
              condition: 'Email opened within 6h'
            }
          },
          {
            id: 'email-2a',
            type: 'email',
            position: { x: 1050, y: 250 },
            data: { 
              label: 'High Engagement Path',
              subject: 'Ready for advanced features?',
              openRate: '31%'
            }
          },
          {
            id: 'email-2b',
            type: 'email',
            position: { x: 1050, y: 550 },
            data: { 
              label: 'Re-engagement Sequence',
              subject: 'We miss you! Here\'s what you\'re missing',
              openRate: '18%'
            }
          },
          {
            id: 'leadScoring-1',
            type: 'leadScoring',
            position: { x: 1250, y: 250 },
            data: { 
              label: 'Engagement Scorer',
              score: '45/100',
              criteria: 'Email opens + time on page'
            }
          },
          {
            id: 'delay-2a',
            type: 'delay',
            position: { x: 1450, y: 250 },
            data: { 
              label: 'Nurture Wait',
              duration: '2 days'
            }
          },
          {
            id: 'delay-2b',
            type: 'delay',
            position: { x: 1250, y: 550 },
            data: { 
              label: 'Re-engagement Wait',
              duration: '1 day'
            }
          },
          {
            id: 'webhook-1',
            type: 'webhook',
            position: { x: 1650, y: 250 },
            data: { 
              label: 'CRM Update',
              url: 'https://api.salesforce.com/leads'
            }
          },
          {
            id: 'email-3a',
            type: 'email',
            position: { x: 1850, y: 250 },
            data: { 
              label: 'Product Demo Invite',
              subject: 'Ready for a personalized demo?',
              openRate: '28%'
            }
          },
          {
            id: 'email-3b',
            type: 'email',
            position: { x: 1450, y: 550 },
            data: { 
              label: 'Educational Content',
              subject: 'Master these 5 marketing strategies',
              openRate: '22%'
            }
          },
          {
            id: 'analytics-2',
            type: 'analytics',
            position: { x: 1650, y: 550 },
            data: { 
              label: 'Content Engagement',
              event: 'Article read time',
              conversionRate: '12.8%'
            }
          },
          {
            id: 'split-2',
            type: 'split',
            position: { x: 2050, y: 250 },
            data: { 
              label: 'Demo Interest Split',
              condition: 'Demo request clicked'
            }
          },
          {
            id: 'leadScoring-2',
            type: 'leadScoring',
            position: { x: 1850, y: 550 },
            data: { 
              label: 'Content Engagement Scorer',
              score: '65/100',
              criteria: 'Article engagement + email consistency'
            }
          },
          {
            id: 'webhook-2',
            type: 'webhook',
            position: { x: 2250, y: 150 },
            data: { 
              label: 'Sales Alert',
              url: 'https://api.hubspot.com/hot-leads'
            }
          },
          {
            id: 'email-4a',
            type: 'email',
            position: { x: 2450, y: 150 },
            data: { 
              label: 'Sales Handoff',
              subject: 'Your demo is scheduled!',
              openRate: '42%'
            }
          },
          {
            id: 'email-4b',
            type: 'email',
            position: { x: 2250, y: 350 },
            data: { 
              label: 'Demo Follow-up',
              subject: 'Still interested? Let\'s chat',
              openRate: '26%'
            }
          },
          {
            id: 'delay-3',
            type: 'delay',
            position: { x: 2050, y: 550 },
            data: { 
              label: 'Long-term Nurture',
              duration: '1 week'
            }
          },
          {
            id: 'split-3',
            type: 'split',
            position: { x: 2250, y: 550 },
            data: { 
              label: 'Final Qualification',
              condition: 'Lead score >= 70'
            }
          },
          {
            id: 'analytics-3',
            type: 'analytics',
            position: { x: 2450, y: 450 },
            data: { 
              label: 'Conversion Tracker',
              event: 'Trial signup',
              conversionRate: '8.7%'
            }
          },
          {
            id: 'email-5',
            type: 'email',
            position: { x: 2450, y: 650 },
            data: { 
              label: 'Long-term Nurture',
              subject: 'Industry insights & best practices',
              openRate: '19%'
            }
          },
          {
            id: 'webhook-3',
            type: 'webhook',
            position: { x: 2650, y: 450 },
            data: { 
              label: 'Analytics Export',
              url: 'https://api.mixpanel.com/events'
            }
          },
          {
            id: 'leadScoring-final',
            type: 'leadScoring',
            position: { x: 2650, y: 650 },
            data: { 
              label: 'Final Lead Score',
              score: '92/100',
              criteria: 'Full campaign engagement'
            }
          }
        ],
        edges: [
          { id: 'e1', source: 'start-1', target: 'analytics-start' },
          { id: 'e2', source: 'analytics-start', target: 'email-1' },
          { id: 'e3', source: 'email-1', target: 'delay-1' },
          { id: 'e4', source: 'delay-1', target: 'split-1' },
          { id: 'e5a', source: 'split-1', target: 'email-2a', sourceHandle: 'a' },
          { id: 'e5b', source: 'split-1', target: 'email-2b', sourceHandle: 'b' },
          { id: 'e6a', source: 'email-2a', target: 'leadScoring-1' },
          { id: 'e6b', source: 'email-2b', target: 'delay-2b' },
          { id: 'e7', source: 'leadScoring-1', target: 'delay-2a' },
          { id: 'e8', source: 'delay-2a', target: 'webhook-1' },
          { id: 'e9', source: 'webhook-1', target: 'email-3a' },
          { id: 'e10', source: 'delay-2b', target: 'email-3b' },
          { id: 'e11', source: 'email-3b', target: 'analytics-2' },
          { id: 'e12', source: 'email-3a', target: 'split-2' },
          { id: 'e13', source: 'analytics-2', target: 'leadScoring-2' },
          { id: 'e14a', source: 'split-2', target: 'webhook-2', sourceHandle: 'a' },
          { id: 'e14b', source: 'split-2', target: 'email-4b', sourceHandle: 'b' },
          { id: 'e15', source: 'webhook-2', target: 'email-4a' },
          { id: 'e16', source: 'leadScoring-2', target: 'delay-3' },
          { id: 'e17', source: 'delay-3', target: 'split-3' },
          { id: 'e18a', source: 'split-3', target: 'analytics-3', sourceHandle: 'a' },
          { id: 'e18b', source: 'split-3', target: 'email-5', sourceHandle: 'b' },
          { id: 'e19', source: 'analytics-3', target: 'webhook-3' },
          { id: 'e20', source: 'email-5', target: 'leadScoring-final' }
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
