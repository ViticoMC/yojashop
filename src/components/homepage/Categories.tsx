import { PRODUCT_CATEGORIES } from '@/constants/categories';
import * as LucideIcons from 'lucide-react';

export const Categories = () => {
  return (
    <section className="py-24 max-w-300 mx-auto relative overflow-hidden">
      {/* Fondo decorativo con puntos */}
      <div className="absolute inset-0 bg-dots-sm text-secondary/10 -z-10" />
      
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase tracking-tighter italic">
          Explora por <span className="text-primary underline decoration-4 underline-offset-4">Categorías</span>
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8 px-4 lg:px-0">
        {PRODUCT_CATEGORIES.map(cat => {
          const Icon = (LucideIcons as any)[cat.icon];
          return (
            <div key={cat.id} className="text-center p-6 group cursor-pointer bg-app-bg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:rotate-1 transition-all">
              <div className="text-5xl mb-6 h-24 flex items-center justify-center bg-secondary/20 border-b-4 border-black -mx-6 -mt-6 group-hover:bg-secondary/40 transition-colors">
                {Icon && <Icon size={48} strokeWidth={3} className="group-hover:scale-110 transition-transform" />}
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter mb-2 text-app-text">{cat.name}</h3>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide leading-tight">
                Calidad garantizada en todos nuestros productos de {cat.name.toLowerCase()}.
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

