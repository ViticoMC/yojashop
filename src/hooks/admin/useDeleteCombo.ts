import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useDeleteCombo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ comboId, fotoId }: { comboId: string | number, fotoId?: string }) => {
      // 1. Borrar imagen si existe
      if (fotoId) {
        await supabase.functions.invoke('delete_image', {
          body: { public_id: fotoId },
        });
      }

      // 2. Borrar relaciones (Cascade usualmente lo hace, pero aseguramos)
      await supabase
        .from("combo_product")
        .delete()
        .eq("combo_id", comboId);

      // 3. Borrar el combo
      const { error: dbError } = await supabase
        .from("combo")
        .delete()
        .eq("id", comboId);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-combos'] });
      if (onSuccess) onSuccess();
    },
  });

  const deleteCombo = (comboId: string | number, fotoId?: string) => {
    mutation.mutate({ comboId, fotoId });
  };

  return { 
    deleteCombo, 
    loading: mutation.isPending, 
    error: mutation.error instanceof Error ? mutation.error.message : null 
  };
};
