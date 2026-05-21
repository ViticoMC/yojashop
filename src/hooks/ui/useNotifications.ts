import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Notification } from "@/types/notification";
import { toast } from "sonner";

export const useNotifications = () => {
  const [activeNotification, setActiveNotification] =
    useState<Notification | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserRole = async (uid: string) => {
      const { data } = await supabase
        .from("usuario")
        .select("role")
        .eq("id", uid)
        .single();
      setIsAdmin(data?.role === "admin");
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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

    console.log("Iniciando suscripción Realtime para:", { userId, isAdmin });
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        (payload) => {
          console.log("¡Evento Realtime detectado!", payload);
          const newNotif = payload.new as Notification;

          const showToast = (notif: Notification) => {
            if (notif.type === 'pedido') {
              toast.info(notif.title, {
                description: notif.message,
                duration: 5000,
              });
            } else {
              toast.success(notif.title, {
                description: notif.message,
                duration: 5000,
              });
            }
          };

          // Logic:
          // 1. If Admin: See all 'pedido' notifications
          // 2. If User: See 'entrega' notifications where user_id matches
          if (isAdmin && newNotif.type === "pedido") {
            console.log("Mostrando notificación a Admin");
            setActiveNotification(newNotif);
            showToast(newNotif);
          } else if (
            !isAdmin &&
            newNotif.type === "entrega" &&
            newNotif.user_id === userId
          ) {
            console.log("Mostrando notificación a Usuario");
            setActiveNotification(newNotif);
            showToast(newNotif);
          }
        },
      )
      .subscribe((status) => {
        console.log("Estado de suscripción Realtime:", status);
      });

    return () => {
      console.log("Limpiando canal Realtime");
      supabase.removeChannel(channel);
    };
  }, [userId, isAdmin]);

  const closeNotification = () => setActiveNotification(null);

  return { activeNotification, closeNotification };
};
