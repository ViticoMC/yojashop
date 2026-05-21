import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Combo } from "@/types/combo";

export const useCombo = (id: string | undefined) => {
  return useQuery({
    queryKey: ["combo", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("combo")
        .select(
          `
          *,
          products:combo_product(
            id,
            cantidad,
            product:producto(
              id,
              name,
              img_url,
              category
            )
          )
        `,
        )
        .eq("id", id)
        .single();

      if (error) throw error;

      // Transformamos la data para que sea más fácil de usar
      return {
        ...data,
        products:
          (data.products as {
            cantidad: number;
            product: { id: string | number; name: string; img_url: string; category: string; };
          }[])?.map((p) => ({
            id: p.product.id,
            name: p.product.name,
            img_url: p.product.img_url,
            category: p.product.category,
            cantidad: p.cantidad,
          })) || [],
      } as Combo;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};
