"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingBag, Trophy } from "lucide-react";
import { darijaPhrases } from "@/lib/constants";

interface Stats {
  revenue: number;
  totalOrders: number;
  bestSeller: string;
}

export function StatsBar({ stats }: { stats: Stats }) {
  return (
    <div className="fixed bottom-0 left-64 right-0 bg-[#141414] border-t border-white/5 px-6 py-4 z-50">
      <div className="flex items-center justify-between max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <div className="p-2 bg-[#FF6B00]/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-[#FF6B00]" />
          </div>
          <div>
            <p className="text-xs text-[#A0A0A0]">{darijaPhrases.revenue}</p>
            <p className="font-poppins font-bold text-lg">{stats.revenue} درهم</p>
          </div>
        </motion.div>

        <div className="w-px h-10 bg-white/10" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-3">
          <div className="p-2 bg-[#E63946]/10 rounded-lg">
            <ShoppingBag className="w-5 h-5 text-[#E63946]" />
          </div>
          <div>
            <p className="text-xs text-[#A0A0A0]">{darijaPhrases.totalOrders}</p>
            <p className="font-poppins font-bold text-lg">{stats.totalOrders}</p>
          </div>
        </motion.div>

        <div className="w-px h-10 bg-white/10" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-3">
          <div className="p-2 bg-[#22C55E]/10 rounded-lg">
            <Trophy className="w-5 h-5 text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#A0A0A0]">{darijaPhrases.bestSeller}</p>
            <p className="font-bold text-sm">{stats.bestSeller}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

