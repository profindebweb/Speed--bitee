"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, X, Send, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "@/hooks/useCart";
import { darijaPhrases } from "@/lib/constants";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onUpdateNotes: (itemId: string, notes: string) => void;
  onRemove: (itemId: string) => void;
  onConfirm: () => void;
}

export function CartSheet({
  isOpen,
  onClose,
  items,
  totalPrice,
  onUpdateQuantity,
  onUpdateNotes,
  onRemove,
  onConfirm,
}: CartSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="bg-[#1A1A1A] border-t border-white/10 h-[85vh] rounded-t-3xl">
        <SheetHeader className="text-center pb-4">
          <SheetTitle className="text-white font-poppins font-bold text-xl flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF6B00]" />
            {darijaPhrases.viewCart}
          </SheetTitle>
          <SheetDescription className="text-[#A0A0A0]">
            {items.length === 0 ? darijaPhrases.emptyCart : `${items.length} منتج فالسلة`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-[#A0A0A0]">
            <ShoppingBag className="w-16 h-16 mb-4 opacity-30" />
            <p className="font-bold">{darijaPhrases.emptyCart}</p>
            <p className="text-sm">زيد شي حاجة من القائمة! 😋</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(85vh-220px)] pr-4">
              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((cartItem) => (
                    <motion.div
                      key={cartItem.item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-[#242424] rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-white">{cartItem.item.nameAr}</h4>
                          <p className="text-sm text-[#FF6B00] font-bold">{cartItem.item.price} درهم</p>
                        </div>
                        <button
                          onClick={() => onRemove(cartItem.item.id)}
                          className="text-[#E63946] hover:bg-[#E63946]/10 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                          className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white hover:bg-[#FF6B00] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-white w-8 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                          className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white hover:bg-[#FF6B00] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-sm text-[#A0A0A0] mr-auto">
                          {cartItem.item.price * cartItem.quantity} درهم
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder={darijaPhrases.notes}
                        value={cartItem.notes || ""}
                        onChange={(e) => onUpdateNotes(cartItem.item.id, e.target.value)}
                        className="w-full bg-[#1A1A1A] text-white text-sm rounded-lg px-3 py-2 border border-white/5 focus:border-[#FF6B00] outline-none placeholder:text-[#A0A0A0]"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1A1A1A] border-t border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[#A0A0A0]">{darijaPhrases.total}</span>
                <span className="text-2xl font-poppins font-black text-[#FF6B00]">{totalPrice} درهم</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#FF8533] text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-[#FF6B00]/25"
              >
                <Send className="w-5 h-5" />
                {darijaPhrases.confirmOrder}
              </motion.button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
