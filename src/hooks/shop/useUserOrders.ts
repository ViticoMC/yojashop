import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Order, OrderElement } from "@/types/order";
import { useEffect } from "react";
import { toast } from "sonner";

export const useUserOrders = () => {
  const queryClient = useQueryClient();

  // Realtime subscription for user's own orders
  useEffect(() => {
    let channel: any;

    const setupSubscription = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;

      channel = supabase
        .channel(`user-orders-changes`) // Canal con nombre fijo para evitar leaks
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "pedido",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log("Cambio detectado en pedido del usuario:", payload);
            queryClient.invalidateQueries({ queryKey: ["user-orders"] });
          },
        )
        .subscribe((status) => {
          console.log("Estado suscripción pedidos usuario:", status);
        });
    };

    setupSubscription();

    return () => {
      if (channel) {
        console.log("Limpiando canal pedidos usuario");
        supabase.removeChannel(channel);
      }
    };
  }, [queryClient]);

  const query = useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        console.warn("No hay sesión activa para cargar pedidos");
        return [];
      }

      console.log("Cargando pedidos para el usuario:", user.id);

      const { data, error } = await supabase
        .from("pedido")
        .select(
          `
          *,
          elements:pedido_element(
            *,
            producto(name, img_url, price),
            combo(nombre, foto_url, price)
          )
        `,
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .filter("status", "neq", "canceled"); // Excluir pedidos cancelados

      if (error) {
        console.error("Error al cargar pedidos:", error);
        throw error;
      }

      console.log("Pedidos brutos recibidos:", data);

      const formattedOrders = (
        data as (Order & { elements: OrderElement[] })[]
      ).map((order) => ({
        ...order,
        total: order.elements.reduce((sum, el) => {
          const price = el.producto?.price || el.combo?.price || 0;
          return sum + price * el.cantidad;
        }, 0),
      })) as Order[];

      console.log("Pedidos formateados:", formattedOrders);
      return formattedOrders;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (orderId: number) => {
      const { error } = await supabase
        .from("pedido")
        .update({ status: "canceled" })
        .eq("id", orderId)
        .eq("status", "pendient"); // Safety check

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pedido cancelado correctamente");
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    },
    onError: (error: any) => {
      toast.error("No se pudo cancelar el pedido: " + error.message);
    },
  });

  return {
    orders: query.data || [],
    isLoading: query.isLoading,
    cancelOrder: cancelMutation.mutate,
    isCancelling: cancelMutation.isPending,
  };
};
