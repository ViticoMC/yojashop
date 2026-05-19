import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface AdminProduct {
  id: string | number;
  name: string;
  price: number;
  peso: string;
  img_url: string;
  img_id?: string;
  is_active: boolean;
  discount: number;
  category_id?: number;
  oferta?: string;
  created_at?: string;
}

export const useAdminProducts = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};
