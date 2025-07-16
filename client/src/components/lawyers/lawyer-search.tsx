import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";
import { LEGAL_SPECIALIZATIONS, EXPERIENCE_RANGES } from "@/lib/constants";
import { LawyerSearchFilters } from "@/lib/types";

interface LawyerSearchProps {
  onSearch: (filters: LawyerSearchFilters) => void;
  isLoading?: boolean;
}

export function LawyerSearch({ onSearch, isLoading = false }: LawyerSearchProps) {
  const [filters, setFilters] = useState<LawyerSearchFilters>({
    location: "",
    specialization: "",
    experience: "",
  });

  const handleSearch = () => {
    const searchFilters: LawyerSearchFilters = {};
    
    if (filters.location?.trim()) {
      searchFilters.location = filters.location.trim();
    }
    
    if (filters.specialization && filters.specialization !== "All Areas") {
      searchFilters.specialization = filters.specialization;
    }
    
    if (filters.experience && filters.experience !== "Any Experience") {
      searchFilters.experience = filters.experience;
    }
    
    onSearch(searchFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      location: "",
      specialization: "",
      experience: "",
    };
    setFilters(clearedFilters);
    onSearch({});
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-white shadow-lg mb-12">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-vintage-charcoal">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <Input
                type="text"
                placeholder="Enter city or area"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="border-2 border-gray-200 focus:border-antique-gold"
              />
            </div>

            {/* Practice Area */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-vintage-charcoal">
                <Briefcase className="w-4 h-4 inline mr-2" />
                Practice Area
              </label>
              <Select
                value={filters.specialization}
                onValueChange={(value) => setFilters(prev => ({ ...prev, specialization: value }))}
              >
                <SelectTrigger className="border-2 border-gray-200 focus:border-antique-gold">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {LEGAL_SPECIALIZATIONS.map((specialization) => (
                    <SelectItem key={specialization} value={specialization}>
                      {specialization}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-vintage-charcoal">
                <Clock className="w-4 h-4 inline mr-2" />
                Experience
              </label>
              <Select
                value={filters.experience}
                onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}
              >
                <SelectTrigger className="border-2 border-gray-200 focus:border-antique-gold">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Actions */}
            <div className="flex flex-col justify-end space-y-2">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-antique-gold text-vintage-navy hover:brightness-110 transition-colors"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
