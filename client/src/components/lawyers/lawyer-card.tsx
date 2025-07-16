import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Clock, Star, Phone, Mail, CheckCircle } from "lucide-react";
import { Lawyer } from "@/lib/types";

interface LawyerCardProps {
  lawyer: Lawyer;
  onContact?: (lawyer: Lawyer) => void;
  onViewProfile?: (lawyer: Lawyer) => void;
}

export function LawyerCard({ lawyer, onContact, onViewProfile }: LawyerCardProps) {
  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating / 10);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars ? 'text-antique-gold fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Profile Image */}
        <div className="relative h-48 bg-gradient-to-br from-vintage-navy to-vintage-charcoal">
          <Avatar className="absolute bottom-4 left-4 w-20 h-20 border-4 border-white shadow-lg">
            <AvatarImage 
              src={`https://images.unsplash.com/photo-${lawyer.id % 2 === 0 ? '1507003211169-0a1dd7228f2d' : '1472099645785-5658abf4ff4e'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150`} 
              alt={lawyer.name} 
            />
            <AvatarFallback className="bg-antique-gold text-vintage-navy text-lg font-semibold">
              {lawyer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          {lawyer.verified && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6 pt-8">
          {/* Name and Specialization */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-vintage-navy mb-2">
              {lawyer.name}
            </h3>
            <p className="text-vintage-charcoal text-sm font-medium">
              {lawyer.specialization}
            </p>
          </div>

          {/* Location and Experience */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{lawyer.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{lawyer.experience} years experience</span>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {getRatingStars(lawyer.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {(lawyer.rating / 10).toFixed(1)} ({lawyer.reviewCount} reviews)
            </span>
          </div>

          {/* Languages */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2">Languages:</p>
            <div className="flex flex-wrap gap-1">
              {lawyer.languages.slice(0, 3).map((language) => (
                <Badge
                  key={language}
                  variant="secondary"
                  className="text-xs bg-vintage-cream text-vintage-charcoal"
                >
                  {language}
                </Badge>
              ))}
              {lawyer.languages.length > 3 && (
                <Badge variant="secondary" className="text-xs bg-vintage-cream text-vintage-charcoal">
                  +{lawyer.languages.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Bio Preview */}
          {lawyer.bio && (
            <p className="text-sm text-gray-600 mb-6 line-clamp-3">
              {lawyer.bio}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={() => onContact?.(lawyer)}
              className="flex-1 bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Button>
            <Button
              onClick={() => onViewProfile?.(lawyer)}
              variant="outline"
              className="flex-1 border-antique-gold text-antique-gold hover:bg-antique-gold hover:text-vintage-navy transition-colors"
            >
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
