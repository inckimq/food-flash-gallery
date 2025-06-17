
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, Filter, Home, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

interface FilterSectionProps {
  filters: {
    rating: number;
    tags: string[];
    dateFrom: string;
    dateTo: string;
    isHomemade: boolean | null;
  };
  setFilters: (filters: any) => void;
}

const commonTags = ['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'healthy', 'vegetarian', 'italian', 'homemade', 'takeout'];

export const FilterSection = ({ filters, setFilters }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleRatingFilter = (rating: number) => {
    setFilters(prev => ({ ...prev, rating: prev.rating === rating ? 0 : rating }));
  };

  const handleTagFilter = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleHomemadeFilter = (isHomemade: boolean | null) => {
    setFilters(prev => ({ 
      ...prev, 
      isHomemade: prev.isHomemade === isHomemade ? null : isHomemade 
    }));
  };

  const clearFilters = () => {
    setFilters({
      rating: 0,
      tags: [],
      dateFrom: '',
      dateTo: '',
      isHomemade: null
    });
  };

  const hasActiveFilters = filters.rating > 0 || filters.tags.length > 0 || filters.dateFrom || filters.dateTo || filters.isHomemade !== null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="mx-auto flex items-center gap-2 bg-white/80 backdrop-blur-sm">
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-2 bg-orange-500">
              {[filters.rating > 0, filters.tags.length > 0, filters.dateFrom, filters.dateTo, filters.isHomemade !== null].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <Card className="mt-4 bg-white/90 backdrop-blur-sm border-orange-200">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Rating Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Minimum Rating</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(rating => (
                    <Button
                      key={rating}
                      variant={filters.rating >= rating ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRatingFilter(rating)}
                      className="p-1"
                    >
                      <Star className={`w-4 h-4 ${filters.rating >= rating ? 'fill-current' : ''}`} />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Type</Label>
                <div className="flex gap-2">
                  <Button
                    variant={filters.isHomemade === true ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleHomemadeFilter(true)}
                    className="flex items-center gap-1"
                  >
                    <Home className="w-3 h-3" />
                    Homemade
                  </Button>
                  <Button
                    variant={filters.isHomemade === false ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleHomemadeFilter(false)}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="w-3 h-3" />
                    Purchased
                  </Button>
                </div>
              </div>

              {/* Date Range */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">Date Range</Label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    placeholder="From"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    className="text-sm"
                  />
                  <Input
                    type="date"
                    placeholder="To"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className="w-full flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Tags Filter */}
            <div className="mt-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Tags</Label>
              <div className="flex flex-wrap gap-2">
                {commonTags.map(tag => (
                  <Button
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagFilter(tag)}
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};
