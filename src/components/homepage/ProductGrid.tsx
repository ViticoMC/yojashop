import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import { HighlightText } from '@/components/ui/HighlightText';
import { useAppStore } from '@/store/useAppStore';

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'comestibles', name: 'Comestibles' },
  { id: 'dulceria', name: 'Dulcería' },
  { id: 'limpieza', name: 'Limpieza' },
  { id: 'personal', name: 'Cuidado Personal' },
  { id: 'bebidas', name: 'Bebidas' },
];

const ALL_PRODUCTS = [
  { id: 101, name: "Tomates Orgánicos", category: "comestibles", price: 2.50, image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?auto=format&fit=crop&q=80&w=400", description: "Frescos y llenos de sabor." },
  { id: 102, name: "Chocolate Amargo", category: "dulceria", price: 3.20, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&q=80&w=400", description: "70% cacao de origen local." },
  { id: 103, name: "Detergente Bio", category: "limpieza", price: 5.90, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", description: "Biodegradable y potente." },
  { id: 104, name: "Shampoo Natural", category: "personal", price: 7.50, image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=400", description: "Con extractos de aloe vera." },
  { id: 105, name: "Jugo de Naranja", category: "bebidas", price: 2.80, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400", description: "Recién exprimido, sin azúcar." },
  { id: 106, name: "Pasta Italiana", category: "comestibles", price: 1.50, image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400", description: "Sémola de trigo duro premium." },
  { id: 107, name: "Galletas de Avena", category: "dulceria", price: 2.10, image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400", description: "Crujientes y saludables." },
  { id: 108, name: "Jabón de Manos", category: "personal", price: 1.90, image: "https://images.unsplash.com/photo-1605264964521-35783f94750c?auto=format&fit=crop&q=80&w=400", description: "Antibacteriano con aroma a limón." },
];

export const ProductGrid = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const openProductModal = useAppStore((state) => state.openProductModal);

  const filteredProducts = activeCategory === 'all'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 bg-app-bg">
      <div className="max-w-[1200px] mx-auto px-4">

        {/* Header de la sección */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="flex-1 w-full">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-app-text mb-4">
              Nuestros <HighlightText variant="secondary">Productos</HighlightText>
            </h2>
            <div className="w-24 h-2 bg-primary border-2 border-black -skew-x-12"></div>
          </div>

          <div className="w-full md:w-auto min-w-[350px]">
            <SearchBar className="max-w-none w-full !mb-0" placeholder="¿Qué estás buscando hoy?" />
          </div>
        </div>

        {/* Filtros de Categorías */}
        <div className="flex flex-wrap gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 font-black uppercase tracking-widest text-sm border-4 border-black transition-all transform hover:-translate-y-1 active:translate-y-0 ${activeCategory === cat.id
                  ? 'bg-primary text-white shadow-none translate-y-1'
                  : 'bg-app-card text-app-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 group/grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-app-card border-4 border-black p-4 flex flex-col transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover/grid:opacity-50 hover:!opacity-100"
            >
              <div className="overflow-hidden bg-white border-2 border-black mb-4 h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-black uppercase tracking-tighter text-app-text mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold italic mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <HighlightText variant="success" className="text-2xl font-black italic">
                    ${product.price.toFixed(2)}
                  </HighlightText>

                  <button
                    onClick={() => openProductModal(product)}
                    className="bg-primary text-white font-black p-2 border-2 border-black hover:bg-secondary hover:text-black transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
