import { useState } from 'react';
import Modal from './Modal';
import { HighlightText } from '@/components/ui/HighlightText';
import type { Combo } from '@/types/combo';

interface ComboModalProps {
  isOpen: boolean;
  onClose: () => void;
  combo: Combo | null;
  onConfirm: (quantity: number) => void;
}

const ComboModal: React.FC<ComboModalProps> = ({ isOpen, onClose, combo, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);

  if (!combo) return null;

  const handleConfirm = () => {
    onConfirm(quantity);
    setQuantity(1);
    onClose();
  };

  const oldPrice = combo.discount > 0 ? combo.price * (1 + combo.discount / 100) : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="DETALLES DEL COMBO"
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen con borde comic */}
        <div className="w-full md:w-1/2">
          <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden transform -rotate-1">
            <img src={combo.foto_url} alt={combo.nombre} className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Info y Formulario */}
        <div className="flex-1 space-y-4">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter text-app-text italic">{combo.nombre}</h3>
            <div className="flex items-center gap-3 mt-2">
              <HighlightText variant="success" className="text-3xl font-black italic">
                ${combo.price.toFixed(2)}
              </HighlightText>
              {oldPrice && (
                <span className="text-lg text-error line-through font-bold italic opacity-70">
                  ${oldPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-primary pl-4 italic">
            {combo.descriptiom}
          </p>

          <div className="pt-6 space-y-4">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-app-text">
              ¿Cuántos combos llevas? 🛒
            </label>

            <div className="flex items-center gap-4">
              <div className="flex border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-app-card px-4 py-2 font-black text-xl hover:bg-primary hover:text-white transition-colors border-r-4 border-black"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 text-center font-black text-xl bg-white outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-app-card px-4 py-2 font-black text-xl hover:bg-primary hover:text-white transition-colors border-l-4 border-black"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4 pt-8">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 text-black font-black py-3 border-4 border-black uppercase tracking-widest hover:bg-gray-300 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-secondary text-black font-black py-3 border-4 border-black uppercase tracking-widest hover:scale-105 hover:-rotate-1 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] italic"
            >
              ¡Agregar Combo! 💥
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ComboModal;
