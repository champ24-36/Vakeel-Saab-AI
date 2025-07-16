import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Scale, User, Volume2, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage as ChatMessageType } from "@/lib/types";

interface MessageProps {
  message: ChatMessageType;
  isTyping?: boolean;
}

export function Message({ message, isTyping = false }: MessageProps) {
  const isUser = !message.response;
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = message.language === 'english' ? 'en-IN' : 'hi-IN';
      speechSynthesis.speak(utterance);
    }
  };

  const getMessageTypeIcon = () => {
    switch (message.messageType) {
      case 'voice':
        return <Volume2 className="w-3 h-3" />;
      case 'file':
        return <FileText className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-antique-gold text-vintage-navy">
            <Scale className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isUser ? 'order-first' : ''}`}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className={`chat-bubble ${
            isUser ? 'chat-bubble-user' : 'chat-bubble-ai'
          }`}
        >
          {/* Message Type Indicator */}
          {getMessageTypeIcon() && (
            <div className="flex items-center space-x-1 mb-2 opacity-70">
              {getMessageTypeIcon()}
              <span className="text-xs capitalize">{message.messageType}</span>
            </div>
          )}
          
          {/* User Message */}
          {isUser && (
            <p className="text-sm leading-relaxed">{message.message}</p>
          )}
          
          {/* AI Response */}
          {!isUser && (
            <>
              {isTyping ? (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              ) : (
                <div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.response}
                  </p>
                  
                  {/* Text-to-Speech Button */}
                  {message.response && (
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speak(message.response!)}
                        className="text-xs p-1 h-auto hover:bg-gray-200"
                      >
                        <Volume2 className="w-3 h-3 mr-1" />
                        Listen
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
        
        {/* Timestamp */}
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.createdAt ? new Date(message.createdAt).toLocaleTimeString() : 'Just now'}
        </div>
      </div>
      
      {isUser && (
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-gray-300 text-gray-600">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </motion.div>
  );
}
