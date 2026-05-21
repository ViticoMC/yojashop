export interface Product {
  id: number;
  name: string;
  price: number;
  img_url: string;
  img_id: string;
  is_active: boolean | null;
  category: number | null;
  discount: number;
  oferta: string | null;
  peso: string | null;
}

export interface AdminProduct extends Product {
  created_at: string;
}
