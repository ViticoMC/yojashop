import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { comboSchema, type ComboFormData, type ComboProductRelation } from '@/schemas/combo.schema';
import { useCreateCombo } from '@/hooks/admin/useCreateCombo';
import { useUpdateCombo } from '@/hooks/admin/useUpdateCombo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { ProductSelectModal } from './ProductSelectModal';
import { Plus, Minus, Trash2, ArrowLeft, Package } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabase';

interface ComboFormViewProps {
  onBack: () => void;
  onSuccess: () => void;
  editData?: any; // Datos del combo a editar si existe
}

export const ComboFormView: React.FC<ComboFormViewProps> = ({ onBack, onSuccess, editData }) => {
  const isEditing = !!editData;
  const [selectedProducts, setSelectedProducts] = useState<ComboProductRelation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { createCombo, loading: createLoading, error: createError } = useCreateCombo(onSuccess);
  const { updateCombo, loading: updateLoading, error: updateError } = useUpdateCombo(onSuccess);

  const loading = createLoading || updateLoading;
  const error = createError || updateError;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ComboFormData>({
    resolver: zodResolver(comboSchema),
    defaultValues: {
      nombre: "",
      cta: "¡LO QUIERO!",
      descriptiom: "",
      price: 0,
      discount: 0,
      foto_url: "",
    }
  });

  // Cargar datos de edición y relaciones
  useEffect(() => {
    if (editData) {
      reset({
        nombre: editData.nombre,
        cta: editData.cta,
        descriptiom: editData.descriptiom,
        price: editData.price,
        discount: editData.discount,
        foto_url: editData.foto_url,
        foto_id: editData.foto_id,
      });

      // Cargar productos relacionados
      const fetchRelations = async () => {
        const { data, error } = await supabase
          .from('combo_product')
          .select(`
            product_id,
            cantidad,
            producto (
              name,
              img_url
            )
          `)
          .eq('combo_id', editData.id);

        if (!error && data) {
          const relations = data.map((rel: any) => ({
            product_id: rel.product_id,
            cantidad: rel.cantidad,
            name: rel.producto.name,
            img_url: rel.producto.img_url
          }));
          setSelectedProducts(relations);
        }
      };

      fetchRelations();
    }
  }, [editData, reset]);


  const handleAddProduct = (product: any) => {
    setSelectedProducts(prev => [
      ...prev,
      {
        product_id: product.id,
        cantidad: 1,
        name: product.name,
        img_url: product.img_url
      }
    ]);
  };

  const handleUpdateQuantity = (productId: string | number, delta: number) => {
    setSelectedProducts(prev => prev.map(p => {
      if (p.product_id === productId) {
        const newQty = Math.max(1, p.cantidad + delta);
        return { ...p, cantidad: newQty };
      }
      return p;
    }));
  };

  const handleRemoveProduct = (productId: string | number) => {
    setSelectedProducts(prev => prev.filter(p => p.product_id !== productId));
  };

  const onSubmit = (data: ComboFormData) => {
    if (selectedProducts.length === 0) {
      alert("DEBES AÑADIR AL MENOS UN PRODUCTO AL COMBO");
      return;
    }
    
    if (isEditing) {
      updateCombo(editData.id, data, selectedProducts);
    } else {
      createCombo(data, selectedProducts);
    }
  };

  const handleImageUpload = (url: string, id: string) => {
    setValue('foto_url', url, { shouldDirty: true });
    setValue('foto_id', id, { shouldDirty: true });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Header Formulario */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-black uppercase italic text-sm hover:text-primary transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          VOLVER AL LISTADO
        </button>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
          {isEditing ? 'EDITAR' : 'CREAR'} <span className="text-primary">{isEditing ? 'COMBO' : 'SUPER COMBO'}</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Columna Izquierda: Datos del Combo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h3 className="text-xl font-black uppercase italic border-b-4 border-black pb-2 mb-4">Información General</h3>

            <Input
              label="Nombre del Combo"
              placeholder="Ej: Combo Desayuno Familiar"
              {...register('nombre')}
              error={errors.nombre?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Texto del Botón (CTA)"
                placeholder="Ej: ¡LO QUIERO!"
                {...register('cta')}
                error={errors.cta?.message}
              />
              <Input
                label="Descuento (%)"
                type="number"
                {...register('discount')}
                error={errors.discount?.message}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-black">Descripción del Combo</label>
              <textarea
                {...register('descriptiom')}
                rows={4}
                className="w-full bg-white border-4 border-black p-4 font-bold uppercase italic focus:ring-0 focus:bg-primary/5 transition-colors outline-none resize-none"
                placeholder="Describe qué incluye este combo y por qué es increíble..."
              />
              {errors.descriptiom && <p className="text-xs text-error font-bold italic">{errors.descriptiom.message}</p>}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <Input
                label="Precio Total Combo ($)"
                type="number"
                step="0.01"
                {...register('price')}
                error={errors.price?.message}
              />
              <ImageUpload
                onUploadSuccess={handleImageUpload}
                label="Imagen Publicitaria del Combo"
              />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Productos en el Combo */}
        <div className="space-y-6">
          <div className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(239,68,68,1)]">
            <div className="flex justify-between items-center border-b-2 border-white/20 pb-4 mb-4">
              <h3 className="text-xl font-black uppercase italic flex items-center gap-2">
                <Package size={20} />
                PRODUCTOS ({selectedProducts.length})
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-black p-2 border-2 border-black hover:scale-110 transition-all shadow-[2px_2px_0px_white]"
              >
                <Plus size={20} strokeWidth={4} />
              </button>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {selectedProducts.length > 0 ? (
                selectedProducts.map((p) => (
                  <div key={p.product_id} className="bg-white text-black border-4 border-black p-3 flex gap-3 transform -rotate-1">
                    <div className="w-12 h-12 border-2 border-black overflow-hidden shrink-0">
                      <img src={optimizeCloudinaryUrl(p.img_url || '', 100)} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black uppercase tracking-tighter text-[10px] truncate leading-tight">{p.name}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(p.product_id, -1)}
                          className="bg-gray-100 border-2 border-black p-0.5 hover:bg-secondary"
                        >
                          <Minus size={12} strokeWidth={4} />
                        </button>
                        <span className="font-black text-sm w-4 text-center">{p.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(p.product_id, 1)}
                          className="bg-gray-100 border-2 border-black p-0.5 hover:bg-secondary"
                        >
                          <Plus size={12} strokeWidth={4} />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.product_id)}
                      className="text-error hover:scale-110 transition-all self-center"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center border-2 border-dashed border-white/20">
                  <p className="text-[10px] font-bold uppercase italic text-gray-400">No hay productos añadidos</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-4 border-t-2 border-white/20">
              {error && (
                <div className="bg-error/20 border-2 border-error p-2 mb-4 text-[10px] font-black uppercase italic text-error">
                  ⚠️ {error}
                </div>
              )}
              <Button
                variant="primary"
                type="submit"
                className="w-full rotate-1 text-lg"
                disabled={loading}
              >
                {loading ? 'PROCESANDO...' : 'GUARDAR COMBO  '}
              </Button>
            </div>
          </div>
        </div>
      </form>

      <ProductSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleAddProduct}
        selectedIds={selectedProducts.map(p => p.product_id)}
      />
    </div>
  );
};
