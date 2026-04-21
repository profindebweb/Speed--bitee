"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuCard } from "./MenuCard";
import { MenuItem, Category } from "@/lib/constants";

interface MenuGridProps {
  items: MenuItem[];
  category: Category;
  onAdd: (item: MenuItem) => void;
}

export function MenuGrid({ items, category, onAdd }: MenuGridProps) {
  const filtered = category === "all" ? items : items.filter((i) => i.category === category);

  return (
    <div className="px-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} onAdd={onAdd} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
