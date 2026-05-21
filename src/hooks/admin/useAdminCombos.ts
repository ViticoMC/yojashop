import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { AdminCombo } from '@/types/combo';


export const useAdminCombos = () => {
  const query = useQuery({
    queryKey: ['admin-combos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('combo')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as AdminCombo[];
    },
    staleTime: 3 * 60 * 1000, // 3 minutos
  });

  return {
    combos: query.data || [],
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
