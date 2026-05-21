import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const useDeleteProduct = (onSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (productId: string | number, imgId?: string) => {
    setLoading(true);
    setError(null);

    try {
      // 1. Si tiene img_id, intentamos borrar de Cloudinary vía Edge Function
      if (imgId) {
        const { error: funcError } = await supabase.functions.invoke(
          "delete_image",
          {
            body: { public_id: imgId },
          },
        );

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

      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
};
