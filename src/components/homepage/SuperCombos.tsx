import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminCombos } from '@/hooks/admin/useAdminCombos';
import { ComboCard } from '@/components/combos/ComboCard';
import { Button } from '@/components/ui/Button';
import { HighlightText } from '@/components/ui/HighlightText';
import { Zap } from 'lucide-react';

export const SuperCombos = () => {
  const { combos, loading } = useAdminCombos();
  const navigate = useNavigate();

  // Tomamos solo los primeros 4 para la home
  const displayCombos = combos.slice(0, 4);

  if (loading && combos.length === 0) return null;
  if (combos.length === 0) return null;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Elementos Decorativos de Fondo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-primary fill-primary" size={24} />
              <span className="font-black uppercase italic tracking-widest text-primary text-sm">Ahorro Máximo</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-black mb-4 transform -rotate-1">
              SUPER <HighlightText variant="primary">COMBOS</HighlightText> EXPLOSIVOS
            </h2>
            <div className="w-32 h-2 bg-black border-2 border-black -skew-x-12"></div>
          </div>
          
          <p className="max-w-md font-bold uppercase italic text-gray-600 text-sm md:text-right">
            Seleccionamos los mejores productos para que ahorres en grande. ¡Calidad y precio en un solo paquete!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 group/container">
          {displayCombos.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            variant="black" 
            size="lg" 
            className="group relative overflow-hidden px-12 h-16 text-xl shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            onClick={() => navigate('/combos')}
          >
            <span className="relative z-10 flex items-center gap-3">
              VER TODOS LOS COMBOS
              <Zap className="group-hover:animate-bounce" size={20} />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};
