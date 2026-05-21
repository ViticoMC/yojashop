import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { OrderStatus } from "@/types/order";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number, status: OrderStatus }) => {
      // 1. Obtener el user_id del pedido para notificarle
      const { data: orderData, error: fetchError } = await supabase
        .from('pedido')
        .select('user_id')
        .eq('id', orderId)
        .single();

      if (fetchError) {
        console.error('Error al obtener datos del pedido:', fetchError);
      }

      // 2. Actualizar el estado
      const { error: updateError } = await supabase
        .from('pedido')
        .update({ status })
        .eq('id', orderId);

      if (updateError) {
        console.error('Error al actualizar estado del pedido:', updateError);
        throw updateError;
      }

      // 3. Crear notificación para el usuario si es un cambio relevante
      if (orderData?.user_id && (status === 'accepted' || status === 'rejected' || status === 'completed')) {
        let title = '';
        let message = '';
        
        if (status === 'accepted') {
          title = '¡PEDIDO ACEPTADO! 🚀';
          message = 'TU PEDIDO HA SIDO ACEPTADO Y ESTÁ EN CAMINO.';
        } else if (status === 'rejected') {
          title = 'PEDIDO RECHAZADO ❌';
          message = 'LO SENTIMOS, TU PEDIDO HA SIDO RECHAZADO. CONTACTA CON SOPORTE.';
        } else if (status === 'completed') {
          title = '¡PEDIDO ENTREGADO! ✅';
          message = 'TU PEDIDO HA SIDO ENTREGADO EXITOSAMENTE. ¡GRACIAS!';
        }

        try {
          await supabase.from('notifications').insert([
            {
              user_id: orderData.user_id,
              title,
              message,
              type: 'entrega',
              read: false
            }
          ]);
        } catch (notifErr) {
          console.error('Error al enviar notificación:', notifErr);
          // No lanzamos el error para no bloquear la actualización del pedido
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    }
  });

  return {
    updateStatus: mutation.mutate,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null
  };
};
