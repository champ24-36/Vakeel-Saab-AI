import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog/blog-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Calendar,
  User,
  Tag,
  TrendingUp,
  Loader2,
  AlertCircle
} from "lucide-react";
import { BlogPost } from "@/lib/types";
import { API_ENDPOINTS } from "@/lib/constants";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { 
    data: allPosts = [], 
    isLoading: isLoadingAll, 
    error: errorAll 
  } = useQuery<BlogPost[]>({
    queryKey: [API_ENDPOINTS.BLOG.LIST],
  });

  const { 
    data: featuredPosts = [], 
    isLoading: isLoadingFeatured, 
    error: errorFeatured 
  } = useQuery<BlogPost[]>({
    queryKey: [API_ENDPOINTS.BLOG.FEATURED],
  });

  const categories = [
    "all",
    ...Array.from(new Set(allPosts.map(post => post.category.toLowerCase())))
  ];

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           post.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReadMore = (post: BlogPost) => {
    // Navigate to full blog post - could be implemented with routing
    console.log("Reading post:", post.slug);
  };

  const isLoading = isLoadingAll || isLoadingFeatured;
  const error = errorAll || errorFeatured;

  return (
    <div className="min-h-screen bg-white py-8">
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
              <BookOpen className="w-8 h-8 text-vintage-navy" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-vintage-navy mb-4">
            Legal Insights & News
          </h1>
          <p className="text-xl text-vintage-charcoal max-w-3xl mx-auto">
            Stay updated with the latest legal developments, expert insights, and practical guidance 
            from experienced legal professionals across India.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-vintage-cream shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-200 focus:border-antique-gold"
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <Filter className="w-5 h-5 text-vintage-charcoal" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "secondary"}
                        className={`cursor-pointer transition-colors ${
                          selectedCategory === category
                            ? "bg-antique-gold text-vintage-navy hover:brightness-110"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category === "all" ? "All Categories" : category}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-12"
          >
            <Loader2 className="w-8 h-8 animate-spin text-antique-gold" />
            <span className="ml-3 text-vintage-charcoal">Loading articles...</span>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Card className="bg-red-50 border-red-200 max-w-md mx-auto">
              <CardContent className="p-6">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Error Loading Articles
                </h3>
                <p className="text-red-600 text-sm">
                  {error instanceof Error ? error.message : 'Failed to load blog posts'}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Blog Content */}
        {!isLoading && !error && (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-16"
              >
                <div className="flex items-center mb-8">
                  <TrendingUp className="w-6 h-6 text-antique-gold mr-3" />
                  <h2 className="text-2xl font-serif font-bold text-vintage-navy">
                    Featured Articles
                  </h2>
                </div>
                <div className="grid lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <BlogCard
                        post={post}
                        featured={index === 0}
                        onReadMore={handleReadMore}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* All Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-vintage-navy">
                  {searchTerm || selectedCategory !== "all" ? "Search Results" : "Latest Articles"}
                  {filteredPosts.length > 0 && (
                    <span className="text-lg font-normal text-vintage-charcoal ml-2">
                      ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
                    </span>
                  )}
                </h2>
                
                {(searchTerm || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="border-vintage-navy text-vintage-navy hover:bg-vintage-navy hover:text-white"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              {/* Empty Search Results */}
              {filteredPosts.length === 0 && (searchTerm || selectedCategory !== "all") && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <Card className="bg-yellow-50 border-yellow-200 max-w-md mx-auto">
                    <CardContent className="p-6">
                      <Search className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                        No Articles Found
                      </h3>
                      <p className="text-yellow-700 text-sm mb-4">
                        No articles match your search criteria. Try different keywords or browse all categories.
                      </p>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                        }}
                        className="bg-antique-gold text-vintage-navy hover:brightness-110"
                      >
                        View All Articles
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Articles Grid */}
              {filteredPosts.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <BlogCard
                        post={post}
                        onReadMore={handleReadMore}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-vintage-navy text-white shadow-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-bold mb-4">
                Stay Updated with Legal News
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Subscribe to our newsletter and get the latest legal insights, case studies, 
                and regulatory updates delivered to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-white text-vintage-navy border-0"
                />
                <Button className="bg-antique-gold text-vintage-navy hover:brightness-110 btn-vintage">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blog Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          {[
            { icon: BookOpen, label: "Total Articles", value: `${allPosts.length}+` },
            { icon: User, label: "Expert Authors", value: "25+" },
            { icon: Tag, label: "Legal Categories", value: `${categories.length - 1}` },
            { icon: Calendar, label: "Updated", value: "Weekly" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="bg-vintage-cream shadow-lg text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-antique-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-vintage-navy" />
                  </div>
                  <h3 className="text-2xl font-bold text-vintage-navy mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-vintage-charcoal text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
