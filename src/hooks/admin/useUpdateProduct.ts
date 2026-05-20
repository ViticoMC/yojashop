import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { supabase } from "@/lib/supabase";

export const useUpdateProduct = (productId: string | number, onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { error: updateError } = await supabase
        .from("producto")
        .update({
          name: data.name,
          price: data.price,
          peso: data.peso,
          img_url: data.img_url,
          img_id: data.img_id,
          is_active: data.is_active,
          discount: data.discount,
          category: data.category,
          oferta: data.oferta,
        })
        .eq("id", productId);

      if (updateError) throw updateError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      if (onSuccess) onSuccess();
    },
  });

  return {
    form,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
    loading: mutation.isPending,
    error: mutation.error ? (mutation.error as any).message : null,
  };
};
