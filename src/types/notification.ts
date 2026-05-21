export type NotificationType = 'pedido' | 'entrega';

export interface Notification {
  id: string;
  user_id: string | null; // null if for all admins or specific for a user
  title: string;
  message: string;
  read: boolean;
  type: NotificationType;
  created_at: string;
}

export interface CreateNotificationData {
  user_id?: string | null;
  title: string;
  message: string;
  type: NotificationType;
  read?: boolean;
}
