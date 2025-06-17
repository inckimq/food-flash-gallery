
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Star, Home, ShoppingCart, Plus, X } from "lucide-react";
import { FoodEntry } from "@/pages/Index";

interface AddFoodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (entry: Omit<FoodEntry, 'id'>) => void;
}

export const AddFoodDialog = ({ isOpen, onClose, onAdd }: AddFoodDialogProps) => {
  const [formData, setFormData] = useState({
    image: '',
    name: '',
    isHomemade: true,
    rating: 5,
    review: '',
    date: new Date().toISOString().split('T')[0],
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.image || !formData.review) {
      return;
    }
    
    onAdd(formData);
    setFormData({
      image: '',
      name: '',
      isHomemade: true,
      rating: 5,
      review: '',
      date: new Date().toISOString().split('T')[0],
      tags: []
    });
    setNewTag('');
    onClose();
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Add New Food Entry
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image URL */}
          <div>
            <Label htmlFor="image" className="text-sm font-medium text-gray-700">
              Image URL
            </Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              placeholder="https://example.com/food-image.jpg"
              className="mt-1"
              required
            />
            {formData.image && (
              <div className="mt-2 rounded-lg overflow-hidden">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-32 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Food Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Food Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Homemade Pasta"
              className="mt-1"
              required
            />
          </div>

          {/* Homemade Toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Type
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-500" />
                <span className="text-sm">Purchased</span>
              </div>
              <Switch
                checked={formData.isHomemade}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isHomemade: checked }))}
              />
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-green-500" />
                <span className="text-sm">Homemade</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Rating
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(rating => (
                <Button
                  key={rating}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRatingClick(rating)}
                  className="p-1 hover:bg-yellow-50"
                >
                  <Star 
                    className={`w-6 h-6 ${
                      rating <= formData.rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                  />
                </Button>
              ))}
              <span className="ml-2 text-sm text-gray-600 self-center">
                {formData.rating}/5
              </span>
            </div>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1"
              required
            />
          </div>

          {/* Review */}
          <div>
            <Label htmlFor="review" className="text-sm font-medium text-gray-700">
              Review
            </Label>
            <Textarea
              id="review"
              value={formData.review}
              onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
              placeholder="Share your thoughts about this food..."
              className="mt-1 min-h-[80px]"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Tags
            </Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Add Food Entry
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
