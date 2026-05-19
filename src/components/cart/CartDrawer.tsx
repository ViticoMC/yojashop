
import { HighlightText } from '@/components/ui/HighlightText';
import { useAppStore } from '@/store/useAppStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, getCartTotal } = useAppStore();
  const total = getCartTotal();


  return (
    <>
      {/* Overlay con trama de puntos (Ben-Day dots) */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 1px, transparent 0)', backgroundSize: '4px 4px' }}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-app-bg border-l-8 border-black z-101 transform transition-transform duration-500 ease-in-out  ${isOpen ? 'translate-x-0 shadow-[-20px_0px_0px_0px_rgba(0,0,0,0.2)]' : 'translate-x-full '}`}
      >
        {/* Header - Estilo bocadillo de comic */}
        <div className="relative p-6 bg-primary border-b-4 border-black flex items-center justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '10px 10px' }} />

          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-2">
            <span className="bg-white text-black px-2 -rotate-2 inline-block border-2 border-black">MI</span>
            CARRITO
          </h2>

          <button
            onClick={onClose}
            className="bg-secondary text-black p-2 border-4 border-black hover:bg-error hover:text-white transition-colors transform hover:rotate-12 active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Lista de productos */}
        <div className="p-6 h-[calc(100vh-280px)] overflow-y-auto space-y-4 custom-scrollbar">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="group relative bg-app-card border-4 border-black p-3 flex gap-4 transform transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-20 h-20 border-2 border-black overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-black uppercase tracking-tighter text-app-text truncate text-lg">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-yellow-400 text-black px-2 py-0.5 text-xs font-bold border border-black">CANT: {item.quantity}</span>
                    <HighlightText variant="success" className="text-sm font-black italic">
                      ${(item.price * item.quantity).toFixed(2)}
                    </HighlightText>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-center text-error hover:scale-125 transition-transform p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="text-6xl grayscale opacity-30">🛒</div>
              <p className="font-black uppercase tracking-widest text-gray-400 italic">¡Tu carrito está vacío!</p>
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-app-card border-t-8 border-black space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xl font-black uppercase tracking-tighter text-app-text italic">Total a pagar:</span>
            <span className="text-4xl font-black text-success italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              ${total.toFixed(2)}
            </span>
          </div>

          <button className="w-full bg-secondary text-black font-black py-4 border-4 border-black uppercase tracking-[0.2em] text-xl transform transition-all hover:scale-105 hover:-rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden relative group">
            <span className="relative z-10 italic">¡Finalizar Pedido! 💥</span>
            <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          <p className="text-[10px] text-center font-bold uppercase text-gray-500 tracking-widest">
            * Impuestos y envío calculados al finalizar la compra
          </p>
        </div>
      </aside>
    </>
  );
};

export default CartDrawer;
