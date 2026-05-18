import React from 'react';
import { HighlightText } from '@/components/ui/HighlightText';

const ZONES = [
  "Maldonado Centro",
  "Punta del Este",
  "San Carlos",
  "Piriápolis",
  "Pan de Azúcar",
  "La Barra / Manantiales",
  "Pinares / Las Delicias",
  "Aiguá"
];

export const CoverageSection = () => {
  return (
    <section className="py-24 bg-app-bg overflow-hidden relative">
      {/* Fondo de puntos para dar profundidad */}
      <div className="absolute inset-0 bg-dots text-primary/5 pointer-events-none" />

      <div className="max-w-300 mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Ilustración / Mapa Estilizado */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 bg-white border-4 border-black p-2 rotate-2 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              {/* Imagen de cobertura de Maldonado */}
              <div className="aspect-4/3 bg-blue-100 border-2 border-black relative overflow-hidden flex items-center justify-center">
                <img
                  src="/assets/images/cobertura-maldonado.png"
                  alt="Mapa de cobertura Maldonado"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(black 2px, transparent 0)', backgroundSize: '15px 15px' }} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white font-black px-4 py-2 border-4 border-black -rotate-12 animate-bounce shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  ¡TODO MALDONADO!
                </div>
              </div>
            </div>

            {/* Elementos decorativos flotantes */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-secondary text-black font-black p-4 border-4 border-black -rotate-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] uppercase tracking-tighter">
              📍 Entregas en el día
            </div>
          </div>

          {/* Texto y Zonas */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-app-text mb-6 italic leading-none">
                Nuestra <br />
                <HighlightText variant="success">Cobertura</HighlightText>
              </h2>
              <p className="text-xl font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest leading-tight">
                Llegamos a todo el departamento de <span className="text-primary underline decoration-4">Maldonado</span> con productos frescos y rapidez garantizada.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ZONES.map((zone, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-app-card border-2 border-black p-3 transform transition-transform hover:scale-105 hover:rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="text-2xl">🚛</span>
                  <span className="font-black uppercase tracking-tighter text-app-text">{zone}</span>
                </div>
              ))}
            </div>

            <div className="bg-black text-white p-6 border-4 border-primary relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-20 -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
              <p className="relative z-10 font-bold italic uppercase leading-snug">
                ¿Tu zona no aparece en la lista? <br />
                <span className="text-secondary text-xl font-black">¡Consúltanos por WhatsApp y coordinamos!</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
