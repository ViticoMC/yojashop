;
import { Button } from '@/components/ui/Button';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "CONFIRMAR",
  cancelText = "CANCELAR",
  variant = 'danger',
  loading = false
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-error text-white border-black',
    warning: 'bg-primary text-black border-black',
    info: 'bg-secondary text-black border-black'
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 rotate-1">

        {/* Header con icono */}
        <div className="flex items-center gap-4 mb-4 border-b-4 border-black pb-4">
          <div className={`p-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${variantStyles[variant]}`}>
            <AlertTriangle size={24} />
          </div>
          <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">
            {title}
          </h2>
        </div>

        <p className="font-bold text-sm uppercase mb-8 leading-tight italic">
          {message}
        </p>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="full"
            onClick={onClose}
            disabled={loading}
            className="-rotate-1"
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'black' : 'primary'}
            size="full"
            onClick={onConfirm}
            disabled={loading}
            className="rotate-1"
          >
            {loading ? '...' : confirmText}
          </Button>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-black text-white p-1 border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};
