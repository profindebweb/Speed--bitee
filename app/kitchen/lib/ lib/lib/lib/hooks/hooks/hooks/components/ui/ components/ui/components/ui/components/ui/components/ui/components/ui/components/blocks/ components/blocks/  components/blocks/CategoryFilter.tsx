"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Beef, Sandwich, Pizza, Package, CupSoda } from "lucide-react";
import { Category, categories } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-4 h-4" />,
  Beef: <Beef className="w-4 h-4" />,
  Sandwich: <Sandwich className="w-4 h-4" />,
  Pizza: <Pizza className="w-4 h-4" />,
  Package: <Package className="w-4 h-4" />,
  CupSoda: <CupSoda className="w-4 h-4" />,
};

interface CategoryFilterProps {
  active: Category;
  onSelect: (category: Category) => void;
}

export function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <motion.button
            key={cat.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              active === cat.id
                ? "bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/25"
                : "bg-[#242424] text-[#A0A0A0] hover:bg-[#2D2D2D]"
            }`}
          >
            {iconMap[cat.icon]}
            {cat.labelAr}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
