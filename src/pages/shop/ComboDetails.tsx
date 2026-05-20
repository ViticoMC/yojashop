import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCombo } from '@/hooks/shop/useCombo';
import { Button } from '@/components/ui/Button';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import { ArrowLeft, ShoppingCart, Package, Info, Tag } from 'lucide-react';

export const ComboDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: combo, isLoading, error } = useCombo(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-bounce">
          <div className="w-16 h-16 border-8 border-black border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 font-black uppercase italic tracking-tighter">Cargando Combo...</p>
        </div>
      </div>
    );
  }

  if (error || !combo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black uppercase italic text-error mb-4 transform -rotate-2">¡ERROR EXPLOSIVO!</h1>
        <p className="font-bold uppercase mb-8">No pudimos encontrar este combo...</p>
        <Button onClick={() => navigate('/')}>VOLVER A LA TIENDA</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 overflow-x-hidden">
      {/* Background Dots */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-4 pt-8 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 font-black uppercase italic text-sm hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          VOLVER
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Visuals (Left) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-2 bg-black rounded-lg transform rotate-1 group-hover:rotate-0 transition-transform"></div>
              <div className="relative border-4 border-black bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <img 
                  src={optimizeCloudinaryUrl(combo.foto_url, 800)} 
                  alt={combo.nombre}
                  className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                {combo.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-primary text-black font-black px-4 py-2 border-4 border-black transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    -{combo.discount}% OFF
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info & Action (Right) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(239,68,68,1)] transform -rotate-1">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Tag size={18} />
                <span className="font-black uppercase italic text-sm tracking-widest">SÚPER COMBO AHORRO</span>
              </div>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter leading-none mb-4">
                {combo.nombre}
              </h1>
              
              <div className="border-t-4 border-black pt-6 mb-6">
                <p className="font-bold text-gray-700 leading-relaxed text-lg uppercase">
                  {combo.descriptiom}
                </p>
              </div>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-6xl font-black italic tracking-tighter">
                  ${combo.price}
                </span>
                {combo.discount > 0 && (
                  <span className="text-2xl font-black text-gray-400 line-through italic">
                    ${(combo.price * (1 + combo.discount / 100)).toFixed(2)}
                  </span>
                )}
              </div>

              <Button variant="black" size="full" className="h-16 text-2xl group">
                <span className="flex items-center justify-center gap-3">
                  {combo.cta}
                  <ShoppingCart className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            <div className="bg-secondary/20 border-4 border-black p-6 space-y-4">
              <h3 className="font-black uppercase italic flex items-center gap-2">
                <Info size={20} />
                DETALLES DEL COMBO
              </h3>
              <ul className="space-y-2 font-bold uppercase text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  Entrega express garantizada
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  Productos frescos de temporada
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black"></span>
                  Ahorro directo en tu bolsillo
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Products Carousel/Grid */}
        <div className="mt-24">
          <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12 border-b-8 border-black pb-4">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter">
              ¿QUÉ INCLUYE ESTE <span className="text-primary">PACK?</span>
            </h2>
            <div className="flex items-center gap-2 bg-black text-white px-4 py-1 font-black text-sm transform skew-x-12">
              <Package size={16} />
              {combo.products.length} PRODUCTOS
            </div>
          </div>

          <div className="relative overflow-hidden py-4 group/carousel">
            <div className="flex gap-8 animate-scroll hover:[animation-play-state:paused] whitespace-nowrap">
              {/* Duplicate products for infinite scroll effect */}
              {[...combo.products, ...combo.products].map((product, idx) => (
                <div 
                  key={`${product.id}-${idx}`}
                  className="inline-block w-[280px] bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-y-2 transition-transform duration-300 group group-hover/carousel:grayscale group-hover/carousel:opacity-50 hover:!grayscale-0 hover:!opacity-100"
                >
                  <div className="aspect-square border-2 border-black overflow-hidden mb-4 relative">
                    <img 
                      src={optimizeCloudinaryUrl(product.img_url, 300)} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-all"
                    />
                    <div className="absolute bottom-0 right-0 bg-black text-white px-3 py-1 font-black text-xs">
                      {product.cantidad} UNIDAD{product.cantidad > 1 ? 'ES' : ''}
                    </div>
                  </div>
                  <h4 className="font-black uppercase italic tracking-tighter text-sm truncate">{product.name}</h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase">{product.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * ${combo.products.length} - 2rem * ${combo.products.length})); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
