import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useDeleteProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ productId, imgId }: { productId: string | number, imgId?: string }) => {
      // 1. Si tiene img_id, intentamos borrar de Cloudinary vía Edge Function
      if (imgId) {
        const { error: funcError } = await supabase.functions.invoke('delete_image', {
          body: { public_id: imgId },
        });
        
        if (funcError) {
          console.error("Error al borrar imagen de Cloudinary:", funcError);
        }
      }

      // 2. Borrar de la base de datos
      const { error: dbError } = await supabase
        .from("producto")
        .delete()
        .eq("id", productId);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      if (onSuccess) onSuccess();
    },
  });

  const deleteProduct = (productId: string | number, imgId?: string) => {
    mutation.mutate({ productId, imgId });
  };

  return { 
    deleteProduct, 
    loading: mutation.isPending, 
    error: mutation.error instanceof Error ? mutation.error.message : null 
  };
};
