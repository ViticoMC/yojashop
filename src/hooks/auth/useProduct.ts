import { useState, useEffect,useMemo } from "react";
import { supabase } from '@/lib/supabase';

export type Product = {
  id: number;
  name: string;
  price: number;
  img_url: string | null;
  is_active: boolean | null;
  category: string | null; 
  discount: number | null;
  oferta: string | null;
  peso: string | null;
};

export function useProducts(activeCategory: 'all' | string, search: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setErrorMsg(null);

      const { data, error } = await supabase
        .from('producto')
        .select('id, name, price, img_url, is_active, category, discount, oferta, peso');

      if (error) {
        console.error('Error cargando productos:', error);
        setErrorMsg(error.message);
        setProducts([]);
      } else {
        setProducts(data ?? []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const byCategory =
      activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    return byCategory.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, activeCategory, search]);
  return { products: filteredProducts, loading, errorMsg };
}