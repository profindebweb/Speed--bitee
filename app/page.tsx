"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyHeader } from "@/components/blocks/StickyHeader";
import { HeroBanner } from "@/components/blocks/HeroBanner";
import { CategoryFilter } from "@/components/blocks/CategoryFilter";
import { MenuGrid } from "@/components/blocks/MenuGrid";
import { CartSheet } from "@/components/blocks/CartSheet";
import { FloatingCart } from "@/components/blocks/FloatingCart";
import { useCart } from "@/hooks/useCart";
import { menuItems, Category, darijaPhrases } from "@/lib/constants";
import { createOrder } from "@/lib/supabase-helpers";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [orderSent, setOrderSent] = useState(false);
  const cart = useCart();

  const featuredItem = menuItems.find((item) => item.id === "double-cheese-crash") || menuItems[0];

  const handleConfirmOrder = async () => {
    const orderData = {
      table_number: 5,
      items: cart.items.map((i) => ({
        name: i.item.name,
        nameAr: i.item.nameAr,
        quantity: i.quantity,
        notes: i.notes,
      })),
      total: cart.totalPrice,
      notes: "",
    };

    const result = await createOrder(orderData);
    if (result) {
      setOrderSent(true);
      cart.clearCart();
      setTimeout(() => setOrderSent(false), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-[#1A1A1A] pb-8">
      <StickyHeader
        tableNumber={5}
        cartItems={cart.totalItems}
        cartTotal={cart.totalPrice}
        onCartClick={() => cart.setIsOpen(true)}
      />
      
      <HeroBanner item={featuredItem} onAdd={cart.addItem} />
      <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
      <MenuGrid items={menuItems} category={activeCategory} onAdd={cart.addItem} />
      
      <FloatingCart
        totalItems={cart.totalItems}
        totalPrice={cart.totalPrice}
        onClick={() => cart.setIsOpen(true)}
      />
      
      <CartSheet
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        totalPrice={cart.totalPrice}
        onUpdateQuantity={cart.updateQuantity}
        onUpdateNotes={cart.updateNotes}
        onRemove={cart.removeItem}
        onConfirm={handleConfirmOrder}
      />

      <AnimatePresence>
        {orderSent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed top-20 left-4 right-4 z-50 max-w-md mx-auto bg-[#22C55E] text-white px-6 py-4 rounded-2xl shadow-2xl text-center font-bold"
          >
            {darijaPhrases.orderSent}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
