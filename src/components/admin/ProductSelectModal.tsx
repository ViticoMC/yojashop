import { useState } from 'react';
import { useAdminProducts } from '@/hooks/admin/useAdminProducts';
import type { Product } from '@/types/product';
import { Search, Plus, Check } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';

interface ProductSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  selectedIds: (string | number)[];
}


export const ProductSelectModal: React.FC<ProductSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedIds
}) => {
  const { products, loading } = useAdminProducts();
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <div className="p-6 border-b-4 border-black bg-secondary/10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black uppercase italic tracking-tighter leading-none">SELECCIONAR <span className="text-primary">PRODUCTOS</span></h2>
            <p className="text-[10px] font-bold uppercase mt-1">Busca y añade suministros al combo</p>
          </div>
          <button
            onClick={onClose}
            className="bg-black text-white w-8 h-8 flex items-center justify-center font-black border-2 border-black hover:bg-error transition-all"
          >
            X
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-gray-50 border-b-2 border-black">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="BUSCAR POR NOMBRE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border-4 border-black p-3 pl-10 font-bold uppercase italic focus:bg-primary/5 outline-none transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`
                    flex items-center gap-4 p-3 border-4 border-black transition-all
                    ${isSelected ? 'bg-primary/10 border-primary' : 'bg-white hover:translate-x-1'}
                  `}
                >
                  <div className="w-12 h-12 border-2 border-black overflow-hidden bg-gray-100 shrink-0">
                    <img src={optimizeCloudinaryUrl(product.img_url, 100)} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black uppercase tracking-tighter text-sm truncate italic">{product.name}</h4>
                    <p className="text-[10px] font-bold text-gray-500 uppercase italic">${product.price.toFixed(2)} - {product.peso}</p>
                  </div>
                  <button
                    onClick={() => onSelect(product)}
                    disabled={isSelected}
                    className={`
                      w-10 h-10 flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-0.5 active:translate-y-0.5
                      ${isSelected ? 'bg-success text-white' : 'bg-secondary hover:bg-primary'}
                    `}
                  >
                    {isSelected ? <Check size={20} strokeWidth={4} /> : <Plus size={20} strokeWidth={4} />}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-center py-10 font-bold uppercase text-gray-400 italic">No se encontraron productos</p>
          )}
        </div>
      </div>
    </div>
  );
};
