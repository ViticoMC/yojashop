import type { UserProfile } from "./user";

export type OrderStatus = "pendient" | "accepted" | "rejected" | "completed";

export interface Order {
  id: number;
  created_at: string;
  user_id: string;
  status: OrderStatus;
  address: string;
  user?: UserProfile;
  elements?: OrderElement[];
  total?: number; // Calculated field
}

export interface OrderElement {
  id: number;
  pedido_id: number;
  product_id: number | null;
  combo_id: number | null;
  cantidad: number;
  created_at: string;
  // Join fields
  producto?: {
    name: string;
    img_url: string;
    price: number;
  };
  combo?: {
    nombre: string;
    foto_url: string;
    price: number;
  };
}

export interface CreateOrderData {
  user_id: string;
  elements: {
    product_id: number | null;
    combo_id: number | null;
    cantidad: number;
  }[];
}
