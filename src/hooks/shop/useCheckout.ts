import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { getFcmToken } from "@/lib/push";
import { useAppStore } from "@/store/useAppStore";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cart, clearCart } = useAppStore();

  const checkout = async (address: string) => {
    if (cart.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user)
        throw new Error("Debes iniciar sesión para realizar un pedido");

      // 1. Crear el pedido
      const { data: pedidoData, error: pedidoError } = await supabase
        .from("pedido")
        .insert([{ user_id: user.id, status: "pendient", address }])
        .select()
        .single();

      if (pedidoError) throw pedidoError;

      // 2. Crear notificación para el admin (trigger de push notification)
      await supabase.from("notifications").insert([
        {
          user_id: user.id,
          title: "¡NUEVO PEDIDO RECIBIDO!",
          message: `Se ha recibido un nuevo pedido #${pedidoData.id}.`,
          type: "pedido",
          read: false,
        },
      ]);

      // 3. Crear los elementos del pedido
      const elements = cart.map((item) => ({
        pedido_id: pedidoData.id,
        product_id: item.type === "product" ? item.id : null,
        combo_id: item.type === "combo" ? item.id : null,
        cantidad: item.quantity,
      }));

      const { error: elementsError } = await supabase
        .from("pedido_element")
        .insert(elements);

      if (elementsError) throw elementsError;

      // 4. Guardar FCM token para notificaciones push
      try {
        const fcmToken = await getFcmToken();
        if (fcmToken) {
          await supabase
            .from("usuario")
            .update({ fcm_token: fcmToken })
            .eq("id", user.id);
        }
      } catch {
        // No crítico — el pedido ya se creó
      }

      // 5. Limpiar carrito
      clearCart();
      return { success: true, pedidoId: pedidoData.id };
    } catch (err: unknown) {
      console.error("Error en checkout:", err);
      const message =
        err instanceof Error
          ? err.message
          : "Ocurrió un error al procesar tu pedido";
      setError(message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error };
};
