"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

interface FloatingCartProps {
  totalItems: number;
  totalPrice: number;
  onClick: () => void;
}

export function FloatingCart({ totalItems, totalPrice, onClick }: FloatingCartProps) {
  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 100 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="fixed bottom-6 left-6 right-6 z-40 bg-[#FF6B00] text-white py-4 px-6 rounded-2xl shadow-2xl shadow-[#FF6B00]/30 flex items-center justify-between font-bold"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-[#FF6B00] text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <span>شوف السلة</span>
          </div>
          <span className="font-poppins text-xl">{totalPrice} درهم</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
