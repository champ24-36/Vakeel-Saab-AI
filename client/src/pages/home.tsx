import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatInterface } from "@/components/chat/chat-interface";
import { SignupModal } from "@/components/auth/signup-modal";
import { 
  MessageCircle, 
  Users, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin,
  Clock,
  Globe,
  Shield
} from "lucide-react";
import heroBgImage from "@/assets/hero-bg.jpg";

export default function Home() {
  return (
    <div className="bg-vintage-cream">
      {/* Hero Section */}
      <section 
        className="text-white py-16 lg:py-24 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${heroBgImage})` }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
                Your AI Legal Assistant
                <span className="text-antique-gold block">at Your Service</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Get instant legal advice, connect with qualified lawyers in your area, and access legal resources in your preferred Indian language. Professional legal assistance made accessible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat">
                  <Button 
                    size="lg"
                    className="bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors btn-vintage"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Start Chat
                  </Button>
                </Link>
                <Link href="/lawyers">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-antique-gold text-antique-gold hover:bg-antique-gold hover:text-vintage-navy transition-colors btn-vintage"
                  >
                    Find Lawyers
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Classical courthouse with columns" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vintage-navy/20 to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-antique-gold rounded-full flex items-center justify-center shadow-lg"
              >
                <Shield className="w-10 h-10 text-vintage-navy" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Chat Preview Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-vintage-navy mb-4">
              AI Legal Assistant
            </h2>
            <p className="text-lg text-vintage-charcoal">
              Ask legal questions in your preferred language and get instant, accurate responses
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ChatInterface className="max-w-3xl mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-vintage-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-vintage-navy mb-4">
              Why Choose LegalAI?
            </h2>
            <p className="text-lg text-vintage-charcoal">
              Comprehensive legal assistance powered by advanced AI technology
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "24/7 AI Assistance",
                description: "Get instant legal advice anytime, anywhere with our advanced AI legal assistant trained on Indian law."
              },
              {
                icon: Globe,
                title: "Multi-Language Support", 
                description: "Communicate in your preferred Indian language with our multilingual AI that understands regional legal contexts."
              },
              {
                icon: Users,
                title: "Expert Network",
                description: "Connect with verified lawyers in your area when you need human expertise for complex legal matters."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 card-hover text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-antique-gold rounded-full flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-vintage-navy" />
                    </div>
                    <h3 className="text-xl font-semibold text-vintage-navy mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-vintage-charcoal leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-vintage-navy mb-6">
                Get Started in Minutes
              </h2>
              <p className="text-lg text-vintage-charcoal mb-8 leading-relaxed">
                Whether you need quick legal advice or want to connect with experienced lawyers, our platform makes legal assistance accessible to everyone across India.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: MessageCircle, text: "Ask AI legal questions instantly", href: "/chat" },
                  { icon: Users, text: "Find qualified lawyers nearby", href: "/lawyers" },
                  { icon: BookOpen, text: "Read latest legal insights", href: "/blog" }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={item.href}>
                      <a className="flex items-center space-x-4 p-4 rounded-lg border-2 border-transparent hover:border-antique-gold hover:bg-vintage-cream transition-all duration-300 group cursor-pointer">
                        <div className="w-12 h-12 bg-antique-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <item.icon className="w-6 h-6 text-vintage-navy" />
                        </div>
                        <span className="text-vintage-charcoal group-hover:text-vintage-navy font-medium">
                          {item.text}
                        </span>
                      </a>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Card className="bg-vintage-navy text-white p-8 shadow-2xl">
                <CardContent className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold">Ready to Get Started?</h3>
                  <p className="text-gray-300">
                    Join thousands of users who trust LegalAI for their legal needs. Create your account today and get instant access to our AI legal assistant.
                  </p>
                  
                  <SignupModal>
                    <Button 
                      size="lg"
                      className="w-full bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors btn-vintage"
                    >
                      Create Free Account
                    </Button>
                  </SignupModal>
                  
                  <div className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/auth">
                      <a className="text-antique-gold hover:underline">Sign in here</a>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-16 bg-vintage-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Have questions about our services? Our team is here to help you navigate your legal needs.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "support@legalai.co.in" },
                  { icon: Phone, label: "Phone", value: "+91 1800-LEGAL-AI" },
                  { icon: MapPin, label: "Office", value: "Connaught Place, New Delhi, India" }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-12 h-12 bg-antique-gold rounded-full flex items-center justify-center">
                      <contact.icon className="w-6 h-6 text-vintage-navy" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{contact.label}</h4>
                      <p className="text-gray-300">{contact.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-vintage-navy mb-6">
                    Send us a Message
                  </h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-antique-gold"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-antique-gold"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-antique-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-vintage-charcoal mb-2">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-antique-gold resize-none"
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors btn-vintage"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
