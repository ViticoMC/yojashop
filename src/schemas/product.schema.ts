import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  price: z.coerce.number().min(0.01, "El precio debe ser mayor a 0"),
  peso: z.string().min(1, "El peso/medida es obligatorio"),
  img_url: z
    .string()
    .url("URL de imagen inválida")
    .or(z.string().min(1, "La imagen es obligatoria")),
  img_id: z.string().min(1, "El ID de la imagen es obligatorio"),
  is_active: z.boolean().default(true),
  discount: z.coerce.number().min(0).max(100).default(0),
  category: z.string().min(1, "La categoría es obligatoria"),
  oferta: z.string().optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;
