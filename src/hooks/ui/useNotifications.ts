import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Notification } from '@/types/notification';

export const useNotifications = () => {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async (uid: string) => {
      const { data } = await supabase
        .from('usuario')
        .select('role')
        .eq('id', uid)
        .single();
      setIsAdmin(data?.role === 'admin');
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchUserRole(session.user.id);
      } else {
        setUserId(null);
        setIsAdmin(false);
      }
    });

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel('notifications-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          console.log('Nueva notificación recibida:', payload);
          const newNotif = payload.new as Notification;

          // Logic:
          // 1. If Admin: See all 'pedido' notifications
          // 2. If User: See 'entrega' notifications where user_id matches
          if (isAdmin && newNotif.type === 'pedido') {
            setActiveNotification(newNotif);
          } else if (!isAdmin && newNotif.type === 'entrega' && newNotif.user_id === userId) {
            setActiveNotification(newNotif);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, isAdmin]);

  const closeNotification = () => setActiveNotification(null);

  return { activeNotification, closeNotification };
};
