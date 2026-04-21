"use client";

import { useState, useEffect } from "react";
import { supabase, MenuItemDB } from "@/lib/supabase";

export function useMenuRealtime() {
  const [menuItems, setMenuItems] = useState<MenuItemDB[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .eq("is_available", true)
        .order("category");

      if (error) {
        console.error("Error fetching menu:", error);
        return;
      }

      setMenuItems(data || []);
      setLoading(false);
    };

    fetchMenu();

    const channel = supabase
      .channel("menu-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        (payload) => {
          if (payload.eventType === "UPDATE") {
            const updated = payload.new as MenuItemDB;
            setMenuItems((prev) =>
              prev.map((item) => (item.id === updated.id ? updated : item))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { menuItems, loading };
}
