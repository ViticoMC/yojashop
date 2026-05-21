import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type {
  ComboFormData,
  ComboProductRelation,
} from "@/schemas/combo.schema";

export const useUpdateCombo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      comboId,
      data,
      products,
    }: {
      comboId: string | number;
      data: ComboFormData;
      products: ComboProductRelation[];
    }) => {
      // 1. Actualizar datos básicos del combo
      const { error: comboError } = await supabase
        .from("combo")
        .update({
          nombre: data.nombre,
          cta: data.cta,
          descriptiom: data.descriptiom,
          price: data.price,
          discount: data.discount,
          foto_url: data.foto_url,
          foto_id: data.foto_id,
        })
        .eq("id", comboId);

      if (comboError) throw comboError;

      // 2. Gestionar productos: Borrar relaciones antiguas e insertar las nuevas
      const { error: deleteError } = await supabase
        .from("combo_product")
        .delete()
        .eq("combo_id", comboId);

      if (deleteError) throw deleteError;

      if (products.length > 0) {
        const relations = products.map((p) => ({
          combo_id: comboId,
          product_id: p.product_id,
          cantidad: p.cantidad,
        }));

        const { error: relError } = await supabase
          .from("combo_product")
          .insert(relations);

        if (relError) throw relError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-combos"] });
      if (onSuccess) onSuccess();
    },
  });

  const updateCombo = (
    comboId: string | number,
    data: ComboFormData,
    products: ComboProductRelation[],
  ) => {
    mutation.mutate({ comboId, data, products });
  };

  return {
    updateCombo,
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
};
