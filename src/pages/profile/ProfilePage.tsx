import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';

interface UserProfile {
  id: string;
  name: string;
  default_direction: string;
  status: string;
  role: 'admin' | 'client';
  avatar?: string;
}

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

          <div className="mt-12 pt-8 border-t-4 border-black flex flex-col md:flex-row gap-4">
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
    </div>
  );
};

export default ProfilePage;
