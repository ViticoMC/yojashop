export interface Product {
  id: number;
  name: string;
  price: number;
  img_url: string;
  img_id: string;
  is_active: boolean;
  category: string;
  discount: number;
  oferta: string | null;
  peso: string;
}

export interface AdminProduct extends Product {
  created_at: string;
}
