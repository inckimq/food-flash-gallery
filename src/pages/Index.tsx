import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Home, ShoppingCart, Calendar, Filter } from "lucide-react";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { FilterSection } from "@/components/FilterSection";
import { FoodCard } from "@/components/FoodCard";
import { StatsSection } from "@/components/StatsSection";
import { PasswordDialog } from "@/components/PasswordDialog";
import { EditFoodDialog } from "@/components/EditFoodDialog";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export interface FoodEntry {
  id: string;
  image: string;
  name: string;
  isHomemade: boolean;
  rating: number;
  review: string;
  date: string;
  tags: string[];
}

const mockFoodEntries: FoodEntry[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Homemade Pancakes",
    isHomemade: true,
    rating: 5,
    review: "Fluffy and delicious! Perfect weekend breakfast with maple syrup.",
    date: "2024-06-17",
    tags: ["breakfast", "sweet", "weekend"]
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Margherita Pizza",
    isHomemade: false,
    rating: 4,
    review: "Great thin crust pizza from Tony's. Fresh basil was perfect.",
    date: "2024-06-16",
    tags: ["dinner", "italian", "takeout"]
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Fresh Garden Salad",
    isHomemade: true,
    rating: 4,
    review: "Light and refreshing with homegrown tomatoes and cucumbers.",
    date: "2024-06-16",
    tags: ["lunch", "healthy", "vegetarian"]
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Chocolate Cake",
    isHomemade: false,
    rating: 5,
    review: "Incredible chocolate layer cake from the local bakery. Rich and moist!",
    date: "2024-06-15",
    tags: ["dessert", "chocolate", "celebration"]
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Avocado Toast",
    isHomemade: true,
    rating: 4,
    review: "Simple but satisfying breakfast with perfectly ripe avocado.",
    date: "2024-06-15",
    tags: ["breakfast", "healthy", "quick"]
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    name: "Homemade Burger",
    isHomemade: true,
    rating: 5,
    review: "Juicy beef patty with caramelized onions and homemade sauce.",
    date: "2024-06-14",
    tags: ["dinner", "burger", "homemade"]
  }
];

const STORAGE_KEY = "food-entries";

