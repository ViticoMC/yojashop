import React, { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { HighlightText } from '@/components/ui/HighlightText';
import { useProducts } from '@/hooks/auth/useProduct';
import { useCategory } from '@/hooks/auth/useCategory';

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'frutas', name: 'Frutas' },
  { id: 'lacteos', name: 'Lacteos' },
  { id: 'panaderia', name: 'Panaderia' },
  { id: 'carnes', name: 'Carnes' },
  { id:'despensa', name: 'Despensa' },
];

export const ProductGrid = () => {
  const selectedCategory = useCategory((s) => s.selectedCategory);
  const setSelectedCategory = useCategory((s) => s.setSelectedCategory);

  const [activeCategory, setActiveCategory] = useState<'all' | string>('all');
  const [search, setSearch] = useState('');
  const openProductModal = useCategory((state) => state.openProductModal);

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  const { products, loading, errorMsg } = useProducts(activeCategory, search);

  if (loading) {
    return <div className="py-20 text-center font-black">Cargando productos...</div>;
  }

  if (errorMsg) {
    return (
      <div className="py-20 text-center font-black text-red-500">
        Error cargando productos: {errorMsg}
      </div>
    );
  }

  return (
    <section className="py-20 bg-app-bg">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="flex-1 w-full">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-app-text mb-4">
              Nuestros <HighlightText variant="secondary">Productos</HighlightText>
            </h2>
            <div className="w-24 h-2 bg-primary border-2 border-black -skew-x-12"></div>
          </div>

          <div className="w-full md:w-auto min-w-[350px]">
            <SearchBar
              className="max-w-none w-full !mb-0"
              placeholder="¿Qué estás buscando hoy?"
              value={search}
              onChange={setSearch}
            />
          </div>
        </div>

        <div id="categorias" className="flex flex-wrap gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as 'all' | string);
                setSelectedCategory(cat.id as 'all' | string);
              }}
              className={`px-6 py-2 font-black uppercase tracking-widest text-sm border-4 border-black transition-all transform hover:-translate-y-1 active:translate-y-0 ${activeCategory === cat.id
                ? 'bg-primary text-white shadow-none translate-y-1'
                : 'bg-app-card text-app-text shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 group/grid">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-app-card border-4 border-black p-4 flex flex-col transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:z-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover/grid:opacity-50 hover:!opacity-100">
              <div className="overflow-hidden bg-white border-2 border-black mb-4 h-48">
                <img
                  src={product.img_url ?? '/assets/images/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-black uppercase tracking-tighter text-app-text mb-1 truncate">
                  {product.name}
                </h3>

                {product.peso && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold italic mb-2">
                    {product.peso}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-2">
                  <HighlightText variant="success" className="text-2xl font-black italic">
                    ${product.price.toFixed(2)}
                  </HighlightText>

                  <button
                    onClick={() => openProductModal({
                      ...product,
                      image: product.img_url || '', // para compatibilidad con el modal actual
                      description: product.oferta || '', // placeholder description
                    })}
                    className="bg-primary text-white font-black p-2 border-2 border-black hover:bg-secondary hover:text-black transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

                {product.oferta && (
                  <div className="mt-2 text-xs font-black text-secondary uppercase">
                    {product.oferta}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};