import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, type UpdateProfileFormData } from "@/schemas/auth.schema";
import { supabase } from "@/lib/supabase";

export const useUpdateProfile = (initialData: { fullName: string; defaultDirection: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: initialData.fullName,
      defaultDirection: initialData.defaultDirection,
    },
  });

  const onSubmit = async (data: UpdateProfileFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No hay sesión activa");

      const { error: updateError } = await supabase
        .from("usuario")
        .update({
          name: data.fullName,
          default_direction: data.defaultDirection,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al actualizar");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    error,
    success,
    setSuccess,
    reset
  };
};
