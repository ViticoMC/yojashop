import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "@/schemas/product.schema";
import { supabase } from "@/lib/supabase";

export const useUpdateProduct = (productId: string | number, onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    setError(null);
    try {
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
      
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Error al actualizar el producto");
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
