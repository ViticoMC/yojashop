import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Logro, UserLogro, AchievementWithProgress } from '@/types/combo';

export const useUserAchievements = () => {
  return useQuery({
    queryKey: ['user-achievements'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuario no autenticado');

      // Obtener todos los logros disponibles
      const { data: logros, error: logrosError } = await supabase
        .from('logro')
        .select('*')
        .order('total_task', { ascending: true });

      if (logrosError) throw logrosError;

      // Obtener el progreso del usuario
      const { data: userProgress, error: progressError } = await supabase
        .from('user_logro')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      // Combinar datos
      const combined: AchievementWithProgress[] = logros.map((logro: Logro) => {
        const progressEntry = userProgress.find((up: UserLogro) => up.logro_id === logro.id);
        const progress = progressEntry ? progressEntry.progress : 0;
        
        return {
          ...logro,
          user_progress: progress,
          is_completed: progress >= logro.total_task
        };
      });

      return combined;
    },
    staleTime: 60 * 1000, // 1 minuto
  });
};
