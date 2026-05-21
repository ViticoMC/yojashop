import { useState } from 'react';
import { useAdminLogros } from '@/hooks/admin/useAdminLogros';
import { ACHIEVEMENT_ICONS, DIFFICULTY_COLORS, getAchievementIcon, type AchievementDifficulty } from '@/lib/achievement-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Trophy, PlusCircle, Trash2, Coins, Target } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

export const AdminLogros = () => {
  const [showForm, setShowForm] = useState(false);
  const { logros, loading, createLogro, isCreating, deleteLogro } = useAdminLogros();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    total_task: 1,
    reward: 100,
    dificultad: 'low' as AchievementDifficulty,
    icon: 'Trophy'
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logroToDelete, setLogroToDelete] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLogro(formData);
      setShowForm(false);
      setFormData({
        title: '',
        description: '',
        total_task: 1,
        reward: 100,
        dificultad: 'low',
        icon: 'Trophy'
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (logroToDelete) {
      await deleteLogro(logroToDelete);
      setIsDeleteModalOpen(false);
      setLogroToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header Sección */}
      <div className="flex justify-between items-center bg-black p-4 -rotate-1 shadow-[4px_4px_0px_rgba(16,185,129,1)]">
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter flex items-center gap-2">
          <Trophy size={24} className="text-primary" />
          SISTEMA DE LOGROS Y RECOMPENSAS
        </h2>
        <Button
          variant="primary"
          size="sm"
          className="rotate-2 flex items-center gap-2"
          onClick={() => setShowForm(!showForm)}
        >
          <PlusCircle size={18} />
          {showForm ? 'CANCELAR' : 'NUEVO LOGRO'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
          <h3 className="text-xl font-black uppercase italic border-b-4 border-black pb-2 mb-4">Configurar Nuevo Desafío</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Título del Logro"
              placeholder="Ej: Maestro de la Fruta"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-black">Icono Representativo</label>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 bg-gray-50 p-3 border-4 border-black max-h-40 overflow-y-auto custom-scrollbar">
                {Object.keys(ACHIEVEMENT_ICONS).map(iconName => (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-2 border-2 flex items-center justify-center transition-all ${formData.icon === iconName
                      ? 'bg-primary border-black scale-110 shadow-[2px_2px_0px_black]'
                      : 'bg-white border-gray-200 hover:border-black'
                      }`}
                    title={iconName}
                  >
                    {getAchievementIcon(iconName, 20)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-black">Descripción del Logro</label>
            <textarea
              className="w-full bg-white border-4 border-black p-4 font-bold uppercase italic outline-none resize-none h-24"
              placeholder="¿Qué debe hacer el usuario para ganar esto?"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label="Objetivo (Cantidad)"
              type="number"
              value={formData.total_task}
              onChange={(e) => setFormData({ ...formData, total_task: parseInt(e.target.value) })}
              required
            />
            <Input
              label="Recompensa (Puntos/Monedas)"
              type="number"
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: parseInt(e.target.value) })}
              required
            />
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-black">Nivel de Dificultad</label>
              <div className="flex gap-2">
                {(['low', 'mid', 'high'] as AchievementDifficulty[]).map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setFormData({ ...formData, dificultad: diff })}
                    className={`flex-1 py-2 font-black uppercase italic text-xs border-4 border-black transition-all ${formData.dificultad === diff
                      ? `${DIFFICULTY_COLORS[diff].bg} shadow-[2px_2px_0px_black]`
                      : 'bg-white hover:bg-gray-50'
                      }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vista previa del logro */}
          <div className="pt-6 border-t-4 border-black border-dashed">
            <h4 className="text-sm font-black uppercase italic mb-4 flex items-center gap-2">
              <Target size={16} />
              Previsualización en Perfil
            </h4>
            <div className="flex justify-center">
              <div
                className={`relative bg-white border-4 border-black p-6 w-full max-w-sm ${DIFFICULTY_COLORS[formData.dificultad].shadow}`}
              >
                <div className={`absolute -top-4 -left-4 p-3 border-4 border-black ${DIFFICULTY_COLORS[formData.dificultad].bg} rotate-3`}>
                  {getAchievementIcon(formData.icon, 28, "text-black")}
                </div>
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter leading-tight">
                    {formData.title || 'Título del Logro'}
                  </h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase leading-tight italic">
                    {formData.description || 'Aquí aparecerá la descripción de cómo obtener el logro...'}
                  </p>
                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-3 border-2 border-black bg-gray-100 overflow-hidden">
                        <div className={`h-full ${DIFFICULTY_COLORS[formData.dificultad].bg} w-2/3 animate-pulse`} />
                      </div>
                      <span className="text-[10px] font-black italic">66/{formData.total_task}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest italic transform -skew-x-12">
                        <Coins size={10} className="text-primary" />
                        +{formData.reward}
                      </div>
                      <div className={`px-2 py-0.5 border-2 border-black text-[8px] font-black uppercase italic ${DIFFICULTY_COLORS[formData.dificultad].bg}`}>
                        DIFFICULTY: {formData.dificultad}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button variant="black" size="full" type="submit" disabled={isCreating}>
            {isCreating ? 'GUARDANDO...' : '¡PUBLICAR LOGRO EXPLOSIVO! 💥'}
          </Button>
        </form>
      )}

      {/* Listado de Logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 border-4 border-black animate-pulse shadow-[6px_6px_0px_black]" />
          ))
        ) : logros.length > 0 ? (
          logros.map((logro) => {
            const colors = DIFFICULTY_COLORS[logro.dificultad];
            return (
              <div
                key={logro.id}
                className={`relative bg-white border-4 border-black p-6 ${colors.shadow} hover:-translate-y-1 transition-all group`}
              >
                <div className={`absolute -top-4 -left-4 p-3 border-4 border-black ${colors.bg} rotate-3 group-hover:rotate-0 transition-transform`}>
                  {getAchievementIcon(logro.icon, 28, "text-black")}
                </div>

                <button
                  onClick={() => {
                    setLogroToDelete(logro.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="absolute top-2 right-2 text-gray-300 hover:text-error transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-black uppercase italic tracking-tighter leading-tight pr-6">
                      {logro.title}
                    </h3>
                  </div>

                  <p className="text-[10px] font-bold text-gray-500 uppercase leading-tight line-clamp-2 italic">
                    {logro.description}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-3 border-2 border-black bg-gray-100 overflow-hidden">
                        <div className={`h-full ${colors.bg} w-1/3`} />
                      </div>
                      <span className="text-[10px] font-black italic">0/{logro.total_task}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest italic transform -skew-x-12">
                        <Coins size={10} className="text-primary" />
                        +{logro.reward}
                      </div>
                      <div className={`px-2 py-0.5 border-2 border-black text-[8px] font-black uppercase italic ${colors.bg}`}>
                        DIFFICULTY: {logro.dificultad}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center border-4 border-dashed border-gray-300 bg-gray-50">
            <Trophy size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="font-black uppercase italic text-gray-400">No hay logros configurados todavía</p>
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="ELIMINAR LOGRO"
        message="¿ESTÁS SEGURO DE QUE QUIERES ELIMINAR ESTE LOGRO? LOS USUARIOS QUE LO HAYAN CONSEGUIDO O ESTÉN EN PROGRESO PODRÍAN VERSE AFECTADOS."
        confirmText="SÍ, ELIMINAR"
        cancelText="CANCELAR"
      />
    </div>
  );
};
