import React from 'react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import type { Product } from '@/types/product';
import { Pencil, ShoppingCart, Tag, Trash2 } from 'lucide-react';


interface ProductCardProps {
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string | number) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin = false,
  onEdit,
  onDelete,
  onAddToCart
}) => {

  if (!product) return null;

  const hasDiscount = product.discount > 0;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  const imgUrl = product.img_url ? optimizeCloudinaryUrl(product.img_url, 600)
    : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="group relative bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col h-full overflow-hidden">

      {/* Badge de Oferta (Esquina Superior Derecha) */}
      {product.oferta && (
        <div className="absolute top-2 right-2 z-20 bg-primary text-black text-[10px] font-black px-3 py-1 uppercase border-2 border-black rotate-3 shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center gap-1 animate-pulse">
          <Tag size={12} />
          {product.oferta}
        </div>
      )}

      {/* ID (Solo Admin - Superior Izquierda) */}
      {isAdmin && (
        <div className="absolute top-2 left-2 z-20 bg-black text-white text-[9px] font-black px-2 py-0.5 uppercase italic border-2 border-white/20 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
          ID: {product.id}
        </div>
      )}

      {/* Contenedor de Imagen */}
      <div className="relative h-48 border-b-4 border-black overflow-hidden bg-gray-50 shrink-0">
        <img
          src={imgUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {!product.is_active && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-white text-black border-4 border-black px-4 py-2 font-black uppercase -rotate-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-xl font-black uppercase leading-none group-hover:text-primary transition-colors tracking-tighter italic">
            {product.name}
          </h3>
          <span className="bg-gray-100 border-2 border-black text-[10px] font-black px-2 py-0.5 uppercase shrink-0">
            {product.peso}
          </span>
        </div>

        <div className="mt-auto flex justify-between items-end gap-2">
          <div className="flex flex-col">
            {hasDiscount && (
              <span className="text-xs line-through text-gray-400 font-bold leading-none mb-1 decoration-2">
                ${product.price.toFixed(2)}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-black leading-none">
                ${discountedPrice}
              </span>
              {hasDiscount && (
                <span className="bg-error text-white text-[10px] font-black px-1.5 py-0.5 border-2 border-black rotate-3">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>

          {/* Acciones Condicionales */}
          <div className="flex gap-2">
            {isAdmin ? (
              <>
                <button
                  onClick={() => onEdit?.(product)}
                  className="p-2.5 border-2 border-black bg-white hover:bg-primary transition-all active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => onDelete?.(product.id)}
                  className="p-2.5 border-2 border-black bg-white hover:bg-error hover:text-white transition-all active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              <button
                onClick={() => onAddToCart?.(product)}
                disabled={!product.is_active}
                className={`
                  p-3 border-4 border-black transition-all active:scale-90 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1
                  ${product.is_active ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-200 grayscale cursor-not-allowed'}
                `}
                title="Añadir al carrito"
              >
                <ShoppingCart size={22} strokeWidth={3} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
