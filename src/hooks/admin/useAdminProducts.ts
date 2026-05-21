import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { AdminProduct } from '@/types/product';


export const useAdminProducts = () => {
  const query = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('producto')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as AdminProduct[];
    },
    staleTime: 3 * 60 * 1000, // 3 minutos
  });

  return {
    products: query.data || [],
    loading: query.isLoading,
    refetch: query.refetch,
    error: query.error,
  };
};