const Index = () => {
  const { t, language } = useLanguage();
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FoodEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<FoodEntry | null>(null);
  const [filters, setFilters] = useState({
    rating: 0,
    tags: [] as string[],
    dateFrom: "",
    dateTo: "",
    isHomemade: null as boolean | null
  });
  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEY);
      if (savedEntries) {
        setFoodEntries(JSON.parse(savedEntries));
      } else {
        // If no saved data, use mock data for first time
        setFoodEntries(mockFoodEntries);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockFoodEntries));
      }
    } catch (error) {
      console.error("Failed to load food entries from localStorage:", error);
      setFoodEntries(mockFoodEntries);
    }
  }, []);

  // Save data to localStorage whenever foodEntries changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foodEntries));
    } catch (error) {
      console.error("Failed to save food entries to localStorage:", error);
    }
  }, [foodEntries]);

  const filteredEntries = useMemo(() => {
    return foodEntries.filter(entry => {
      if (filters.rating > 0 && entry.rating < filters.rating) return false;
      if (filters.tags.length > 0 && !filters.tags.some(tag => entry.tags.includes(tag))) return false;
      if (filters.dateFrom && entry.date < filters.dateFrom) return false;
      if (filters.dateTo && entry.date > filters.dateTo) return false;
      if (filters.isHomemade !== null && entry.isHomemade !== filters.isHomemade) return false;
      return true;
    });
  }, [foodEntries, filters]);

  // Group entries by date
  const groupedEntries = useMemo(() => {
    const groups: { [key: string]: FoodEntry[] } = {};
    filteredEntries.forEach(entry => {
      if (!groups[entry.date]) {
        groups[entry.date] = [];
      }
      groups[entry.date].push(entry);
    });
    
    // Sort dates in descending order
    const sortedDates = Object.keys(groups).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    return sortedDates.map(date => ({
      date,
      entries: groups[date].sort((a, b) => b.rating - a.rating) // Sort by rating within each date
    }));
  }, [filteredEntries]);

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();
    
    if (isToday) {
      return t('today') || '오늘';
    } else if (isYesterday) {
      return t('yesterday') || '어제';
    }
    
    if (language === 'ko') {
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
      });
    } else if (language === 'ja') {
      return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short'
      });
    }
  };

  const addFoodEntry = (newEntry: Omit<FoodEntry, 'id'>) => {
    const entry: FoodEntry = {
      ...newEntry,
      id: Date.now().toString()
    };
    setFoodEntries(prev => [entry, ...prev]);
  };

  const handleEditEntry = (entry: FoodEntry) => {
    setEditingEntry(entry);
  };

  const handleSaveEdit = (updatedEntry: FoodEntry) => {
    setFoodEntries(prev => 
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
    setEditingEntry(null);
  };

  const handleDeleteEntry = (entry: FoodEntry) => {
    setDeletingEntry(entry);
  };

  const confirmDelete = () => {
    if (deletingEntry) {
      setFoodEntries(prev => prev.filter(entry => entry.id !== deletingEntry.id));
      setDeletingEntry(null);
      toast({
        title: "삭제 완료",
        description: "음식 정보가 성공적으로 삭제되었습니다.",
      });
    }
  };

  const handlePasswordSuccess = () => {
    setIsAdminMode(true);
  };

  const exitAdminMode = () => {
    setIsAdminMode(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header with glass morphism effect */}
        <div className="text-center mb-12">
          <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-shrink-0">
                <LanguageSelector />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-3">
                  {t('title')}
                </h1>
                <p className="text-xl text-gray-700 mb-8 font-medium">
                  {t('subtitle')}
                </p>
              </div>
              <div className="flex gap-2">
                {isAdminMode ? (
                  <Button 
                    onClick={exitAdminMode}
                    variant="outline"
                    className="bg-red-50/80 backdrop-blur-sm border-red-200 text-red-700 hover:bg-red-100/80 shadow-lg"
                  >
                    {t('exitAdminMode')}
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setIsPasswordDialogOpen(true)}
                    variant="outline"
                    className="bg-gray-50/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:bg-gray-100/80 shadow-lg"
                  >
                    {t('adminMode')}
                  </Button>
                )}
              </div>
            </div>
            
            <StatsSection entries={filteredEntries} />
            
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 font-semibold text-lg"
            >
              <Plus className="w-6 h-6 mr-3" />
              {t('addFoodEntry')}
            </Button>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="mb-8">
          <FilterSection filters={filters} setFilters={setFilters} />
        </div>

        {/* Admin Mode Indicator */}
        {isAdminMode && (
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 border border-orange-300 rounded-2xl p-6 mb-8 text-center shadow-lg backdrop-blur-sm">
            <p className="text-orange-800 font-semibold text-lg">
              {t('adminModeActive')}
            </p>
          </div>
        )}

        {/* Date-grouped Gallery */}
        <div className="space-y-12">
          {groupedEntries.map(({ date, entries }) => (
            <div key={date} className="space-y-6">
              {/* Date Header */}
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-full p-3 shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {formatDateHeader(date)}
                  </h2>
                  <div className="h-px bg-gradient-to-r from-orange-200 via-amber-200 to-transparent"></div>
                </div>
                <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-orange-200 text-orange-700 font-medium">
                  {entries.length}개의 기록
                </Badge>
              </div>

              {/* Entries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pl-4">
                {entries.map((entry) => (
                  <div key={entry.id} className="transform transition-all duration-300 hover:scale-105">
                    <FoodCard 
                      entry={entry} 
                      isAdminMode={isAdminMode}
                      onEdit={handleEditEntry}
                      onDelete={handleDeleteEntry}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-20">
            <div className="backdrop-blur-sm bg-white/30 rounded-3xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
              <div className="text-gray-400 mb-6">
                <Calendar className="w-20 h-20 mx-auto mb-6 opacity-50" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-4">{t('noEntriesTitle')}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">{t('noEntriesDescription')}</p>
            </div>
          </div>
        )}
      </div>

      <AddFoodDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addFoodEntry}
      />

      <PasswordDialog
        isOpen={isPasswordDialogOpen}
        onClose={() => setIsPasswordDialogOpen(false)}
        onSuccess={handlePasswordSuccess}
      />

      <EditFoodDialog
        isOpen={!!editingEntry}
        onClose={() => setEditingEntry(null)}
        onSave={handleSaveEdit}
        entry={editingEntry}
      />

      <AlertDialog open={!!deletingEntry} onOpenChange={() => setDeletingEntry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('confirmDelete')}</AlertDialogTitle>
            <AlertDialogDescription>
              "{deletingEntry?.name}"{t('deleteWarning')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
