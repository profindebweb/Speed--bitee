"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/kitchen/Sidebar";
import { OrderCard } from "@/components/kitchen/OrderCard";
import { StatsBar } from "@/components/kitchen/StatsBar";
import { useSupabaseOrders } from "@/hooks/useSupabaseOrders";
import { OrderStatus } from "@/lib/supabase";
import { darijaPhrases } from "@/lib/constants";

export default function KitchenDashboard() {
  const { orders, loading, stats, updateOrderStatus } = useSupabaseOrders();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filteredOrders = filter === "all" 
    ? orders.filter((o) => o.status !== "delivered")
    : orders.filter((o) => o.status === filter);

  const activeOrders = orders.filter((o) => o.status !== "ready" && o.status !== "delivered");

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0A0A0A] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0A0A0A]">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="px-8 py-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-poppins font-bold text-2xl">الطلبيات الحية</h2>
              <p className="text-[#A0A0A0] mt-1">
                {activeOrders.length} طلبية نشطة • {orders.filter((o) => o.status === "ready").length} وجدات
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {(["all", "new", "preparing", "ready"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      filter === f
                        ? "bg-[#FF6B00] text-white"
                        : "bg-[#242424] text-[#A0A0A0] hover:bg-[#2D2D2D]"
                    }`}
                  >
                    {f === "all" ? "الكل" : f === "new" ? "جديد" : f === "preparing" ? "كايتحضر" : "وجدات"}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#22C55E] rounded-full animate-pulse" />
                <span className="text-sm text-[#22C55E] font-medium">{darijaPhrases.connected}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusChange={updateOrderStatus}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-[#A0A0A0]"
            >
              <div className="w-24 h-24 bg-[#242424] rounded-full flex items-center justify-center mb-4 text-4xl">
                ☕
              </div>
              <p className="text-lg font-semibold">ما كاين حتى طلبية دابا</p>
              <p className="text-sm">ستنّا الطلبيات الجداد...</p>
            </motion.div>
          )}
        </div>

        <StatsBar stats={stats} />
      </main>
    </div>
  );
}
