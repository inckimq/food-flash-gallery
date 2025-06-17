
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Home, ShoppingCart, Calendar } from "lucide-react";
import { FoodEntry } from "@/pages/Index";

interface FoodCardProps {
  entry: FoodEntry;
}

export const FoodCard = ({ entry }: FoodCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="perspective-1000 h-80">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-full">
            <img
              src={entry.image}
              alt={entry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-xl font-semibold mb-2">{entry.name}</h3>
              <div className="flex items-center gap-2">
                {entry.isHomemade ? (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    <Home className="w-3 h-3 mr-1" />
                    Homemade
                  </Badge>
                ) : (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Purchased
                  </Badge>
                )}
                <div className="flex items-center">
                  {renderStars(entry.rating)}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rounded-xl rotate-y-180 shadow-lg bg-white">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{entry.name}</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Type:</span>
                  {entry.isHomemade ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      <Home className="w-3 h-3 mr-1" />
                      Homemade
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Purchased
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Rating:</span>
                  <div className="flex items-center gap-1">
                    {renderStars(entry.rating)}
                    <span className="text-sm text-gray-600 ml-1">({entry.rating}/5)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Date:</span>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    {formatDate(entry.date)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-600 mb-2">Review:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{entry.review}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
