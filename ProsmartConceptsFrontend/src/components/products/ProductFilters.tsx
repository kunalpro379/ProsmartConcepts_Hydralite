import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ProductFiltersProps {
  subcategories: string[];
  selectedSubcategories: string[];
  onSubcategoryChange: (subcategory: string) => void;
  onResetFilters: () => void;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
}

const ProductFilters = ({
  subcategories,
  selectedSubcategories,
  onSubcategoryChange,
  onResetFilters,
  priceRange = [0, 500],
  onPriceChange,
}: ProductFiltersProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const hasActiveFilters = selectedSubcategories.length > 0 || localPriceRange[0] > 0 || localPriceRange[1] < 500;
  const handlePriceChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setLocalPriceRange(newRange);
    onPriceChange?.(newRange);
  };
  const handleReset = () => {
    setLocalPriceRange([0, 500]);
    onResetFilters();
  };
  return (
    <div className="space-y-6">
      {/* Subcategory Checkboxes */}
      <div className="space-y-3 pb-6">
        <h4 className="text-sm font-semibold text-foreground">Subcategory</h4>
        <div className="space-y-2 max-h-[520px] lg:max-h-[calc(100vh-260px)] overflow-y-auto pr-2 pb-6 custom-scrollbar">
          {subcategories.map((subcategory) => (
            <motion.label
              key={subcategory}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-muted/50 transition-all group"
            >
              <Checkbox
                checked={selectedSubcategories.includes(subcategory)}
                onCheckedChange={() => onSubcategoryChange(subcategory)}
                className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className={`text-sm transition-colors ${selectedSubcategories.includes(subcategory) ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>{subcategory}</span>
            </motion.label>
          ))}
        </div>
      </div>
      {/* No active filters summary */}
    </div>
  );
};
export default ProductFilters;

