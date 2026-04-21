"use client";

import { motion } from "framer-motion";
import { ChefHat, LayoutDashboard, Settings, LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-[#141414] border-r border-white/5 flex flex-col"
    >
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#FF6B00] rounded-xl flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-poppins font-bold text-lg text-white">Speed Bite</h1>
            <p className="text-xs text-[#A0A0A0]">لوحة التحكم</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00] font-bold transition-colors">
          <LayoutDashboard className="w-5 h-5" />
          الطلبيات
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#A0A0A0] hover:bg-[#1A1A1A] transition-colors">
          <Settings className="w-5 h-5" />
          الإعدادات
        </button>
      </nav>

      <div className="p-4 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#E63946] hover:bg-[#E63946]/10 transition-colors">
          <LogOut className="w-5 h-5" />
          خروج
        </button>
      </div>
    </motion.aside>
  );
}

