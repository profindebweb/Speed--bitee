"use client";

import { motion } from "framer-motion";
import { Plus, Flame, Clock, Zap } from "lucide-react";
import Image from "next/image";
import { MenuItem } from "@/lib/constants";

interface MenuCardProps {
  item: MenuItem;
  index: number;
  onAdd: (item: MenuItem) => void;
}

export function MenuCard({ item, index, onAdd }: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#242424] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FF6B00]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B00]/10"
    >
      <div className="relative h-44 overflow-hidden">
        <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.4 }} className="relative w-full h-full">
          <Image
            src={item.image}
            alt={item.nameAr}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 33vw"
            unoptimized
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-1.5">
          {item.isNew && (
            <span className="inline-flex items-center gap-1 bg-[#E63946] text-white text-[10px] font-bold px-2 py-1 rounded-full">
              <Zap className="w-3 h-3" />جديد
            </span>
          )}
          {item.isSpicy && (
            <span className="inline-flex items-center gap-1 bg-[#FF6B00]/90 text-white text-[10px] font-bold px-2 py-1 rounded-full">
              <Flame className="w-3 h-3" />حار 🔥
            </span>
          )}
        </div>
        
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-full">
          {item.calories} سعرة
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-poppins font-bold text-base text-white leading-tight line-clamp-1">{item.nameAr}</h3>
          {item.prepTime && (
            <div className="flex items-center gap-1 text-[#A0A0A0] shrink-0">
              <Clock className="w-3 h-3" />
              <span className="text-[10px]">{item.prepTime} د</span>
            </div>
          )}
        </div>
        <p className="text-xs text-[#A0A0A0] line-clamp-2 mb-3 leading-relaxed">{item.descriptionAr}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-poppins font-black text-[#FF6B00]">{item.price}</span>
            <span className="text-xs text-[#A0A0A0]">درهم</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAdd(item)}
            className="flex items-center justify-center w-10 h-10 bg-[#FF6B00] hover:bg-[#FF8533] text-white rounded-xl transition-colors shadow-lg shadow-[#FF6B00]/20"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
