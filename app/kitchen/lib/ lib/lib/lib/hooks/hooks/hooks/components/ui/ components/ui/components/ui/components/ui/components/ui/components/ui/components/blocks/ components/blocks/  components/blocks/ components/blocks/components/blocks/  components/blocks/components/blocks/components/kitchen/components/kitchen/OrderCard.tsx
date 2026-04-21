"use client";

import { motion } from "framer-motion";
import { Timer, Play, CheckCircle2, Bell, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import { Order, OrderStatus } from "@/lib/supabase";
import { darijaPhrases } from "@/lib/constants";

interface OrderCardProps {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => Promise<boolean>;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const [elapsed, setElapsed] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);
  const isUrgent = elapsed > 8 * 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - new Date(order.created_at).getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [order.created_at]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleStatusChange = async (newStatus: OrderStatus) => {
    setIsUpdating(true);
    await onStatusChange(order.id, newStatus);
    setIsUpdating(false);
  };

  const statusConfig = {
    new: {
      color: "bg-[#E63946]",
      text: darijaPhrases.statusNew,
      icon: Bell,
      next: "preparing" as const,
      nextLabel: "ابدأ التحضير",
      nextIcon: Play,
      nextColor: "bg-[#FF6B00] hover:bg-[#FF8533] shadow-[#FF6B00]/20",
    },
    preparing: {
      color: "bg-[#FF6B00]",
      text: darijaPhrases.statusPreparing,
      icon: ChefHat,
      next: "ready" as const,
      nextLabel: "طلبية وجدات",
      nextIcon: CheckCircle2,
      nextColor: "bg-[#22C55E] hover:bg-[#2DD55E] shadow-[#22C55E]/20",
    },
    ready: {
      color: "bg-[#22C55E]",
      text: darijaPhrases.statusReady,
      icon: CheckCircle2,
      next: "delivered" as const,
      nextLabel: "سلّمت للزبون",
      nextIcon: CheckCircle2,
      nextColor: "bg-[#3B82F6] hover:bg-[#60A5FA] shadow-[#3B82F6]/20",
    },
    delivered: {
      color: "bg-[#3B82F6]",
      text: "تسلّمت ✅",
      icon: CheckCircle2,
      next: null,
      nextLabel: null,
      nextIcon: null,
      nextColor: "",
    },
  };

  const config = statusConfig[order.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`relative bg-[#1A1A1A] rounded-2xl p-5 border-2 transition-all ${
        order.status === "new" ? "border-[#E63946] shadow-lg shadow-[#E63946]/20" : "border-white/5"
      }`}
    >
      {order.status === "new" && (
        <motion.div
          animate={{ opacity: [0.5, 0, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-[#E63946]/5 rounded-2xl pointer-events-none"
        />
      )}

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-poppins font-black text-2xl text-white">#{order.id.slice(-4)}</span>
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${config.color} text-white`}>
              <config.icon className="w-3 h-3" />
              {config.text}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#A0A0A0]">
            <span>طاولة {order.table_number}</span>
            <span>•</span>
            <span className={isUrgent ? "text-[#E63946] font-bold animate-pulse" : ""}>
              <Timer className="w-3 h-3 inline ml-1" />
              {isUrgent ? `${darijaPhrases.urgent} ` : ""}{formatTime(elapsed)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="font-poppins font-black text-xl text-[#FF6B00]">{order.total}</span>
          <span className="text-sm text-[#A0A0A0] mr-1">درهم</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <span className="font-bold text-[#FF6B00] min-w-[24px]">×{item.quantity}</span>
            <div>
              <span className="text-white font-semibold">{item.nameAr || item.name}</span>
              {item.notes && <p className="text-xs text-[#A0A0A0] mt-0.5">📝 {item.notes}</p>}
            </div>
          </div>
        ))}
      </div>

      {order.notes && (
        <div className="mb-4 p-2 bg-[#242424] rounded-lg text-xs text-[#A0A0A0]">
          📝 ملاحظات الطلبية: {order.notes}
        </div>
      )}

      {config.next && config.nextLabel && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStatusChange(config.next!)}
          disabled={isUpdating}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all shadow-lg ${
            isUpdating ? "opacity-50 cursor-wait" : config.nextColor
          } text-white`}
        >
          {isUpdating ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <config.nextIcon className="w-5 h-5" />
              {config.nextLabel}
            </>
          )}
        </motion.button>
      )}

      {order.status === "delivered" && (
        <div className="w-full py-3 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] text-center font-bold border border-[#3B82F6]/20">
          تسلّمت للزبون بنجاح ✓
        </div>
      )}
    </motion.div>
  );
}

