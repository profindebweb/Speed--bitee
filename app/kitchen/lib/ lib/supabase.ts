import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type OrderStatus = "new" | "preparing" | "ready" | "delivered";

export interface OrderItem {
  name: string;
  nameAr: string;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  table_number: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  notes?: string;
  created_at: string;
}

export interface MenuItemDB {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  price: number;
  image_url: string;
  category: string;
  is_new: boolean;
  is_spicy: boolean;
  calories: number;
  prep_time: number;
  is_available: boolean;
}

