import React from 'react';
import { useCreateProduct } from '@/hooks/admin/useCreateProduct';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { form, onSubmit, loading, error } = useCreateProduct(onSuccess);
  const { register, formState: { errors, isDirty }, setValue } = form;

  if (!isOpen) return null;

  const handleCloseAttempt = () => {
    if (isDirty) {
      const confirmClose = window.confirm("TIENES CAMBIOS SIN GUARDAR. ¿ESTÁS SEGURO DE QUE QUIERES SALIR Y PERDER EL PROGRESO?");
      if (confirmClose) onClose();
    } else {
      onClose();
    }
  };

  const handleImageUpload = (url: string, id: string) => {
    setValue('img_url', url, { shouldDirty: true });
    setValue('img_id', id, { shouldDirty: true });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 my-8 animate-in fade-in zoom-in duration-200">
        
        {/* Header Estilo Comic */}
        <div className="flex justify-between items-start mb-8 border-b-4 border-black pb-4">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
              NUEVO <span className="text-primary">SUMINISTRO</span>
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
            <Input
              label="Categoría ID"
              type="number"
              {...register('category_id')}
              error={errors.category_id?.message}
            />
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
              {loading ? 'CREANDO...' : '¡AÑADIR AL INVENTARIO!'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
