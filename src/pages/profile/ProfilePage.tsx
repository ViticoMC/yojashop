import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import { ShieldAlert, Trophy, Gift, Zap } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  isCompleted: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  default_direction: string;
  status: string;
  role: 'admin' | 'client';
  avatar?: string;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    title: "Primer Despliegue",
    description: "Realiza tu primer pedido en la tienda.",
    progress: 1,
    total: 1,
    reward: "Manzana Gratis",
    isCompleted: true,
  },
  {
    id: 2,
    title: "Cliente Frecuente",
    description: "Realiza 5 pedidos para desbloquear suministros premium.",
    progress: 3,
    total: 5,
    reward: "Pack de Bebidas",
    isCompleted: false,
  },
  {
    id: 3,
    title: "Súper Ahorrador",
    description: "Ahorra más de $50 acumulados en ofertas.",
    progress: 15,
    total: 50,
    reward: "Combo Sorpresa",
    isCompleted: false,
  }
];



export const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const fetchProfile = async () => {
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
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

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

  const onUpdateSuccess = async () => {
    await fetchProfile();
    setIsEditing(false);
    setSuccess(false);
  };

  useEffect(() => {
    if (updateSuccess) {
      onUpdateSuccess();
    }
  }, [updateSuccess]);

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
      <div className="max-w-2xl mx-auto mt-16 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b-8 border-black pb-4">
          <div className="relative">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
              TUS <span className="text-secondary">LOGROS</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-widest rotate-1 w-fit">
              <Trophy size={14} className="text-primary" />
              {MOCK_ACHIEVEMENTS.filter(a => a.isCompleted).length} DE {MOCK_ACHIEVEMENTS.length} COMPLETADOS
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {MOCK_ACHIEVEMENTS.map((achievement) => (
            <div
              key={achievement.id}
              className={`
                relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:scale-[1.02]
                ${achievement.isCompleted ? 'bg-success/5' : ''}
              `}
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-black uppercase italic leading-none mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                    {achievement.description}
                  </p>
                </div>
                {achievement.isCompleted && (
                  <div className="bg-success text-black border-2 border-black p-1 rotate-12 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <ShieldAlert size={20} />
                  </div>
                )}
              </div>

              {/* Barra de Progreso */}
              <div className="space-y-2">
                <div className="flex justify-between items-end text-[10px] font-black uppercase italic">
                  <span>PROGRESO: {achievement.progress}/{achievement.total}</span>
                  <span className="flex items-center gap-1 text-primary">
                    <Gift size={12} />
                    RECOMPENSA: {achievement.reward}
                  </span>
                </div>

                <div className="relative h-6 bg-gray-100 border-4 border-black overflow-hidden shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]">
                  <div
                    className={`h-full transition-all duration-1000 ease-out flex items-center justify-end px-2 border-r-4 border-black
                      ${achievement.isCompleted ? 'bg-success' : 'bg-primary'}
                    `}
                    style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                  >
                    {achievement.progress / achievement.total > 0.1 && (
                      <Zap size={14} className="text-black/30 animate-pulse" />
                    )}
                  </div>

                  {/* Icono de recompensa al final de la barra */}
                  <div className="absolute right-0 top-0 h-full w-12 bg-secondary border-l-4 border-black flex items-center justify-center group">
                    <Gift
                      size={16}
                      className={`transition-transform group-hover:scale-125 ${achievement.isCompleted ? 'text-black animate-bounce' : 'text-black/40'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
