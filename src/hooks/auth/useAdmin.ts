import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useAdmin = () => {
  const { data: isAdmin, isLoading: loading } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return false;

      const { data, error } = await supabase
        .from('usuario')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data) return false;
      return data.role === 'admin';
    },
    staleTime: 1000 * 60 * 10, // 10 minutes cache
    gcTime: 1000 * 60 * 30,    // 30 minutes until garbage collection
  });

  return { isAdmin: isAdmin ?? null, loading };
};

