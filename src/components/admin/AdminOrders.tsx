import React, { useState, useEffect } from 'react';
import { useAdminOrders } from '@/hooks/admin/useAdminOrders';
import { useUpdateOrderStatus } from '@/hooks/admin/useUpdateOrderStatus';
import { Button } from '@/components/ui/Button';
import { ShoppingBag, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, User, MapPin, Phone } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import { HighlightText } from '@/components/ui/HighlightText';
import type { OrderStatus } from '@/types/order';

export const AdminOrders = () => {
  const { data: orders, isLoading, refetch } = useAdminOrders();
  const { updateStatus, loading: updating, error: updateError } = useUpdateOrderStatus();
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const toggleOrder = (id: number) => {
    setExpandedOrders(prev =>
      prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pendient':
        return <HighlightText variant="primary" className="text-[10px] px-2 py-0.5">PENDIENTE</HighlightText>;
      case 'accepted':
        return <HighlightText variant="success" className="text-[10px] px-2 py-0.5">ACEPTADO</HighlightText>;
      case 'rejected':
        return <HighlightText variant="error" className="text-[10px] px-2 py-0.5">RECHAZADO</HighlightText>;
      case 'completed':
        return <HighlightText variant="secondary" className="text-[10px] px-2 py-0.5">COMPLETADO</HighlightText>;
      default:
        return <span className="text-[10px] font-black uppercase">{status}</span>;
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <div className="text-xl font-black uppercase italic animate-pulse">Consultando el libro de pedidos...</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      <div className="flex justify-between items-center bg-black p-4 -rotate-1 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
          <ShoppingBag size={24} />
          REGISTRO DE PEDIDOS
        </h2>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => refetch()}
            className="bg-secondary text-black p-2 border-2 border-black hover:bg-white transition-all shadow-[2px_2px_0px_white] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            title="Refrescar datos"
          >
            <Clock size={16} />
          </button>
          <div className="bg-white text-black px-3 py-1 font-black italic text-xs border-2 border-black rotate-2 shadow-[2px_2px_0px_white]">
            {orders?.length || 0} TOTAL
          </div>
        </div>
      </div>

      {updateError && (
        <div className="bg-error text-white p-4 border-4 border-black font-black uppercase italic animate-bounce shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          ⚠️ ERROR AL ACTUALIZAR: {updateError}
        </div>
      )}

      <div className="space-y-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              {/* Order Header */}
              <div
                className="p-4 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-black text-white p-2 border-2 border-black rotate-3">
                    <span className="font-black text-lg">#{order.id}</span>
                  </div>
                  <div>
                    <h3 className="font-black uppercase italic text-sm leading-none">{order.user?.name || 'Usuario Desconocido'}</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 mt-1 uppercase italic">
                      <Clock size={12} />
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xl font-black italic">${order.total?.toFixed(2)}</div>
                    <div className="mt-1">{getStatusBadge(order.status)}</div>
                  </div>
                  {expandedOrders.includes(order.id) ? <ChevronUp /> : <ChevronDown />}
                </div>
              </div>

              {/* Order Details (Expanded) */}
              {expandedOrders.includes(order.id) && (
                <div className="border-t-4 border-black p-6 bg-app-bg animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* User Info */}
                    <div className="space-y-4">
                      <h4 className="font-black uppercase italic text-xs bg-black text-white px-2 py-1 inline-block -rotate-1">Datos del Cliente</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <User size={16} className="text-primary" />
                          <span className="uppercase">{order.user?.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <MapPin size={16} className="text-secondary" />
                          <span className="uppercase">{order.address || 'Dirección no especificada'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold">
                          <Phone size={16} className="text-success" />
                          <span className="uppercase">{order.user?.status || 'SIN ESTADO'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Status Actions */}
                    <div className="space-y-4">
                      <h4 className="font-black uppercase italic text-xs bg-black text-white px-2 py-1 inline-block rotate-1">Gestionar Pedido</h4>
                      <div className="flex flex-wrap gap-2">
                        {order.status === 'pendient' && (
                          <>
                            <Button
                              variant="success"
                              size="sm"
                              className="rotate-2 transition-all hover:scale-110 hover:rotate-0 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:scale-95"
                              onClick={() => updateStatus({ orderId: order.id, status: 'accepted' })}
                              disabled={updating}
                            >
                              <CheckCircle size={16} className="mr-2" /> ACEPTAR
                            </Button>
                            <Button
                              variant="error"
                              size="sm"
                              className="-rotate-2 transition-all hover:scale-110 hover:rotate-0 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:scale-95"
                              onClick={() => updateStatus({ orderId: order.id, status: 'rejected' })}
                              disabled={updating}
                            >
                              <XCircle size={16} className="mr-2" /> RECHAZAR
                            </Button>
                          </>
                        )}
                        {order.status === 'accepted' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="rotate-1 transition-all hover:scale-105 hover:rotate-0 hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:scale-95"
                            onClick={() => updateStatus({ orderId: order.id, status: 'completed' })}
                            disabled={updating}
                          >
                            <CheckCircle size={16} className="mr-2" /> MARCAR COMPLETADO
                          </Button>
                        )}
                        {(order.status === 'completed' || order.status === 'rejected') && (
                          <p className="text-xs font-black uppercase italic text-gray-400">Este pedido ya ha sido procesado.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Elements List */}
                  <div className="mt-8 space-y-4">
                    <h4 className="font-black uppercase italic text-xs bg-secondary text-black px-2 py-1 inline-block -rotate-2 border-2 border-black">Suministros Solicitados</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {order.elements?.map((el) => (
                        <div key={el.id} className="flex items-center justify-between bg-white border-2 border-black p-2 hover:bg-primary/5 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 border-2 border-black overflow-hidden bg-gray-100">
                              <img
                                src={optimizeCloudinaryUrl(el.producto?.img_url || el.combo?.foto_url || '', 100)}
                                alt="thumb"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-xs font-black uppercase tracking-tighter leading-none">
                                {el.producto?.name || el.combo?.nombre}
                              </div>
                              <div className="text-[10px] font-bold text-gray-500 uppercase italic">
                                Cantidad: {el.cantidad}
                              </div>
                            </div>
                          </div>
                          <div className="font-black italic text-sm">
                            ${((el.producto?.price || el.combo?.price || 0) * el.cantidad).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white border-4 border-dashed border-black">
            <p className="text-xl font-black uppercase italic text-gray-400">No hay pedidos registrados todavía</p>
          </div>
        )}
      </div>
    </div>
  );
};
