import React from 'react';
import { useCreateProduct } from '@/hooks/admin/useCreateProduct';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';

import { useUpdateProduct } from '@/hooks/admin/useUpdateProduct';
import { type Product } from '@/components/products/ProductCard';

import { PRODUCT_CATEGORIES } from '@/constants/categories';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  productToEdit?: Product | null;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  productToEdit
}) => {
  const isEditing = !!productToEdit;

  const createHook = useCreateProduct(onSuccess);
  const updateHook = useUpdateProduct(productToEdit?.id || '', onSuccess);

  const { form, onSubmit, loading, error } = isEditing ? updateHook : createHook;
  const { register, formState: { errors, isDirty }, setValue, reset } = form;

  const handleImageUpload = (url: string, id: string) => {
    setValue('img_url', url, { shouldDirty: true });
    setValue('img_id', id, { shouldDirty: true });
  };

  React.useEffect(() => {
    if (isOpen) {
      if (isEditing && productToEdit) {
        reset({
          name: productToEdit.name,
          price: productToEdit.price,
          peso: productToEdit.peso,
          img_url: productToEdit.img_url,
          img_id: productToEdit.img_id,
          is_active: productToEdit.is_active,
          discount: productToEdit.discount,
          category: productToEdit.category || "",
          oferta: productToEdit.oferta,
        });
      } else {
        reset({
          name: "",
          price: 0,
          peso: "",
          img_url: "",
          img_id: "",
          is_active: true,
          discount: 0,
          category: "",
          oferta: "",
        });
      }

    }
  }, [isOpen, isEditing, productToEdit, reset]);

  const handleCloseAttempt = () => {
    if (isDirty) {
      const confirmClose = window.confirm("TIENES CAMBIOS SIN GUARDAR. ¿ESTÁS SEGURO DE QUE QUIERES SALIR Y PERDER EL PROGRESO?");
      if (confirmClose) onClose();
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 my-8 animate-in fade-in zoom-in duration-200">

        {/* Header Estilo Comic */}
        <div className="flex justify-between items-start mb-8 border-b-4 border-black pb-4">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
              {isEditing ? 'EDITAR' : 'NUEVO'} <span className="text-primary">SUMINISTRO</span>
            </h2>
            <div className="h-2 w-24 bg-secondary border-2 border-black mt-2 -skew-x-12" />
          </div>
          <button
            onClick={handleCloseAttempt}
            className="bg-black text-white w-10 h-10 flex items-center justify-center font-black border-4 border-black hover:bg-error hover:scale-110 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          >
            X
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {error && (
            <div className="bg-error/10 border-2 border-error p-3 text-error font-black text-xs uppercase italic">
              ⚠️ {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-6">
              <Input
                label="Nombre del Producto"
                placeholder="Ej: Manzanas Rojas"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Peso / Medida"
                placeholder="Ej: 1kg o Pack x6"
                {...register('peso')}
                error={errors.peso?.message}
              />
            </div>

            <ImageUpload
              onUploadSuccess={handleImageUpload}
              label="Foto del Producto"
              defaultValue={productToEdit?.img_url}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Precio ($)"
              type="number"
              step="0.01"
              {...register('price')}
              error={errors.price?.message}
            />
            <Input
              label="Descuento (%)"
              type="number"
              {...register('discount')}
              error={errors.discount?.message}
            />
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-black">
                Categoría
              </label>
              <select
                {...register('category')}
                className="w-full bg-white border-4 border-black p-3 font-bold uppercase italic focus:ring-0 focus:bg-primary/5 transition-colors outline-none appearance-none"
              >
                <option value="">Seleccionar...</option>
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-[10px] text-error font-bold uppercase italic">{errors.category.message}</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-dashed border-black p-4 rotate-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                {...register('is_active')}
                className="w-6 h-6 border-4 border-black checked:bg-primary appearance-none cursor-pointer transition-colors"
              />
              <span className="font-black uppercase italic text-sm group-hover:text-primary transition-colors">
                Producto Activo en Tienda
              </span>
            </label>
          </div>

          <Input
            label="Etiqueta de Oferta (Opcional)"
            placeholder="Ej: 2x1 o Liquidación"
            {...register('oferta')}
            error={errors.oferta?.message}
          />

          <div className="flex justify-end gap-4 pt-6 border-t-4 border-black">
            <Button
              variant="outline"
              type="button"
              onClick={handleCloseAttempt}
              disabled={loading}
              className="-rotate-1"
            >
              CANCELAR
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="rotate-1"
            >
              {loading ? 'GUARDANDO...' : isEditing ? 'GUARDAR CAMBIOS' : '¡AÑADIR AL INVENTARIO!'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
