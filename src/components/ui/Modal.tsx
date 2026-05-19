import React from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform -rotate-1 animate-in fade-in zoom-in duration-200"
      >
        {/* Decorative corner dots */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-primary rounded-full border-2 border-black" />
        <div className="absolute top-2 right-2 w-3 h-3 bg-secondary rounded-full border-2 border-black" />
        
        <div className="mb-6 mt-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-black italic leading-none">
            {title}
          </h2>
          <div className="h-2 w-20 bg-primary border-2 border-black mt-2 -skew-x-12" />
        </div>

        <div className="mb-8 font-medium text-black">
          {children}
        </div>

        <div className="flex justify-end">
          <Button 
            variant="primary" 
            onClick={onClose}
            className="rotate-1"
          >
            ¡ENTENDIDO!
          </Button>
        </div>
      </div>
    </div>
  );
};
