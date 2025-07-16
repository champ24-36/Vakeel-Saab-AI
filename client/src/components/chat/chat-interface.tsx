import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useFileUpload } from "@/hooks/use-file-upload";
import { LanguageSelector } from "@/components/ui/language-selector";
import { Message } from "./message";
import { 
  Send, 
  Mic, 
  MicOff, 
  Paperclip, 
  X, 
  Loader2 
} from "lucide-react";
import { ChatMessage, ChatRequest } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { API_ENDPOINTS } from "@/lib/constants";

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // Speech recognition
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: speechSupported,
    error: speechError
  } = useSpeechRecognition({
    language: selectedLanguage === 'english' ? 'en-IN' : 'hi-IN',
    continuous: false,
    interimResults: true
  });

  // File upload
  const {
    file,
    isUploading,
    selectFile,
    uploadFile,
    resetFile,
    error: fileError
  } = useFileUpload({
    onUploadSuccess: (result) => {
      if (result.response) {
        const newMessage: ChatMessage = {
          id: result.id,
          message: result.message,
          response: result.response,
          language: result.language,
          messageType: 'file',
          createdAt: new Date(result.createdAt)
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }
  });

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle speech recognition transcript
  useEffect(() => {
    if (transcript) {
      setCurrentMessage(transcript);
    }
  }, [transcript]);

  // Handle speech recognition errors
  useEffect(() => {
    if (speechError) {
      toast({
        title: "Speech Recognition Error",
        description: speechError,
        variant: "destructive",
      });
    }
  }, [speechError, toast]);

  const sendMessage = async (messageText: string, messageType: 'text' | 'voice' = 'text') => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      message: messageText,
      language: selectedLanguage,
      messageType,
      createdAt: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const request: ChatRequest = {
        message: messageText,
        language: selectedLanguage,
        messageType,
        userId: 1 // TODO: Get from auth context
      };

      const response = await apiRequest('POST', API_ENDPOINTS.CHAT.MESSAGE, request);
      const result = await response.json();

      // Simulate typing delay for better UX
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: result.id,
          message: result.message,
          response: result.response,
          language: result.language,
          messageType: result.messageType,
          createdAt: new Date(result.createdAt)
        };

        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(currentMessage);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        sendMessage(transcript, 'voice');
        resetTranscript();
      }
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectFile(selectedFile)) {
      // Auto-upload the file
      uploadFile(API_ENDPOINTS.CHAT.FILE, {
        message: currentMessage || `Analyzing uploaded file: ${selectedFile.name}`,
        language: selectedLanguage,
        userId: 1 // TODO: Get from auth context
      });
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className={`bg-vintage-cream shadow-xl ${className}`}>
      <CardContent className="p-6 lg:p-8">
        {/* Chat Messages */}
        <div className="h-96 bg-white rounded-xl p-6 mb-6 overflow-y-auto vintage-scrollbar border-2 border-gray-200">
          <div className="space-y-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-gray-500 py-8"
              >
                <div className="w-16 h-16 bg-antique-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-8 h-8 text-vintage-navy" />
                </div>
                <p className="text-lg font-medium mb-2">Welcome to LegalAI Assistant</p>
                <p className="text-sm">Ask legal questions, upload documents, or use voice input to get started.</p>
              </motion.div>
            )}
            
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            
            {isTyping && (
              <Message
                message={{
                  id: 0,
                  message: "",
                  response: "",
                  language: selectedLanguage,
                  messageType: 'text'
                }}
                isTyping={true}
              />
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        {/* Language Selector */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="text-sm font-medium text-vintage-charcoal">Language:</label>
          <LanguageSelector
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
            className="w-48"
          />
        </div>

        {/* File Upload Indicator */}
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4"
          >
            <div className="flex items-center space-x-2">
              <Paperclip className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-800">{file.name}</span>
              {isUploading && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFile}
              className="text-blue-600 hover:text-blue-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Input Area */}
        <div className="space-y-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder="Type your legal question here..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resize-none bg-white border-2 border-gray-200 focus:border-antique-gold"
                rows={3}
                disabled={isLoading || isUploading}
              />
              
              {/* Input Controls */}
              <div className="absolute bottom-3 right-12 flex space-x-2">
                {/* File Upload */}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt,.rtf"
                    disabled={isLoading || isUploading}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-antique-gold p-1 h-auto"
                    asChild
                  >
                    <span>
                      <Paperclip className="w-5 h-5" />
                    </span>
                  </Button>
                </label>
                
                {/* Voice Input */}
                {speechSupported && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleVoiceToggle}
                    className={`p-1 h-auto transition-colors ${
                      isListening 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-gray-400 hover:text-antique-gold'
                    }`}
                    disabled={isLoading || isUploading}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                )}
              </div>
            </div>
            
            {/* Send Button */}
            <Button
              onClick={handleSend}
              disabled={!currentMessage.trim() || isLoading || isUploading}
              className="bg-antique-gold text-vintage-navy hover:brightness-110 px-6 py-3"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
          
          {/* Status Indicators */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 flex items-center space-x-2"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Listening... Speak now</span>
            </motion.div>
          )}
          
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-blue-600 flex items-center space-x-2"
            >
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing file...</span>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
