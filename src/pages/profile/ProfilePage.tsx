import { useEffect, useState, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import { useUserAchievements } from '@/hooks/shop/useUserAchievements';
import type { AchievementWithProgress } from '@/types/combo';
import type { UserProfile } from '@/types/user';
import { DIFFICULTY_COLORS, getAchievementIcon } from '@/lib/achievement-icons';
import { ShieldAlert, Trophy, Gift, Zap, CheckCircle2, Lock } from 'lucide-react';

export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const { data: achievements } = useUserAchievements();

  const sections = useMemo(() => {
    if (!achievements) return { completed: [], inProgress: [], locked: [] };

    return {
      completed: achievements.filter(a => a.is_completed),
      inProgress: achievements.filter(a => a.user_progress > 0 && !a.is_completed),
      locked: achievements.filter(a => a.user_progress === 0 && !a.is_completed)
    };
  }, [achievements]);

  const fetchProfile = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate('/login');
      return;
    }

    const { data, error } = await supabase
      .from('usuario')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const {
    register,
    handleSubmit,
    errors,
    loading: updating,
    error: updateError,
    success: updateSuccess,
    setSuccess
  } = useUpdateProfile({
    fullName: profile?.name || "",
    defaultDirection: profile?.default_direction || "",
  });

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  useEffect(() => {
    if (updateSuccess) {
      fetchProfile().then(() => {
        setIsEditing(false);
        setSuccess(false);
      });
    }
  }, [updateSuccess, fetchProfile, setSuccess]);

  if (loading) return (
    <div className="min-h-screen bg-app-bg flex items-center justify-center">
      <div className="text-2xl font-black uppercase italic animate-pulse">Cargando expediente...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-app-bg bg-dots py-20 px-4">
      <div className="max-w-2xl mx-auto relative">
        {/* Badge de Estatus */}
        <div className="absolute -top-6 -right-6 bg-success text-black font-black px-6 py-2 border-4 border-black rotate-6 z-20 shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">
          {profile?.status || 'ACTIVO'}
        </div>

        <div className="bg-app-card border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
            {/* Placeholder de Avatar Estilo Comic */}
            <div className="w-32 h-32 bg-secondary border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center text-5xl shrink-0">
              👤
            </div>

            <div className="text-center md:text-left w-full">
              {!isEditing ? (
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-2">
                  {profile?.name || 'Usuario Sin Nombre'}
                </h1>
              ) : (
                <div className="w-full">
                  <Input
                    label="Nombre de Cliente"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                    defaultValue={profile?.name}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {!isEditing ? (
              <div className="bg-white border-4 border-black p-4 rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xs font-black uppercase text-primary mb-1">Dirección Predeterminada</h3>
                <p className="font-bold text-lg uppercase tracking-tight">
                  {profile?.default_direction || 'No registrada'}
                </p>
              </div>
            ) : (
              <div className="bg-white border-4 border-black p-4 rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <Input
                  label="Cuartel General (Dirección)"
                  {...register('defaultDirection')}
                  error={errors.defaultDirection?.message}
                  defaultValue={profile?.default_direction}
                />
              </div>
            )}

            {updateError && (
              <div className="bg-error/10 border-2 border-error p-3 text-error font-bold text-xs uppercase">
                {updateError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-4 border-black p-4 -rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xs font-black uppercase text-secondary mb-1">Pedidos Realizados</h3>
                <p className="font-black text-3xl italic">0</p>
              </div>
              <div className="bg-white border-4 border-black p-4 rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xs font-black uppercase text-success mb-1">Nivel de Lealtad</h3>
                <p className="font-black text-3xl italic uppercase">Novato</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-4 border-black flex flex-wrap gap-4">
            {!isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="full"
                  className="md:w-auto"
                  onClick={() => setIsEditing(true)}
                >
                  EDITAR PERFIL
                </Button>

                {profile?.role === 'admin' && (
                  <Link to="/administracion" className="w-full md:w-auto">
                    <Button
                      variant="primary"
                      size="full"
                      className="md:w-auto flex items-center justify-center gap-2 -rotate-1"
                    >
                      <ShieldAlert size={18} />
                      ADMINISTRACIÓN
                    </Button>
                  </Link>
                )}

                <Button variant="black" size="full" className="md:w-auto md:ml-auto" onClick={handleLogout}>
                  CERRAR SESIÓN
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="full"
                  className="md:w-auto"
                  onClick={handleSubmit}
                  disabled={updating}
                >
                  {updating ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                </Button>
                <Button
                  variant="outline"
                  size="full"
                  className="md:w-auto"
                  onClick={() => setIsEditing(false)}
                  disabled={updating}
                >
                  CANCELAR
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute -bottom-6 -left-6 w-full h-full bg-primary/10 -z-10 -rotate-1"></div>
      </div>

      {/* SECCIÓN DE LOGROS */}
      <div className="max-w-2xl mx-auto mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b-8 border-black pb-4">
          <div className="relative">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
              TUS <span className="text-primary">MISIONES</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest rotate-1 w-fit">
              <Trophy size={14} className="text-secondary" />
              {sections.completed.length} DE {(achievements?.length || 0)} COMPLETADOS
            </div>
          </div>
        </div>

        {/* Misiones Completadas */}
        {sections.completed.length > 0 && (
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-2xl font-black uppercase italic text-emerald-600">
              <CheckCircle2 /> COMPLETADAS
            </h3>
            <div className="space-y-6">
              {sections.completed.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {/* Misiones en Progreso */}
        {sections.inProgress.length > 0 && (
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-2xl font-black uppercase italic text-amber-500">
              <Zap className="fill-amber-500" /> EN PROGRESO
            </h3>
            <div className="space-y-6">
              {sections.inProgress.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}

        {/* Resto de Misiones */}
        {sections.locked.length > 0 && (
          <div className="space-y-6">
            <h3 className="flex items-center gap-2 text-2xl font-black uppercase italic text-gray-400">
              <Lock /> POR DESCUBRIR
            </h3>
            <div className="space-y-6">
              {sections.locked.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const AchievementCard = ({ achievement }: { achievement: AchievementWithProgress }) => {
  const colors = DIFFICULTY_COLORS[achievement.dificultad];
  const progressPercent = Math.min((achievement.user_progress / achievement.total_task) * 100, 100);
  const isLocked = achievement.user_progress === 0 && !achievement.is_completed;

  return (
    <div
      className={`
        relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:scale-[1.02]
        ${achievement.is_completed ? 'bg-emerald-50' : ''}
        ${isLocked ? 'bg-gray-50' : ''}
      `}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex gap-4 items-center">
          <div className={`p-3 border-4 border-black ${colors.bg} ${colors.shadow} rotate-3 ${isLocked ? 'grayscale' : ''}`}>
            {getAchievementIcon(achievement.icon, 32, "text-black")}
          </div>
          <div className={isLocked ? 'opacity-70' : ''}>
            <h3 className="text-xl font-black uppercase italic leading-none mb-1">
              {achievement.title}
            </h3>
            <p className="text-xs font-bold text-black/60 uppercase tracking-tight">
              {achievement.description}
            </p>
          </div>
        </div>
        {achievement.is_completed && (
          <div className="bg-success text-black border-2 border-black p-1 rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            <CheckCircle2 size={24} />
          </div>
        )}
      </div>

      {/* Barra de Progreso */}
      <div className="space-y-2">
        <div className="flex justify-between items-end text-[10px] font-black uppercase italic">
          <span>PROGRESO: {achievement.user_progress}/{achievement.total_task}</span>
          <span className="flex items-center gap-1 text-primary">
            <Gift size={12} />
            RECOMPENSA: ${achievement.reward}
          </span>
        </div>

        <div className="relative h-8 bg-gray-100 border-4 border-black overflow-hidden shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]">
          <div
            className={`h-full transition-all duration-1000 ease-out flex items-center justify-end px-2 border-r-4 border-black
              ${achievement.is_completed ? 'bg-success' : 'bg-primary'}
            `}
            style={{ width: `${progressPercent}%` }}
          >
            {progressPercent > 10 && (
              <Zap size={14} className="text-black/30 animate-pulse" />
            )}
          </div>

          {/* Icono de recompensa al final de la barra */}
          <div className={`absolute right-0 top-0 h-full w-12 border-l-4 border-black flex items-center justify-center group ${achievement.is_completed ? 'bg-secondary' : 'bg-gray-200'}`}>
            <Gift
              size={16}
              className={`transition-transform group-hover:scale-125 ${achievement.is_completed ? 'text-black animate-bounce' : 'text-black/40'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
