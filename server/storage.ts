import { 
  users, lawyers, chatMessages, blogPosts, contactMessages,
  type User, type InsertUser,
  type Lawyer, type InsertLawyer,
  type ChatMessage, type InsertChatMessage,
  type BlogPost, type InsertBlogPost,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lawyer operations
  getAllLawyers(): Promise<Lawyer[]>;
  getLawyer(id: number): Promise<Lawyer | undefined>;
  searchLawyers(filters: { location?: string; specialization?: string; experience?: string }): Promise<Lawyer[]>;
  createLawyer(lawyer: InsertLawyer): Promise<Lawyer>;
  
  // Chat operations
  getUserChatHistory(userId: number): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getFeaturedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private lawyers: Map<number, Lawyer>;
  private chatMessages: Map<number, ChatMessage>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentLawyerId: number;
  private currentChatId: number;
  private currentBlogId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.lawyers = new Map();
    this.chatMessages = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentLawyerId = 1;
    this.currentChatId = 1;
    this.currentBlogId = 1;
    this.currentContactId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed lawyers
    const sampleLawyers = [
      {
        name: "Advocate Rajesh Kumar",
        email: "rajesh.kumar@legalai.com",
        phone: "+91 98765 43210",
        specialization: "Corporate & Commercial Law",
        location: "Mumbai, Maharashtra",
        experience: 12,
        rating: 48,
        reviewCount: 127,
        bio: "Experienced corporate lawyer with expertise in mergers, acquisitions, and commercial litigation.",
        languages: ["English", "Hindi", "Marathi"],
        verified: true,
        createdAt: new Date(),
      },
      {
        name: "Advocate Priya Sharma",
        email: "priya.sharma@legalai.com",
        phone: "+91 98765 43211",
        specialization: "Family & Matrimonial Law",
        location: "Delhi, India",
        experience: 8,
        rating: 49,
        reviewCount: 89,
        bio: "Specialist in family law matters including divorce, custody, and matrimonial disputes.",
        languages: ["English", "Hindi", "Punjabi"],
        verified: true,
        createdAt: new Date(),
      },
      {
        name: "Advocate Arun Mehta",
        email: "arun.mehta@legalai.com",
        phone: "+91 98765 43212",
        specialization: "Criminal & Constitutional Law",
        location: "Bangalore, Karnataka",
        experience: 15,
        rating: 47,
        reviewCount: 203,
        bio: "Senior advocate specializing in criminal defense and constitutional matters.",
        languages: ["English", "Hindi", "Kannada"],
        verified: true,
        createdAt: new Date(),
      },
    ];

    sampleLawyers.forEach(lawyer => {
      const id = this.currentLawyerId++;
      this.lawyers.set(id, { 
        ...lawyer, 
        id,
        languages: lawyer.languages as string[]
      });
    });

    // Seed blog posts
    const sampleBlogPosts = [
      {
        title: "New Digital Privacy Laws: What Indian Businesses Need to Know",
        slug: "digital-privacy-laws-indian-businesses",
        excerpt: "The recently passed Digital Personal Data Protection Act 2023 brings significant changes to how businesses handle customer data.",
        content: "The Digital Personal Data Protection Act 2023 represents a landmark shift in India's approach to data privacy...",
        author: "Dr. Kavita Jain",
        authorRole: "Senior Legal Analyst",
        category: "Data Privacy",
        featured: true,
        publishedAt: new Date("2024-11-15"),
      },
      {
        title: "Supreme Court Ruling on Property Rights: Key Takeaways",
        slug: "supreme-court-property-rights-ruling",
        excerpt: "Recent landmark judgment clarifies several aspects of property ownership and transfer procedures.",
        content: "The Supreme Court's recent judgment on property rights has clarified several important aspects...",
        author: "Advocate Suresh Patel",
        authorRole: "Property Law Expert",
        category: "Property Law",
        featured: false,
        publishedAt: new Date("2024-11-12"),
      },
      {
        title: "GST Updates: New Compliance Requirements for Small Businesses",
        slug: "gst-updates-small-businesses",
        excerpt: "The latest GST amendments introduce new filing requirements that small business owners should be aware of.",
        content: "Recent amendments to the GST framework have introduced several new compliance requirements...",
        author: "CA Meera Singh",
        authorRole: "Tax Consultant",
        category: "Tax Law",
        featured: false,
        publishedAt: new Date("2024-11-10"),
      },
    ];

    sampleBlogPosts.forEach(post => {
      const id = this.currentBlogId++;
      this.blogPosts.set(id, { ...post, id });
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser,
      phone: insertUser.phone ?? null,
      preferredLanguage: insertUser.preferredLanguage || 'English',
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  // Lawyer operations
  async getAllLawyers(): Promise<Lawyer[]> {
    return Array.from(this.lawyers.values());
  }

  async getLawyer(id: number): Promise<Lawyer | undefined> {
    return this.lawyers.get(id);
  }

  async searchLawyers(filters: { location?: string; specialization?: string; experience?: string }): Promise<Lawyer[]> {
    let results = Array.from(this.lawyers.values());
    
    if (filters.location) {
      results = results.filter(lawyer => 
        lawyer.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }
    
    if (filters.specialization && filters.specialization !== "All Areas") {
      results = results.filter(lawyer => 
        lawyer.specialization.toLowerCase().includes(filters.specialization!.toLowerCase())
      );
    }
    
    if (filters.experience && filters.experience !== "Any Experience") {
      const expRange = filters.experience;
      results = results.filter(lawyer => {
        if (expRange === "0-5 years") return lawyer.experience <= 5;
        if (expRange === "5-10 years") return lawyer.experience > 5 && lawyer.experience <= 10;
        if (expRange === "10+ years") return lawyer.experience > 10;
        return true;
      });
    }
    
    return results;
  }

  async createLawyer(insertLawyer: InsertLawyer): Promise<Lawyer> {
    const id = this.currentLawyerId++;
    const lawyer: Lawyer = { 
      ...insertLawyer,
      rating: insertLawyer.rating ?? 0,
      reviewCount: insertLawyer.reviewCount ?? 0, 
      bio: insertLawyer.bio ?? null,
      languages: Array.isArray(insertLawyer.languages) ? insertLawyer.languages : [],
      verified: insertLawyer.verified ?? false,
      id, 
      createdAt: new Date() 
    };
    this.lawyers.set(id, lawyer);
    return lawyer;
  }

  // Chat operations
  async getUserChatHistory(userId: number): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(message => message.userId === userId)
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = this.currentChatId++;
    const message: ChatMessage = { 
      ...insertMessage,
      userId: insertMessage.userId ?? null,
      language: insertMessage.language || 'English',
      messageType: insertMessage.messageType || 'text',
      response: insertMessage.response ?? null,
      id, 
      createdAt: new Date() 
    };
    this.chatMessages.set(id, message);
    return message;
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async getFeaturedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.featured)
      .sort((a, b) => (b.publishedAt?.getTime() || 0) - (a.publishedAt?.getTime() || 0));
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogId++;
    const post: BlogPost = { 
      ...insertPost,
      featured: insertPost.featured ?? false,
      id, 
      publishedAt: new Date() 
    };
    this.blogPosts.set(id, post);
    return post;
  }

  // Contact operations
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
