import { motion } from "framer-motion";
import { ChatInterface } from "@/components/chat/chat-interface";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mic, 
  FileText, 
  Globe, 
  Shield, 
  Clock,
  Zap,
  Users
} from "lucide-react";

export default function Chat() {
  const features = [
    {
      icon: Mic,
      title: "Voice Input",
      description: "Speak your legal questions naturally"
    },
    {
      icon: FileText,
      title: "Document Analysis",
      description: "Upload legal documents for AI review"
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Chat in your preferred Indian language"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your conversations are confidential"
    }
  ];

  const quickPrompts = [
    "What are the requirements for starting a business in India?",
    "How to register a property in my name?",
    "What are my rights as an employee?",
    "How to file for divorce in India?",
    "What is the process for trademark registration?",
    "What are the tax implications of property sale?"
  ];

  return (
    <div className="min-h-screen bg-vintage-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-antique-gold rounded-full flex items-center justify-center shadow-lg">
              <MessageCircle className="w-8 h-8 text-vintage-navy" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-vintage-navy mb-4">
            AI Legal Assistant
          </h1>
          <p className="text-xl text-vintage-charcoal max-w-3xl mx-auto">
            Get instant legal advice powered by advanced AI. Ask questions, upload documents, 
            or use voice input in your preferred language.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Chat Interface */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ChatInterface />
            </motion.div>

            {/* Quick Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-vintage-navy mb-4">
                    Quick Legal Questions
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {quickPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="text-left p-3 border-2 border-gray-200 rounded-lg hover:border-antique-gold hover:bg-vintage-cream transition-all duration-300 text-sm text-vintage-charcoal"
                      >
                        {prompt}
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-vintage-navy mb-4">
                    AI Features
                  </h3>
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 bg-antique-gold rounded-full flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-vintage-navy" />
                        </div>
                        <div>
                          <h4 className="font-medium text-vintage-navy text-sm">
                            {feature.title}
                          </h4>
                          <p className="text-xs text-vintage-charcoal">
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-vintage-navy text-white shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Platform Stats</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Users, label: "Active Users", value: "50K+" },
                      { icon: MessageCircle, label: "Questions Answered", value: "1M+" },
                      { icon: Clock, label: "Avg Response Time", value: "2 sec" },
                      { icon: Zap, label: "Accuracy Rate", value: "95%" }
                    ].map((stat, index) => (
                      <div key={stat.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <stat.icon className="w-4 h-4 text-antique-gold" />
                          <span className="text-sm">{stat.label}</span>
                        </div>
                        <Badge className="bg-antique-gold text-vintage-navy">
                          {stat.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Legal Disclaimer */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-yellow-50 border-yellow-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">
                        Legal Disclaimer
                      </h4>
                      <p className="text-sm text-yellow-700 leading-relaxed">
                        This AI provides general legal information and should not be considered as legal advice. 
                        For specific legal matters, please consult with a qualified lawyer.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
