import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Order, OrderElement } from "@/types/order";

export const useAdminOrders = () => {
  return useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pedido')
        .select(`
          *,
          user:usuario(*),
          elements:pedido_element(
            *,
            producto(name, img_url, price),
            combo(nombre, foto_url, price)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Calculate totals and format
      return (data as (Order & { elements: OrderElement[] })[]).map(order => ({
        ...order,
        total: order.elements.reduce((sum: number, el: OrderElement) => {
          const price = el.producto?.price || el.combo?.price || 0;
          return sum + (price * el.cantidad);
        }, 0)
      })) as Order[];
    }
  });
};
