import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";

import { supabase } from "@/lib/supabase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const useCreateProduct = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      peso: "",
      img_url: "",
      is_active: true,
      discount: 0,
      category: "",
      oferta: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { error: insertError } = await supabase.from("producto").insert([
        {
          name: data.name,
          price: data.price,
          peso: data.peso,
          img_url: data.img_url,
          img_id: data.img_id,
          is_active: data.is_active,
          discount: data.discount,
          category: data.category,
          oferta: data.oferta,
        },
      ]);

      if (insertError) throw insertError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      form.reset();
      if (onSuccess) onSuccess();
    },
  });

  return {
    form,
    onSubmit: form.handleSubmit((data) => mutation.mutate(data)),
    loading: mutation.isPending,
    error: mutation.error instanceof Error ? mutation.error.message : null,
  };
};
