import { useState } from 'react';
import { useAdminProducts } from '@/hooks/admin/useAdminProducts';
import { useDeleteProduct } from '@/hooks/admin/useDeleteProduct';
import { Button } from '@/components/ui/Button';
import { ProductFormView } from './ProductFormView';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types/product';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { PlusCircle, Package } from 'lucide-react';

export const AdminProducts = () => {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const { products, loading, refetch } = useAdminProducts();
  const { deleteProduct, loading: deleting } = useDeleteProduct(refetch);

  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string | number, imgId?: string } | null>(null);

  const handleOpenCreate = () => {
    setProductToEdit(null);
    setView('create');
  };

  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setView('edit');
  };

  const handleOpenDelete = (id: string | number, imgId?: string) => {
    setProductToDelete({ id, imgId });
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      await deleteProduct(productToDelete.id, productToDelete.imgId);
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  if (view === 'create' || view === 'edit') {
    return (
      <ProductFormView
        onBack={() => {
          setView('list');
          setProductToEdit(null);
        }}
        onSuccess={() => {
          setView('list');
          setProductToEdit(null);
          refetch();
        }}
        productToEdit={productToEdit}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-between items-center bg-black p-4 -rotate-1 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
          <Package size={24} />
          Inventario de Suministros
        </h2>
        <div className="flex gap-4">
          <Button
            variant="primary"
            size="sm"
            className="rotate-2 flex items-center gap-2"
            onClick={handleOpenCreate}
          >
            <PlusCircle size={18} />
            NUEVO PRODUCTO
          </Button>
        </div>
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
              product={product}
              isAdmin
              onEdit={handleOpenEdit}
              onDelete={() => handleOpenDelete(product.id, product.img_id)}
            />
          ))
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        loading={deleting}
        title="ELIMINAR SUMINISTRO"
        message="¿ESTÁS SEGURO DE QUE QUIERES ELIMINAR ESTE PRODUCTO? ESTA ACCIÓN BORRARÁ LOS DATOS Y LA IMAGEN DE FORMA PERMANENTE."
        confirmText="SÍ, ELIMINAR"
        cancelText="CANCELAR"
      />
    </div>
  );
};
