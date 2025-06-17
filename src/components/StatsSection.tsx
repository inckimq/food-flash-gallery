
import { Card, CardContent } from "@/components/ui/card";
import { Star, Camera } from "lucide-react";
import { FoodEntry } from "@/pages/Index";

interface StatsSectionProps {
  entries: FoodEntry[];
}

export const StatsSection = ({ entries }: StatsSectionProps) => {
  const averageRating = entries.length > 0 
    ? entries.reduce((sum, entry) => sum + entry.rating, 0) / entries.length 
    : 0;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 
          i < rating ? 'fill-yellow-200 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardContent className="flex items-center gap-3 p-4">
          <Camera className="w-8 h-8 text-orange-500" />
          <div>
            <div className="text-2xl font-bold text-gray-800">{entries.length}</div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex items-center">
            {renderStars(averageRating)}
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {averageRating.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
