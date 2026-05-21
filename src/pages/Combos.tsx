;
import { useAdminCombos } from '@/hooks/admin/useAdminCombos';
import { ComboCard } from '@/components/combos/ComboCard';
import { Package } from 'lucide-react';

export const Combos: React.FC = () => {
  const { combos, loading } = useAdminCombos();

  return (
    <div className="min-h-screen bg-app-bg pb-20">
      {/* Header Estilo Cómic */}
      <div className="bg-primary border-b-8 border-black py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-block bg-black text-white px-4 py-2 font-black uppercase italic tracking-widest mb-4 transform -rotate-2">
            ¡SÚPER AHORRO!
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-black uppercase italic tracking-tighter leading-none mb-4 transform -rotate-1">
            NUESTROS <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">COMBOS</span>
          </h1>
          <p className="max-w-2xl text-xl font-bold uppercase italic text-black/80">
            Llevate más por menos con nuestras selecciones explosivas de temporada.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-8 border-black border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="font-black uppercase italic tracking-tighter">Buscando Combos...</p>
          </div>
        ) : combos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 group/container">
            {combos.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white border-8 border-dashed border-gray-200">
            <Package size={64} className="mx-auto mb-4 text-gray-300" />
            <h2 className="text-3xl font-black uppercase italic text-gray-400">Próximamente más combos...</h2>
            <p className="font-bold text-gray-400 uppercase mt-2 italic">¡Estamos preparando algo grande!</p>
          </div>
        )}
      </div>

      {/* Tira Decorativa Inferior */}
      <div className="mt-20 relative flex overflow-x-hidden bg-black py-4 border-y-4 border-black">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-primary text-3xl font-black uppercase tracking-tighter mx-8 italic">
              ⚡️ COMBOS EXPLOSIVOS ⚡️ AHORRO TOTAL ⚡️ CALIDAD PREMIUM ⚡️
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
