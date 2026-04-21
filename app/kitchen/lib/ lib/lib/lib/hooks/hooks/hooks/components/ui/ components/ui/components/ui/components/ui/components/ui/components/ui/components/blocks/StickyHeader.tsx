"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Utensils } from "lucide-react";
import { darijaPhrases } from "@/lib/constants";

interface StickyHeaderProps {
  tableNumber: number;
  cartItems: number;
  cartTotal: number;
  onCartClick: () => void;
}

export function StickyHeader({ tableNumber, cartItems, cartTotal, onCartClick }: StickyHeaderProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF6B00] rounded-xl flex items-center justify-center">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-lg text-white leading-none">Speed Bite</h1>
            <p className="text-xs text-[#A0A0A0]">{darijaPhrases.table} {tableNumber}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCartClick}
          className="relative flex items-center gap-2 bg-[#242424] hover:bg-[#2D2D2D] text-white px-4 py-2 rounded-xl transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-bold">{cartTotal}</span>
          <span className="text-xs text-[#A0A0A0]">درهم</span>
          {cartItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#E63946] text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {cartItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}

