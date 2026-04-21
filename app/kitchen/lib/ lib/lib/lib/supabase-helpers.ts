import { supabase, Order, OrderStatus } from "./supabase";

export async function createOrder(
  orderData: Omit<Order, "id" | "created_at" | "status">
): Promise<Order | null> {
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
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<boolean> {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order:", error);
    return false;
  }
  return true;
}

export async function getTodayOrders(): Promise<Order[]> {
  const today = new Date().toISOString().split("T")[0];
  
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", today)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching today orders:", error);
    return [];
  }
  return data as Order[];
}
