
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Home, ShoppingCart, Calendar, Edit, Trash2 } from "lucide-react";
import { FoodEntry } from "@/pages/Index";
import { useLanguage } from "@/contexts/LanguageContext";

interface FoodCardProps {
  entry: FoodEntry;
  isAdminMode?: boolean;
  onEdit?: (entry: FoodEntry) => void;
  onDelete?: (entry: FoodEntry) => void;
}

export const FoodCard = ({ entry, isAdminMode = false, onEdit, onDelete }: FoodCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t, language } = useLanguage();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'ko') {
      return date.toLocaleDateString('ko-KR', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } else if (language === 'ja') {
      return date.toLocaleDateString('ja-JP', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
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

  const handleCardClick = () => {
    if (!isAdminMode) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="perspective-1000 h-80">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          !isAdminMode ? 'cursor-pointer' : ''
        } ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleCardClick}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50">
          <div className="relative h-full">
            <img
              src={entry.image}
              alt={entry.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Admin buttons */}
            {isAdminMode && (
              <div className="absolute top-3 right-3 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(entry);
                  }}
                  className="bg-white/95 hover:bg-white backdrop-blur-sm shadow-lg border-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(entry);
                  }}
                  className="bg-red-500/95 hover:bg-red-600 backdrop-blur-sm shadow-lg border-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-white text-xl font-bold mb-3 drop-shadow-lg">{entry.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {entry.isHomemade ? (
                    <Badge className="bg-emerald-500/90 hover:bg-emerald-600 backdrop-blur-sm border-0 shadow-lg">
                      <Home className="w-3 h-3 mr-1" />
                      {t('homemade')}
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-500/90 hover:bg-blue-600 backdrop-blur-sm border-0 shadow-lg">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {t('purchased')}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {renderStars(entry.rating)}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rounded-2xl rotate-y-180 shadow-2xl bg-gradient-to-br from-white via-gray-50 to-orange-50 border-0">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-orange-200">{entry.name}</h3>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                  <span className="text-sm font-semibold text-gray-600">{t('type')}</span>
                  {entry.isHomemade ? (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-300">
                      <Home className="w-3 h-3 mr-1" />
                      {t('homemade')}
                    </Badge>
                  ) : (
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-300">
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      {t('purchased')}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                  <span className="text-sm font-semibold text-gray-600">{t('rating')}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(entry.rating)}
                    <span className="text-sm text-gray-600 ml-2 font-medium">({entry.rating}/5)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                  <span className="text-sm font-semibold text-gray-600">{t('date')}</span>
                  <div className="flex items-center gap-1 text-sm text-gray-600 font-medium">
                    <Calendar className="w-3 h-3" />
                    {formatDate(entry.date)}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                <h4 className="text-sm font-semibold text-gray-600 mb-3">{t('review')}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{entry.review}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-white/70 rounded-xl backdrop-blur-sm">
              <h4 className="text-sm font-semibold text-gray-600 mb-3">{t('tags')}</h4>
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs bg-orange-50/80 border-orange-200 text-orange-700">
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
