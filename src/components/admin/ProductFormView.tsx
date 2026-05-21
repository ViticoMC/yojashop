import React, { useEffect } from 'react';
import { useCreateProduct } from '@/hooks/admin/useCreateProduct';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';

import { useUpdateProduct } from '@/hooks/admin/useUpdateProduct';
import type { Product } from '@/types/product';
import { ArrowLeft } from 'lucide-react';

import { PRODUCT_CATEGORIES } from '@/constants/categories';

interface ProductFormViewProps {
  onBack: () => void;
  onSuccess: () => void;
  productToEdit?: Product | null;
}

export const ProductFormView: React.FC<ProductFormViewProps> = ({
  onBack,
  onSuccess,
  productToEdit
}) => {
  const isEditing = !!productToEdit;

  const createHook = useCreateProduct(onSuccess);
  const updateHook = useUpdateProduct(
    productToEdit?.id || '', 
    onSuccess,
    productToEdit ? {
      name: productToEdit.name,
      price: productToEdit.price,
      peso: productToEdit.peso,
      img_url: productToEdit.img_url,
      img_id: productToEdit.img_id,
      is_active: productToEdit.is_active,
      discount: productToEdit.discount,
      category: productToEdit.category || "",
      oferta: productToEdit.oferta || "",
    } : undefined
  );

  const { form, onSubmit, loading, error } = isEditing ? updateHook : createHook;
  const { register, formState: { errors, isDirty }, setValue } = form;

  const handleImageUpload = (url: string, id: string) => {
    setValue('img_url', url, { shouldDirty: true });
    setValue('img_id', id, { shouldDirty: true });
  };

  const handleBackAttempt = () => {
    if (isDirty) {
      const confirmBack = window.confirm("TIENES CAMBIOS SIN GUARDAR. ¿ESTÁS SEGURO DE QUE QUIERES SALIR Y PERDER EL PROGRESO?");
      if (confirmBack) onBack();
    } else {
      onBack();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header Formulario */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={handleBackAttempt}
          className="flex items-center gap-2 font-black uppercase italic text-sm hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          VOLVER AL LISTADO
        </button>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-right">
          {isEditing ? 'EDITAR' : 'NUEVO'} <span className="text-primary">SUMINISTRO</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <div className="bg-error/10 border-2 border-error p-3 text-error font-black text-xs uppercase italic">
                ⚠️ {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
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
                onClick={handleBackAttempt}
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
    </div>
  );
};
