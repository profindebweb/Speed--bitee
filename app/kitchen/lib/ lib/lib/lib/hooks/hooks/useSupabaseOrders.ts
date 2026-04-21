"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, Order, OrderStatus } from "@/lib/supabase";

export function useSupabaseOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    totalOrders: 0,
    bestSeller: "دوبل تشيز كراش",
  });

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        return;
      }

      setOrders(data || []);
      updateStats(data || []);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("orders-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newOrder = payload.new as Order;
            setOrders((prev) => [newOrder, ...prev]);
            if (Notification.permission === "granted") {
              new Notification("طلبية جديدة فـ Speed Bite! 🛎", {
                body: `طاولة ${newOrder.table_number} - ${newOrder.total} درهم`,
                icon: "/images/logo-192.png",
                badge: "/images/logo-192.png",
                tag: newOrder.id,
                requireInteraction: true,
              });
            }
          } else if (payload.eventType === "UPDATE") {
            const updatedOrder = payload.new as Order;
            setOrders((prev) =>
              prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
            );
          } else if (payload.eventType === "DELETE") {
            const deletedOrder = payload.old as Order;
            setOrders((prev) => prev.filter((o) => o.id !== deletedOrder.id));
          }
          updateStats(orders);
        }
      )
      .subscribe();

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orders]);

  const updateStats = (currentOrders: Order[]) => {
    const today = new Date().toISOString().split("T")[0];
    const todayOrders = currentOrders.filter((o) =>
      o.created_at.startsWith(today)
    );

    setStats({
      revenue: todayOrders.reduce((sum, o) => sum + o.total, 0),
      totalOrders: todayOrders.length,
      bestSeller: "دوبل تشيز كراش",
    });
  };

  const updateOrderStatus = useCallback(
    async (orderId: string, status: OrderStatus) => {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("id", orderId);

      if (error) {
        console.error("Error updating order:", error);
        return false;
      }
      return true;
    },
    []
  );

  const createOrder = useCallback(
    async (orderData: Omit<Order, "id" | "created_at" | "status">) => {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            ...orderData,
            status: "new" as OrderStatus,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error creating order:", error);
        return null;
      }
      return data as Order;
    },
    []
  );

  return {
    orders,
    loading,
    stats,
    updateOrderStatus,
    createOrder,
  };
}
