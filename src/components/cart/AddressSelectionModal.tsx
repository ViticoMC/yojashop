import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/auth/useProfile';
import { Button } from '@/components/ui/Button';
import { MapPin, Home, Send, Loader2 } from 'lucide-react';

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (address: string) => void;
  loading?: boolean;
}

export const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const { profile, loading: profileLoading } = useProfile();
  const [useDefault, setUseDefault] = useState(true);
  const [manualAddress, setManualAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profile && !profile.default_direction) {
      setUseDefault(false);
    }
  }, [profile]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const finalAddress = useDefault ? profile?.default_direction : manualAddress;
    
    if (!finalAddress || finalAddress.trim().length < 5) {
      setError('POR FAVOR, PROPORCIONA UNA DIRECCIÓN VÁLIDA (MÍN. 5 CARACTERES)');
      return;
    }
    
    setError(null);
    onConfirm(finalAddress);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-app-bg border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 overflow-hidden">
        {/* Background Ben-Day dots */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 0)', backgroundSize: '6px 6px' }} />
        
        <div className="relative z-10">
          <div className="mb-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black italic leading-none drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">
              ¿DÓNDE ENTREGAMOS?
            </h2>
            <div className="h-2 w-32 bg-primary border-2 border-black mt-2 -skew-x-12" />
          </div>

          <div className="space-y-6">
            {profileLoading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="animate-spin text-primary mb-2" size={40} />
                <p className="font-black uppercase italic text-sm">Localizando tu base...</p>
              </div>
            ) : (
              <>
                {/* Opción Dirección por Defecto */}
                {profile?.default_direction && (
                  <button
                    onClick={() => setUseDefault(true)}
                    className={`w-full p-4 border-4 border-black text-left transition-all transform flex items-start gap-4 ${
                      useDefault 
                        ? 'bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 border-2 border-black ${useDefault ? 'bg-white' : 'bg-gray-100'}`}>
                      <Home size={24} className="text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black uppercase italic text-xs mb-1">MI CUARTEL GENERAL (POR DEFECTO)</p>
                      <p className="font-bold text-sm uppercase leading-tight">{profile.default_direction}</p>
                    </div>
                    <div className={`w-6 h-6 border-4 border-black flex items-center justify-center mt-1 ${useDefault ? 'bg-black' : 'bg-white'}`}>
                      {useDefault && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>
                )}

                {/* Opción Manual */}
                <div className="space-y-3">
                  <button
                    onClick={() => setUseDefault(false)}
                    className={`w-full p-4 border-4 border-black text-left transition-all transform flex items-start gap-4 ${
                      !useDefault 
                        ? 'bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-2 border-2 border-black ${!useDefault ? 'bg-white' : 'bg-gray-100'}`}>
                      <MapPin size={24} className="text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black uppercase italic text-xs mb-1">DESPACHO MANUAL</p>
                      <p className="font-bold text-sm uppercase leading-tight">ENTREGAR EN UNA NUEVA UBICACIÓN</p>
                    </div>
                    <div className={`w-6 h-6 border-4 border-black flex items-center justify-center mt-1 ${!useDefault ? 'bg-black' : 'bg-white'}`}>
                      {!useDefault && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </button>

                  {!useDefault && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <textarea
                        value={manualAddress}
                        onChange={(e) => setManualAddress(e.target.value.toUpperCase())}
                        placeholder="ESCRIBE AQUÍ LA DIRECCIÓN DE ENTREGA..."
                        className="w-full h-24 p-3 border-4 border-black bg-white font-bold text-sm uppercase focus:ring-0 focus:outline-none focus:bg-yellow-50 resize-none placeholder:text-gray-400"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {error && (
              <div className="bg-error text-white p-3 border-2 border-black font-black text-[10px] uppercase italic animate-bounce">
                ⚠️ {error}
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={loading}
              className="border-4"
            >
              CANCELAR
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={handleConfirm}
              disabled={loading || profileLoading}
              className="border-4 rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">CONFIRMAR PEDIDO <Send size={18} /></span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
