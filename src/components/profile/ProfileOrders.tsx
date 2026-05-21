import { useUserOrders } from '@/hooks/shop/useUserOrders';
import { Button } from '@/components/ui/Button';
import { Package, Clock, XCircle, CheckCircle2, AlertCircle, type LucideIcon } from 'lucide-react';
import type { OrderStatus } from '@/types/order';

const STATUS_CONFIG: Record<OrderStatus, { icon: LucideIcon, color: string, label: string }> = {
  pendient: { icon: Clock, color: 'text-amber-500', label: 'PENDIENTE' },
  accepted: { icon: Package, color: 'text-blue-500', label: 'ACEPTADO' },
  rejected: { icon: XCircle, color: 'text-error', label: 'RECHAZADO' },
  completed: { icon: CheckCircle2, color: 'text-success', label: 'ENTREGADO' },
  canceled: { icon: AlertCircle, color: 'text-gray-500', label: 'CANCELADO' }
};

export const ProfileOrders = () => {
  const { orders, isLoading, cancelOrder, isCancelling } = useUserOrders();

  if (isLoading) return (
    <div className="animate-pulse space-y-4">
      {[1, 2].map(i => <div key={i} className="h-24 bg-black/5 border-4 border-black" />)}
    </div>
  );

  if (orders.length === 0) return (
    <div className="bg-white border-4 border-black p-8 text-center rotate-1 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
      <Package size={48} className="mx-auto mb-4 opacity-20" />
      <p className="font-black uppercase italic text-xl">Aún no has realizado pedidos</p>
      <p className="text-xs font-bold text-black/60 mt-2 uppercase">¡Tus suministros te están esperando!</p>
    </div>
  );

  return (
    <div className="mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="border-b-8 border-black pb-4">
        <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
          TUS <span className="text-secondary">PEDIDOS</span>
        </h2>
        <p className="text-xs font-black uppercase bg-black text-white px-3 py-1 mt-2 w-fit -rotate-1">
          Solo puedes cancelar pedidos en estado pendiente
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order, index) => {
          const config = STATUS_CONFIG[order.status];
          const StatusIcon = config.icon;
          const canCancel = order.status === 'pendient';

          return (
            <div
              key={order.id}
              className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative overflow-hidden group hover:-translate-y-1 transition-transform"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 border-2 border-black ${config.color.replace('text', 'bg').replace('500', '100')}`}>
                      <StatusIcon size={20} className={config.color} />
                    </div>
                    <div>
                      <h3 className="font-black text-xl leading-none italic uppercase">PEDIDO #{index + 1}</h3>
                      <p className="text-[10px] font-bold text-black/50 uppercase">
                        {new Date(order.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-black uppercase text-black/40 mb-1">Entregar en:</p>
                    <p className="font-bold uppercase tracking-tight text-sm bg-black/5 p-2 border-2 border-black/10 inline-block">
                      {order.address}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-4">
                  <div className="text-right">
                    <p className="text-xs font-black uppercase text-black/40">Total de Suministros</p>
                    <p className="text-3xl font-black italic text-primary">${order.total}</p>
                  </div>

                  {canCancel && (
                    <Button
                      variant="error"
                      size="sm"
                      className="text-xs font-black uppercase -rotate-1 hover:rotate-0 transition-transform"
                      onClick={() => cancelOrder(order.id)}
                      disabled={isCancelling}
                    >
                      <XCircle size={14} className="mr-2" />
                      CANCELAR PEDIDO
                    </Button>
                  )}

                  {!canCancel && (
                    <div className={`text-[10px] font-black uppercase px-2 py-1 border-2 border-black ${config.color.replace('text', 'bg').replace('500', '100')} ${config.color} rotate-1`}>
                      {config.label}
                    </div>
                  )}
                </div>
              </div>

              {/* Elementos del pedido (miniaturas) */}
              <div className="mt-4 pt-4 border-t-2 border-black/5 flex flex-wrap gap-2">
                {order.elements?.map((el) => (
                  <div key={el.id} className="relative group/item" title={el.producto?.name || el.combo?.nombre}>
                    <img
                      src={el.producto?.img_url || el.combo?.foto_url}
                      alt="Suministro"
                      className="w-10 h-10 object-cover border-2 border-black  hover:grayscale-0 transition-all"
                    />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {el.cantidad}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
