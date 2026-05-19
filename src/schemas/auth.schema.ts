import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "¡El correo es obligatorio!")
    .email("Formato de correo inválido"),
  password: z.string().min(1, "¿Y la contraseña ?"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Tu nombre de cliente debe tener al menos 3 caracteres"),
    email: z.string().min(1, "El correo es vital").email("Correo no válido"),
    defaultDirection: z
      .string()
      .min(5, "Necesitamos una dirección más específica"),
    password: z.string().min(6, "Mínimo 6 caracteres de poder"),
    confirmPassword: z.string().min(1, "Confirma tu clave"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las llaves no coinciden",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  fullName: z
    .string()
    .min(3, "Tu nombre de cliente debe tener al menos 3 caracteres"),
  defaultDirection: z
    .string()
    .min(5, "Necesitamos una dirección más específica"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
