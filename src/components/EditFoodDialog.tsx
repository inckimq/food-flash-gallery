
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Home, ShoppingCart, X } from "lucide-react";
import { FoodEntry } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface EditFoodDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedEntry: FoodEntry) => void;
  entry: FoodEntry | null;
}

export const EditFoodDialog = ({ isOpen, onClose, onSave, entry }: EditFoodDialogProps) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isHomemade, setIsHomemade] = useState(true);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (entry) {
      setName(entry.name);
      setImage(entry.image);
      setIsHomemade(entry.isHomemade);
      setRating(entry.rating);
      setReview(entry.review);
      setDate(entry.date);
      setTags(entry.tags);
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry) return;

    if (!name.trim() || !image.trim() || !review.trim() || !date) {
      toast({
        title: "입력 오류",
        description: "모든 필수 필드를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const updatedEntry: FoodEntry = {
      ...entry,
      name: name.trim(),
      image: image.trim(),
      isHomemade,
      rating,
      review: review.trim(),
      date,
      tags,
    };

    onSave(updatedEntry);
    onClose();
    toast({
      title: "수정 완료",
      description: "음식 정보가 성공적으로 수정되었습니다.",
    });
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-6 h-6 cursor-pointer transition-colors ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
        }`}
        onClick={() => setRating(i + 1)}
      />
    ));
  };

  if (!entry) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>음식 정보 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              음식 이름 *
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="음식 이름을 입력하세요"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              이미지 URL *
            </label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="이미지 URL을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">종류</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={isHomemade}
                  onChange={() => setIsHomemade(true)}
                  className="mr-2"
                />
                <Home className="w-4 h-4 mr-1" />
                홈메이드
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={!isHomemade}
                  onChange={() => setIsHomemade(false)}
                  className="mr-2"
                />
                <ShoppingCart className="w-4 h-4 mr-1" />
                구매
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">평점</label>
            <div className="flex gap-1">
              {renderStars()}
            </div>
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              리뷰 *
            </label>
            <Textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="음식에 대한 리뷰를 작성하세요"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-2">
              날짜 *
            </label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">태그</label>
            <div className="flex gap-2 mb-3">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="태그 추가"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">저장</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
