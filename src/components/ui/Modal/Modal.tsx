import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Overlay con trama de puntos comic */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.2) 1px, transparent 0)', backgroundSize: '6px 6px' }}
      />
      
      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-2xl bg-app-bg border-[6px] border-black transform transition-all shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh]">
        
        {/* Header Estilo "Onomatopeya" */}
        <div className="relative bg-primary p-4 border-b-4 border-black flex items-center justify-between">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 0)', backgroundSize: '12px 12px' }} />
          
          <h2 className="relative text-2xl font-black text-white uppercase tracking-tighter italic drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            {title || '¡ATENCIÓN!'}
          </h2>
          
          <button 
            onClick={onClose}
            className="relative bg-secondary text-black p-1 border-4 border-black hover:bg-error hover:text-white transition-colors transform hover:rotate-12 active:scale-90 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="overflow-y-auto p-6 flex-1 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
