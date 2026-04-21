"use client";

import { motion } from "framer-motion";
import { Flame, Plus } from "lucide-react";
import Image from "next/image";
import { MenuItem } from "@/lib/constants";

interface HeroBannerProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export function HeroBanner({ item, onAdd }: HeroBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full h-[300px] mt-16 overflow-hidden rounded-2xl mx-4 max-w-[calc(100%-2rem)]"
    >
      <div className="absolute inset-0">
        <Image
          src={item.image}
          alt={item.nameAr}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="inline-flex items-center gap-1 bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full">
            <Flame className="w-3 h-3" />جديد
          </span>
          <span className="inline-flex items-center gap-1 bg-[#FF6B00]/20 text-[#FF6B00] text-xs font-bold px-3 py-1 rounded-full border border-[#FF6B00]/30">
            <Flame className="w-3 h-3" />حار 🔥
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-poppins font-black text-2xl text-white mb-1 leading-tight"
        >
          {item.nameAr}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-[#A0A0A0] mb-3 line-clamp-2 max-w-[80%]"
        >
          {item.descriptionAr}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <div>
            <span className="text-2xl font-poppins font-black text-[#FF6B00]">{item.price}</span>
            <span className="text-sm text-[#A0A0A0] mr-1">درهم</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAdd(item)}
            className="flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-[#FF6B00]/25"
          >
            <Plus className="w-5 h-5" />زيد فالسلة
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FF6B00]/20 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}
