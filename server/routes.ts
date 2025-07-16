import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateLegalResponse, transcribeAudio, analyzeLegalDocument } from "./services/openai";
import { 
  insertUserSchema, 
  insertLawyerSchema, 
  insertChatMessageSchema, 
  insertContactMessageSchema 
} from "@shared/schema";
import multer from "multer";

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // User authentication routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: 'Invalid user data', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });

  // Chat routes
  app.post('/api/chat/message', async (req, res) => {
    try {
      const { message, language, userId, messageType = 'text' } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: 'Message is required' });
      }

      // Generate AI response
      const aiResponse = await generateLegalResponse({
        message,
        language: language || 'english',
        messageType,
        userId
      });

      // Save chat message to storage
      const chatMessage = await storage.createChatMessage({
        userId: userId || null,
        message,
        response: aiResponse.response,
        language: language || 'english',
        messageType
      });

      res.json({
        id: chatMessage.id,
        message: chatMessage.message,
        response: aiResponse.response,
        language: aiResponse.language,
        messageType: chatMessage.messageType,
        createdAt: chatMessage.createdAt
      });
    } catch (error) {
      console.error('Chat error:', error);
      res.status(500).json({ 
        message: 'Failed to process chat message', 
        error: error.message 
      });
    }
  });

  app.post('/api/chat/voice', upload.single('audio'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Audio file is required' });
      }

      const { language, userId } = req.body;
      
      // Transcribe audio using OpenAI Whisper
      const transcribedText = await transcribeAudio(req.file.buffer);
      
      if (!transcribedText) {
        return res.status(400).json({ message: 'Could not transcribe audio' });
      }

      // Generate AI response for transcribed text
      const aiResponse = await generateLegalResponse({
        message: transcribedText,
        language: language || 'english',
        messageType: 'voice',
        userId
      });

      // Save chat message
      const chatMessage = await storage.createChatMessage({
        userId: userId || null,
        message: transcribedText,
        response: aiResponse.response,
        language: language || 'english',
        messageType: 'voice'
      });

      res.json({
        id: chatMessage.id,
        transcribedText,
        message: chatMessage.message,
        response: aiResponse.response,
        language: aiResponse.language,
        messageType: 'voice',
        createdAt: chatMessage.createdAt
      });
    } catch (error) {
      console.error('Voice chat error:', error);
      res.status(500).json({ 
        message: 'Failed to process voice message', 
        error: error.message 
      });
    }
  });

  app.post('/api/chat/file', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'File is required' });
      }

      const { message, language, userId } = req.body;
      const fileContent = req.file.buffer.toString('utf-8');
      const fileName = req.file.originalname;
      
      // Analyze document using OpenAI
      const documentAnalysis = await analyzeLegalDocument(fileContent, fileName);
      
      // Combine user message with document analysis
      const fullMessage = message ? `${message}\n\nDocument Analysis:\n${documentAnalysis}` : documentAnalysis;

      // Save chat message
      const chatMessage = await storage.createChatMessage({
        userId: userId || null,
        message: message || `Uploaded file: ${fileName}`,
        response: fullMessage,
        language: language || 'english',
        messageType: 'file'
      });

      res.json({
        id: chatMessage.id,
        message: chatMessage.message,
        response: fullMessage,
        language: language || 'english',
        messageType: 'file',
        fileName,
        createdAt: chatMessage.createdAt
      });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ 
        message: 'Failed to process file', 
        error: error.message 
      });
    }
  });

  app.get('/api/chat/history/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const history = await storage.getUserChatHistory(userId);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch chat history', error: error.message });
    }
  });

  // Lawyer routes
  app.get('/api/lawyers', async (req, res) => {
    try {
      const { location, specialization, experience } = req.query;
      
      let lawyers;
      if (location || specialization || experience) {
        lawyers = await storage.searchLawyers({
          location: location as string,
          specialization: specialization as string,
          experience: experience as string
        });
      } else {
        lawyers = await storage.getAllLawyers();
      }
      
      res.json(lawyers);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch lawyers', error: error.message });
    }
  });

  app.get('/api/lawyers/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const lawyer = await storage.getLawyer(id);
      
      if (!lawyer) {
        return res.status(404).json({ message: 'Lawyer not found' });
      }
      
      res.json(lawyer);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch lawyer', error: error.message });
    }
  });

  app.post('/api/lawyers', async (req, res) => {
    try {
      const lawyerData = insertLawyerSchema.parse(req.body);
      const lawyer = await storage.createLawyer(lawyerData);
      res.status(201).json(lawyer);
    } catch (error) {
      res.status(400).json({ message: 'Invalid lawyer data', error: error.message });
    }
  });

  // Blog routes
  app.get('/api/blog', async (req, res) => {
    try {
      const { featured } = req.query;
      
      let posts;
      if (featured === 'true') {
        posts = await storage.getFeaturedBlogPosts();
      } else {
        posts = await storage.getAllBlogPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts', error: error.message });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    try {
      const slug = req.params.slug;
      const post = await storage.getBlogPost(slug);
      
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog post', error: error.message });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const contactData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(contactData);
      res.status(201).json({ message: 'Message sent successfully', id: message.id });
    } catch (error) {
      res.status(400).json({ message: 'Invalid contact data', error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
