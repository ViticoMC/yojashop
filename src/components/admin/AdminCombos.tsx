import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminCombos } from '@/hooks/admin/useAdminCombos';
import { useDeleteCombo } from '@/hooks/admin/useDeleteCombo';
import { ComboFormView } from './ComboFormView';
import { Button } from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import type { AdminCombo } from '@/types/combo';
import { PlusCircle, Trash2, LayoutGrid, Pencil, Eye } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary';

export const AdminCombos = () => {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [selectedCombo, setSelectedCombo] = useState<AdminCombo | null>(null);
  const navigate = useNavigate();
  const { combos, loading, refetch } = useAdminCombos();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [comboToDelete, setComboToDelete] = useState<{ id: string | number, fotoId?: string } | null>(null);

  const { deleteCombo, loading: deleting } = useDeleteCombo(() => {
    refetch();
    setIsDeleteModalOpen(false);
  });

  const handleOpenDelete = (id: string | number, fotoId?: string) => {
    setComboToDelete({ id, fotoId });
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (combo: AdminCombo) => {
    setSelectedCombo(combo);
    setView('edit');
  };

  if (view === 'create' || view === 'edit') {
    return (
      <ComboFormView
        onBack={() => {
          setView('list');
          setSelectedCombo(null);
        }}
        onSuccess={() => {
          setView('list');
          setSelectedCombo(null);
          refetch();
        }}
        editData={selectedCombo}
      />
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Sección */}
      <div className="flex justify-between items-center bg-black p-4 -rotate-1 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
          <LayoutGrid size={24} />
          Gestión de Combos Especiales
        </h2>
        <Button
          variant="primary"
          size="sm"
          className="rotate-2 flex items-center gap-2"
          onClick={() => setView('create')}
        >
          <PlusCircle size={18} />
          CREAR COMBO
        </Button>
      </div>

      {/* Grid de Combos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-gray-100 border-4 border-black h-64 animate-pulse shadow-[6px_6px_0px_rgba(0,0,0,1)]" />
          ))
        ) : combos.length > 0 ? (
          combos.map((combo) => (
            <div key={combo.id} className="group relative bg-white border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all flex flex-col h-full overflow-hidden">
              <div className="relative h-40 border-b-4 border-black overflow-hidden shrink-0">
                <img
                  src={optimizeCloudinaryUrl(combo.foto_url, 500)}
                  alt={combo.nombre}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-primary text-black text-[10px] font-black px-2 py-1 uppercase border-2 border-black rotate-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  -{combo.discount}% OFF
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xl font-black uppercase italic tracking-tighter leading-none mb-2">{combo.nombre}</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase italic line-clamp-2 mb-4">{combo.descriptiom}</p>

                <div className="mt-auto flex justify-between items-end">

                  <div className="flex flex-col">
                    <span className="text-2xl font-black italic">${combo.price.toFixed(2)}</span>
                    <span className="text-[10px] font-black uppercase text-secondary italic">CTA: {combo.cta}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/combos/${combo.id}`)}
                      className="p-2 border-4 border-black bg-white hover:bg-secondary transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      title="Ver Detalles"
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      onClick={() => handleEdit(combo)}
                      className="p-2 border-4 border-black bg-white hover:bg-primary transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      title="Editar"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleOpenDelete(combo.id, combo.foto_id)}
                      className="p-2 border-4 border-black bg-white hover:bg-error hover:text-white transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      title="Eliminar"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white border-4 border-dashed border-black">
            <p className="text-xl font-black uppercase italic text-gray-400">No hay combos creados todavía</p>
            <Button variant="outline" className="mt-4" onClick={() => setView('create')}>Comenzar a crear</Button>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => comboToDelete && deleteCombo(comboToDelete.id, comboToDelete.fotoId)}
        loading={deleting}
        title="ELIMINAR COMBO"
        message="¿ESTÁS SEGURO DE QUE QUIERES ELIMINAR ESTE COMBO? ESTA ACCIÓN NO SE PUEDE DESHACER Y SE PERDERÁN LAS RELACIONES CON LOS PRODUCTOS."
        confirmText="SÍ, ELIMINAR"
        cancelText="CANCELAR"
      />
    </div>
  );
};
