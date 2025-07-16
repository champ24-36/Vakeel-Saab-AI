import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Scale } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", current: location === "/" },
    { name: "AI Assistant", href: "/chat", current: location === "/chat" },
    { name: "Find Lawyers", href: "/lawyers", current: location === "/lawyers" },
    { name: "Legal Blog", href: "/blog", current: location === "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-vintage-navy shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <div className="w-8 h-8 bg-antique-gold rounded-full flex items-center justify-center">
                <Scale className="w-5 h-5 text-vintage-navy" />
              </div>
              <span className="text-white font-serif text-xl font-bold">LegalAI</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  className={`text-white hover:text-antique-gold transition-colors cursor-pointer ${
                    item.current ? "text-antique-gold" : ""
                  }`}
                >
                  {item.name}
                </motion.a>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button
                variant="outline"
                className="bg-antique-gold text-vintage-navy border-antique-gold hover:brightness-110"
              >
                Sign In
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-vintage-navy text-white">
                <div className="flex flex-col space-y-6 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`text-lg hover:text-antique-gold transition-colors ${
                          item.current ? "text-antique-gold" : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <Link href="/auth">
                    <Button
                      className="bg-antique-gold text-vintage-navy hover:brightness-110 mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
