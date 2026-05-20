import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface UserAdminData {
  id: string;
  name: string;
  default_direction: string;
  status: string;
  role: string;
  created_at: string;
}

export const useAdminUsers = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ['admin-users', page, pageSize],
    queryFn: async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await supabase
        .from('usuario')
        .select('*', { count: 'exact' })
        .range(from, to)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return {
        users: (data || []) as UserAdminData[],
        totalCount: count || 0,
        totalPages: Math.ceil((count || 0) / pageSize)
      };
    },
    staleTime: 3 * 60 * 1000, // 3 minutos
  });
};
