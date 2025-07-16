import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { LawyerSearch } from "@/components/lawyers/lawyer-search";
import { LawyerCard } from "@/components/lawyers/lawyer-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Lawyer, LawyerSearchFilters } from "@/lib/types";
import { API_ENDPOINTS } from "@/lib/constants";

export default function Lawyers() {
  const [searchFilters, setSearchFilters] = useState<LawyerSearchFilters>({});
  const { toast } = useToast();

  const { 
    data: lawyers = [], 
    isLoading, 
    error,
    refetch 
  } = useQuery<Lawyer[]>({
    queryKey: [API_ENDPOINTS.LAWYERS.LIST, searchFilters],
    enabled: true,
  });

  const handleSearch = (filters: LawyerSearchFilters) => {
    setSearchFilters(filters);
    refetch();
  };

  const handleContact = (lawyer: Lawyer) => {
    toast({
      title: "Contact Information",
      description: `Phone: ${lawyer.phone} | Email: ${lawyer.email}`,
    });
  };

  const handleViewProfile = (lawyer: Lawyer) => {
    toast({
      title: "Profile View",
      description: `Viewing profile for ${lawyer.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
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
              <Users className="w-8 h-8 text-vintage-navy" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-vintage-navy mb-4">
            Find Local Lawyers
          </h1>
          <p className="text-xl text-vintage-charcoal max-w-3xl mx-auto">
            Connect with qualified legal professionals in your area. Search by location, 
            practice area, and experience to find the right lawyer for your needs.
          </p>
        </motion.div>

        {/* Search Interface */}
        <LawyerSearch onSearch={handleSearch} isLoading={isLoading} />

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: Users, label: "Verified Lawyers", value: "500+" },
            { icon: MapPin, label: "Cities Covered", value: "50+" },
            { icon: Star, label: "Average Rating", value: "4.8" },
            { icon: Phone, label: "Response Time", value: "< 2 hrs" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card className="bg-white shadow-lg text-center hover:shadow-xl transition-shadow">
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

        {/* Results Section */}
        <div>
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-2xl font-serif font-bold text-vintage-navy">
              {Object.keys(searchFilters).length > 0 ? 'Search Results' : 'Featured Lawyers'}
              {lawyers.length > 0 && (
                <span className="text-lg font-normal text-vintage-charcoal ml-2">
                  ({lawyers.length} {lawyers.length === 1 ? 'lawyer' : 'lawyers'} found)
                </span>
              )}
            </h2>
            
            {Object.keys(searchFilters).length > 0 && (
              <Button
                variant="outline"
                onClick={() => handleSearch({})}
                className="border-vintage-navy text-vintage-navy hover:bg-vintage-navy hover:text-white"
              >
                Show All Lawyers
              </Button>
            )}
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center py-12"
            >
              <Loader2 className="w-8 h-8 animate-spin text-antique-gold" />
              <span className="ml-3 text-vintage-charcoal">Searching lawyers...</span>
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
                    Error Loading Lawyers
                  </h3>
                  <p className="text-red-600 text-sm mb-4">
                    {error instanceof Error ? error.message : 'Failed to load lawyers'}
                  </p>
                  <Button
                    onClick={() => refetch()}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Empty State */}
          {!isLoading && !error && lawyers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Card className="bg-yellow-50 border-yellow-200 max-w-md mx-auto">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    No Lawyers Found
                  </h3>
                  <p className="text-yellow-700 text-sm mb-4">
                    No lawyers match your search criteria. Try adjusting your filters or search in a different area.
                  </p>
                  <Button
                    onClick={() => handleSearch({})}
                    className="bg-antique-gold text-vintage-navy hover:brightness-110"
                  >
                    View All Lawyers
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Lawyers Grid */}
          {!isLoading && !error && lawyers.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {lawyers.map((lawyer, index) => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <LawyerCard
                    lawyer={lawyer}
                    onContact={handleContact}
                    onViewProfile={handleViewProfile}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Contact CTA */}
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
                Can't Find the Right Lawyer?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Our team can help you find specialized lawyers for your specific legal needs. 
                Get personalized recommendations based on your case requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-antique-gold text-vintage-navy hover:brightness-110 btn-vintage">
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Assistance
                </Button>
                <Button 
                  variant="outline" 
                  className="border-antique-gold text-antique-gold hover:bg-antique-gold hover:text-vintage-navy"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
