import { useState } from 'react';
import { useAdminProducts } from '@/hooks/admin/useAdminProducts';
import { Button } from '@/components/ui/Button';
import { ProductFormModal } from './ProductFormModal';
import { ProductCard, type Product } from '@/components/products/ProductCard';
import { PlusCircle } from 'lucide-react';

export const AdminProducts = () => {
  const { products, loading, refetch } = useAdminProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center bg-black p-4 -rotate-1 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Inventario de Suministros</h2>
        <Button
          variant="primary"
          size="sm"
          className="rotate-2 flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={18} />
          NUEVO PRODUCTO
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 border-4 border-black h-80 animate-pulse shadow-[6px_6px_0px_rgba(0,0,0,1)]" />
          ))
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product as any}
              isAdmin
              onEdit={(p) => console.log('Edit', p)}
              onDelete={(id) => console.log('Delete', id)}
            />
          ))
        )}
      </div>

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          refetch();
        }}
      />
    </div>
  );
};
