import { z } from "zod";

export const comboSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  cta: z.string().min(1, "El CTA es obligatorio"),
  descriptiom: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  price: z.coerce.number().min(0.01, "El precio debe ser mayor a 0"),
  discount: z.coerce.number().min(0).max(100).default(0),
  foto_url: z.string().url("URL de imagen inválida").or(z.string().min(1, "La imagen es obligatoria")),
  foto_id: z.string().optional(),
});


export type ComboFormData = z.infer<typeof comboSchema>;

export interface ComboProductRelation {
  product_id: string | number;
  cantidad: number;
  // UI helpers
  name?: string;
  img_url?: string;
}
