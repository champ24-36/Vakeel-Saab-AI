import { Link } from "wouter";
import { Scale, Facebook, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-vintage-charcoal text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-antique-gold rounded-full flex items-center justify-center">
                <Scale className="w-5 h-5 text-vintage-navy" />
              </div>
              <span className="text-white font-serif text-xl font-bold">LegalAI</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted AI legal assistant providing accessible legal guidance in multiple Indian languages.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, color: "#DAA520" }}
                href="#"
                className="text-gray-400 hover:text-antique-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#DAA520" }}
                href="#"
                className="text-gray-400 hover:text-antique-gold transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, color: "#DAA520" }}
                href="#"
                className="text-gray-400 hover:text-antique-gold transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-6">Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/chat">
                  <a className="hover:text-antique-gold transition-colors cursor-pointer">
                    AI Legal Assistant
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/lawyers">
                  <a className="hover:text-antique-gold transition-colors cursor-pointer">
                    Find Lawyers
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Legal Documents
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Legal Consultation
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/blog">
                  <a className="hover:text-antique-gold transition-colors cursor-pointer">
                    Legal Blog
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Legal Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Case Studies
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-antique-gold transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400"
        >
          <p>&copy; 2024 LegalAI. All rights reserved. | Powered by Advanced AI Technology</p>
        </motion.div>
      </div>
    </footer>
  );
}
