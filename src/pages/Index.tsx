
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Plus, Home, ShoppingCart, Calendar, Filter } from "lucide-react";
import { AddFoodDialog } from "@/components/AddFoodDialog";
import { FilterSection } from "@/components/FilterSection";
import { FoodCard } from "@/components/FoodCard";
import { StatsSection } from "@/components/StatsSection";

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

const Index = () => {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>(mockFoodEntries);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    rating: 0,
    tags: [] as string[],
    dateFrom: "",
    dateTo: "",
    isHomemade: null as boolean | null
  });

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

  const addFoodEntry = (newEntry: Omit<FoodEntry, 'id'>) => {
    const entry: FoodEntry = {
      ...newEntry,
      id: Date.now().toString()
    };
    setFoodEntries(prev => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            My Food Journey
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A delicious collection of today's culinary adventures
          </p>
          
          <StatsSection entries={filteredEntries} />
          
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Food Entry
          </Button>
        </div>

        {/* Filters */}
        <FilterSection filters={filters} setFilters={setFilters} />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredEntries.map((entry) => (
            <FoodCard key={entry.id} entry={entry} />
          ))}
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No food entries found</h3>
            <p className="text-gray-500">Try adjusting your filters or add a new food entry!</p>
          </div>
        )}
      </div>

      <AddFoodDialog 
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={addFoodEntry}
      />
    </div>
  );
};

export default Index;
