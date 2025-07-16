import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/types";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  onReadMore?: (post: BlogPost) => void;
}

export function BlogCard({ post, featured = false, onReadMore }: BlogCardProps) {
  const handleReadMore = () => {
    onReadMore?.(post);
  };

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2"
      >
        <Card className="bg-vintage-cream shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
          {/* Featured Image */}
          <div className="h-64 bg-gradient-to-br from-vintage-navy to-vintage-charcoal relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1589391886645-d51941baf7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
              alt="Modern courtroom interior"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vintage-navy/50 to-transparent" />
          </div>

          <CardContent className="p-8">
            <div className="flex items-center text-sm text-vintage-brown mb-4">
              <Badge className="bg-antique-gold text-vintage-navy px-3 py-1 rounded-full font-medium mr-3">
                Featured
              </Badge>
              <Calendar className="w-4 h-4 mr-2" />
              <span>
                {post.publishedAt 
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Recent'
                }
              </span>
            </div>

            <h3 className="text-2xl font-serif font-bold text-vintage-navy mb-4">
              {post.title}
            </h3>

            <p className="text-vintage-charcoal mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-antique-gold rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-vintage-navy" />
                </div>
                <div>
                  <p className="font-medium text-vintage-navy">{post.author}</p>
                  <p className="text-sm text-gray-600">{post.authorRole}</p>
                </div>
              </div>

              <Button
                onClick={handleReadMore}
                className="bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors group"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white border-2 border-gray-100 hover:border-antique-gold transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className="flex items-center text-sm text-vintage-brown mb-3">
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 mr-3">
              {post.category}
            </Badge>
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {post.publishedAt 
                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })
                : 'Recent'
              }
            </span>
          </div>

          <h4 className="text-lg font-semibold text-vintage-navy mb-3 line-clamp-2">
            {post.title}
          </h4>

          <p className="text-vintage-charcoal text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-gray-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-vintage-navy">{post.author}</p>
                <p className="text-xs text-gray-500">{post.authorRole}</p>
              </div>
            </div>

            <Button
              onClick={handleReadMore}
              variant="ghost"
              size="sm"
              className="text-antique-gold hover:text-vintage-brown font-medium group"
            >
              Read More
              <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
