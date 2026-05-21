import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { UserAdminData } from '@/types/user';


export const useAdminUsers = (page: number = 1, pageSize: number = 10) => {
  const [users, setUsers] = useState<UserAdminData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;

        const { data, error, count } = await supabase
          .from('usuario')
          .select('*', { count: 'exact' })
          .range(from, to)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setUsers(data || []);
        setTotalCount(count || 0);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, pageSize]);

  return { users, totalCount, loading, error, totalPages: Math.ceil(totalCount / pageSize) };
};
