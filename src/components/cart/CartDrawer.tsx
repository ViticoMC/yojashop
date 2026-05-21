import { Trash2, Plus, Minus, CheckCircle, AlertCircle } from 'lucide-react';
import { HighlightText } from '@/components/ui/HighlightText';
import { useAppStore } from '@/store/useAppStore';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useState } from 'react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import { useCheckout } from '@/hooks/shop/useCheckout';
import { AddressSelectionModal } from './AddressSelectionModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useAppStore();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const total = getCartTotal();

  const { checkout, loading, error } = useCheckout();

  const handleClearCart = () => {
    clearCart();
    setIsClearModalOpen(false);
  };

  const handleCheckout = async (address: string) => {
    const result = await checkout(address);
    if (result?.success) {
      setIsAddressModalOpen(false);
      setOrderSuccess(true);
      setTimeout(() => {
        setOrderSuccess(false);
        onClose();
      }, 5000);
    }
  };


  return (
    <>
      {/* Overlay con trama de puntos (Ben-Day dots) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '4px 4px' }}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-app-bg border-l-8 border-black z-[101] transform transition-transform duration-500 ease-in-out  ${isOpen ? 'translate-x-0 shadow-[-20px_0px_0px_0px_rgba(0,0,0,0.2)]' : 'translate-x-full '}`}
      >
        {/* Header - Estilo bocadillo de comic */}
        <div className="relative p-6 bg-primary border-b-4 border-black flex items-center justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '10px 10px' }} />

          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2">
            <span className="bg-white text-black px-2 -rotate-2 inline-block border-2 border-black">MI</span>
            CARRITO
          </h2>

          <div className="flex items-center gap-3">
            {cart.length > 0 && !orderSuccess && (
              <button
                onClick={() => setIsClearModalOpen(true)}
                title="Vaciar Carrito"
                className="bg-white text-error p-2 border-4 border-black hover:bg-error hover:text-white transition-all transform hover:-rotate-12 active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <Trash2 size={20} strokeWidth={3} />
              </button>
            )}

            <button
              onClick={onClose}
              className="bg-secondary text-black p-2 border-4 border-black hover:bg-error hover:text-white transition-colors transform hover:rotate-12 active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>


        {/* Lista de productos */}
        <div className="p-6 h-[calc(100vh-280px)] overflow-y-auto space-y-8 custom-scrollbar">
          {orderSuccess ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-300">
              <div className="bg-success border-4 border-black p-6 rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle size={80} className="text-black" strokeWidth={3} />
              </div>
              <div className="max-w-xs mx-auto">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none mb-4">¡PEDIDO ENVIADO!</h3>
                <p className="font-bold uppercase italic text-sm text-gray-700 leading-tight">
                  Recibirás una notificación cuando uno de nuestros delivery acepte entregar tu pedido.
                </p>
              </div>
            </div>
          ) : cart.length > 0 ? (
            <>
              {/* Sección Combos */}
              {cart.some(item => item.type === 'combo') && (
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase italic tracking-widest bg-black text-white px-3 py-1 inline-block -rotate-1">
                    🚀 Super Combos
                  </h3>
                  {cart.filter(item => item.type === 'combo').map((item) => (
                    <div key={`${item.type}-${item.id}`} className="group relative bg-white border-4 border-black p-3 flex gap-4 transform transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]">
                      <div className="w-20 h-20 border-2 border-black overflow-hidden shrink-0">
                        <img src={optimizeCloudinaryUrl(item.image, 200)} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black uppercase tracking-tighter text-app-text truncate text-lg">{item.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center border-2 border-black bg-gray-100">
                            <button
                              onClick={() => updateQuantity(item.id, item.type, -1)}
                              className="p-1 hover:bg-primary transition-colors border-r-2 border-black"
                              disabled={loading}
                            >
                              <Minus size={12} strokeWidth={4} />
                            </button>
                            <span className="px-3 font-black text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.type, 1)}
                              className="p-1 hover:bg-primary transition-colors border-l-2 border-black"
                              disabled={loading}
                            >
                              <Plus size={12} strokeWidth={4} />
                            </button>
                          </div>
                          <HighlightText variant="success" className="text-sm font-black italic">
                            ${(item.price * item.quantity).toFixed(2)}
                          </HighlightText>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.type)}
                        className="self-center text-error hover:scale-125 transition-transform p-1"
                        disabled={loading}
                      >
                        <Trash2 size={20} strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </>
          )
            : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="text-6xl grayscale opacity-30">🛒</div>
                <p className="font-black uppercase tracking-widest text-gray-400 italic">¡Tu carrito está vacío!</p>
              </div>
            )}
        </div>

        {/* Footer - Checkout */}
        {!orderSuccess && (
          <div className="absolute bottom-0 left-0 w-full p-6 bg-app-card border-t-8 border-black space-y-4">
            {error && (
              <div className="bg-error/10 border-2 border-error p-3 text-error font-black text-[10px] uppercase italic flex items-center gap-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <div className="flex justify-between items-end">
              <span className="text-xl font-black uppercase tracking-tighter text-app-text italic">Total a pagar:</span>
              <span className="text-4xl font-black text-success italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setIsAddressModalOpen(true)}
              disabled={loading || cart.length === 0}
              className="w-full bg-secondary text-black font-black py-4 border-4 border-black uppercase tracking-[0.2em] text-xl transform transition-all hover:scale-105 hover:-rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden relative group disabled:opacity-50 disabled:grayscale disabled:scale-100 disabled:rotate-0 disabled:shadow-none"
            >
              <span className="relative z-10 italic">
                {loading ? 'Procesando...' : '¡Finalizar Pedido! 💥'}
              </span>
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </button>

            <p className="text-[10px] text-center font-bold uppercase text-gray-500 tracking-widest">
              * El pago se coordina por WhatsApp tras enviar el pedido
            </p>
          </div>
        )}
      </aside>


      <ConfirmationModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
        title="VACIAR CARRITO"
        message="¿ESTÁS SEGURO DE QUE QUIERES ELIMINAR TODOS LOS PRODUCTOS? ESTA ACCIÓN NO SE PUEDE DESHACER."
        confirmText="SÍ, VACIAR"
        cancelText="VOLVER"
      />

      <AddressSelectionModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onConfirm={handleCheckout}
        loading={loading}
      />
    </>
  );
};


export default CartDrawer;
