import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      defaultDirection: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) setServerError(error.message);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: { data: { full_name: data.fullName } },
      });

      if (authError) throw authError;

      if (authData.user) {
        setRegisteredEmail(data.email);
        
        // El perfil se inserta si el usuario fue creado. 
        // Si hay un error 429 posterior en el modal o navegación, 
        // los datos ya estarán en Supabase.
        const { error: profileError } = await supabase.from("usuario").insert([
          {
            id: authData.user.id,
            name: data.fullName,
            default_direction: data.defaultDirection,
            status: "activo",
            role: "client",
          },
        ]);

        if (profileError) {
          console.error("Error inserting profile:", profileError);
          // No lanzamos el error aquí para permitir que el modal se muestre 
          // si el auth fue exitoso, pero lo registramos.
        }
        
        setShowVerificationModal(true);
      }
    } catch (error) {
      if (error instanceof Error) setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting: isSubmitting || loading,
    serverError,
    handleGoogleLogin,
    reset,
    showVerificationModal,
    setShowVerificationModal,
    registeredEmail,
  };
};
