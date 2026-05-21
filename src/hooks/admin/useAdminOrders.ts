import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Order, OrderElement } from "@/types/order";

export const useAdminOrders = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'pedido'
        },
        () => {
          console.log('Cambio detectado en pedidos, invalidando caché...');
          queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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
