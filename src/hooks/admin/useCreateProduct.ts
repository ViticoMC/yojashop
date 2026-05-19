import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { supabase } from "@/lib/supabase";

export const useCreateProduct = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      peso: "",
      img_url: "",
      is_active: true,
      discount: 0,
      oferta: "",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    setError(null);
    try {
      const { error: insertError } = await supabase
        .from("producto")
        .insert([
          {
            name: data.name,
            price: data.price,
            peso: data.peso,
            img_url: data.img_url,
            img_id: data.img_id,
            is_active: data.is_active,
            discount: data.discount,
            category_id: data.category_id,
            oferta: data.oferta,
          },
        ]);

      if (insertError) throw insertError;
      
      form.reset();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Error al crear el producto");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    loading,
    error,
  };
};
