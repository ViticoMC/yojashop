;
import { Button } from './Button';
import { Bell, ShieldAlert, PackageCheck } from 'lucide-react';
import type { Notification } from '@/types/notification';

interface NotificationModalProps {
  notification: Notification | null;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ notification, onClose }) => {
  if (!notification) return null;

  const isPedido = notification.type === 'pedido';

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1 animate-in zoom-in slide-in-from-bottom-10 duration-500">

        {/* Comic "POW!" effect background */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-secondary border-4 border-black rotate-12 flex items-center justify-center z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="font-black text-3xl italic uppercase -rotate-12">POW!</span>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 animate-bounce">
          {isPedido ? <ShieldAlert size={48} className="text-primary" /> : <PackageCheck size={48} className="text-success" />}
        </div>

        <div className="relative z-20">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="text-black" size={20} />
              <span className="font-black uppercase italic text-xs tracking-widest bg-black text-white px-2 py-0.5">
                ALERTA DE SISTEMA
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black italic leading-none break-words">
              {notification.title}
            </h2>
            <div className={`h-3 w-40 ${isPedido ? 'bg-primary' : 'bg-success'} border-2 border-black mt-3 -skew-x-12`} />
          </div>

          <div className="mb-10 font-black text-xl text-black uppercase italic leading-tight border-l-8 border-black pl-4 py-2 bg-gray-50">
            {notification.message}
          </div>

          <div className="flex justify-center">
            <Button
              variant={isPedido ? "primary" : "secondary"}
              onClick={onClose}
              size="full"
              className="text-2xl py-6 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              ¡VISTO! 👍
            </Button>
          </div>
        </div>

        {/* Dots pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '8px 8px' }} />
      </div>
    </div>
  );
};
