import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { ComboFormData, ComboProductRelation } from "@/schemas/combo.schema";

export const useCreateCombo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ data, products }: { data: ComboFormData, products: ComboProductRelation[] }) => {
      // 1. Insertar el combo
      const { data: comboData, error: comboError } = await supabase
        .from("combo")
        .insert([
          {
            nombre: data.nombre,
            cta: data.cta,
            descriptiom: data.descriptiom,
            price: data.price,
            discount: data.discount,
            foto_url: data.foto_url,
            foto_id: data.foto_id,
          },
        ])
        .select()
        .single();

      if (comboError) throw comboError;

      // 2. Insertar las relaciones combo_product
      if (products.length > 0) {
        const relations = products.map((p) => ({
          combo_id: comboData.id,
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
      queryClient.invalidateQueries({ queryKey: ['admin-combos'] });
      if (onSuccess) onSuccess();
    },
  });

  const createCombo = (data: ComboFormData, products: ComboProductRelation[]) => {
    mutation.mutate({ data, products });
  };

  return { 
    createCombo, 
    loading: mutation.isPending, 
    error: mutation.error instanceof Error ? mutation.error.message : null 
  };
};
