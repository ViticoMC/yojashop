import { ShoppingCart, Smartphone, CheckCircle2, Home, Rocket, ArrowRight } from 'lucide-react';
import { HighlightText } from '@/components/ui/HighlightText';

const STEPS = [
  {
    id: 1,
    title: "¡Elige tus Favoritos!",
    description: "Navega por nuestra tienda y agrega todos los productos que desees a tu carrito.",
    icon: <ShoppingCart size={48} className="text-primary" />,
    color: "primary"
  },
  {
    id: 2,
    title: "Manda tu Pedido",
    description: "Revisa tu carrito y envíanos tu pedido con un solo click. ¡Es súper fácil!",
    icon: <Smartphone size={48} className="text-secondary" />,
    color: "secondary"
  },
  {
    id: 3,
    title: "Confirmamos Todo",
    description: "Nuestro equipo te contactará para confirmar los detalles de la entrega.",
    icon: <CheckCircle2 size={48} className="text-success" />,
    color: "success"
  },
  {
    id: 4,
    title: "¡Recibe y Paga!",
    description: "Recibe tus productos frescos en la puerta de tu casa y paga en efectivo al recibir.",
    icon: <Home size={48} className="text-sale" />,
    color: "sale"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 bg-app-card border-y-8 border-black relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-app-text mb-6 italic drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
            ¿Cómo <HighlightText variant="primary">Funciona</HighlightText>?
          </h2>
          <p className="text-xl font-bold text-gray-600 dark:text-gray-400 max-w-2xl mx-auto uppercase tracking-widest">
            ¡Tu súper en casa en 4 sencillos pasos!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {STEPS.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Conector visual entre pasos (solo desktop) */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/4 -right-10 z-0 opacity-20 animate-pulse">
                  <ArrowRight size={32} className="text-black/20" />
                </div>
              )}

              <div className="bg-app-bg border-4 border-black p-8 h-full shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transform transition-transform group-hover:-translate-y-2 group-hover:-rotate-1">
                {/* Badge de número */}
                <div className="absolute -top-6 -left-4 bg-black text-white w-12 h-12 flex items-center justify-center font-black text-2xl rotate-[-15deg] border-2 border-white shadow-lg">
                  {step.id}
                </div>

                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <h3 className="text-2xl font-black uppercase tracking-tighter text-app-text mb-4 leading-none">
                  {step.title}
                </h3>

                <p className="text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed uppercase">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Informativo Inferior */}
        <div className="mt-20 bg-secondary border-4 border-black p-6 transform -rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
            <p className="text-2xl font-black uppercase tracking-tighter text-black">
            <Rocket size={28} className="inline mr-2 -mt-1 text-primary" />  PAGO <span className="underline decoration-4">100%</span> AL MOMENTO DE RECIBIR <Rocket size={28} className="inline ml-2 -mt-1 text-primary" />
          </p>
        </div>
      </div>
    </section>
  );
};
