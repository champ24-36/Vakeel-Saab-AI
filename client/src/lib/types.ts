export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferredLanguage: string;
  createdAt?: Date;
}

export interface Lawyer {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  location: string;
  experience: number;
  rating: number;
  reviewCount: number;
  bio?: string;
  languages: string[];
  verified: boolean;
  createdAt?: Date;
}

export interface ChatMessage {
  id: number;
  userId?: number;
  message: string;
  response?: string;
  language: string;
  messageType: 'text' | 'voice' | 'file';
  createdAt?: Date;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  featured: boolean;
  publishedAt?: Date;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Date;
}

export interface ChatRequest {
  message: string;
  language: string;
  userId?: number;
  messageType?: 'text' | 'voice' | 'file';
}

export interface LawyerSearchFilters {
  location?: string;
  specialization?: string;
  experience?: string;
}

export interface VoiceRecordingState {
  isRecording: boolean;
  isProcessing: boolean;
  audioBlob?: Blob;
  error?: string;
}

export interface FileUploadState {
  isUploading: boolean;
  file?: File;
  error?: string;
}

export interface AuthState {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  currentLanguage: string;
  error?: string;
}
