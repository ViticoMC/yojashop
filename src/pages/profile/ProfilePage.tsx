import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfile } from '@/hooks/auth/useUpdateProfile';
import { useScrollTop } from '@/hooks/ui/useScrollTop';
import { useProfile } from '@/hooks/auth/useProfile';
import { Loader2 } from 'lucide-react';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfileOrders } from '@/components/profile/ProfileOrders';
import { ProfileLogros } from '@/components/profile/ProfileLogros';

export const ProfilePage = () => {
  useScrollTop();
  const navigate = useNavigate();
  const { profile, loading, refetch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!loading && !profile) {
      navigate('/login');
    }
  }, [loading, profile, navigate]);

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
      refetch().then(() => {
        setIsEditing(false);
        setSuccess(false);
      });
    }
  }, [updateSuccess, refetch, setSuccess]);

  if (loading) return (
    <div className="fixed inset-0 bg-app-bg z-50 flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary blur-2xl opacity-20 animate-pulse" />
        <Loader2 size={64} className="text-black animate-spin relative z-10" strokeWidth={3} />
      </div>
      <div className="text-center">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter animate-bounce">
          Cargando...
        </h2>
        <div className="h-2 w-48 bg-black/10 mx-auto mt-2 overflow-hidden border-2 border-black">
          <div className="h-full bg-primary animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-app-bg bg-dots py-20 px-4">
      <div className="max-w-2xl mx-auto relative">
        {/* Badge de Estatus */}
        <div className="absolute -top-6 -right-6 bg-success text-black font-black px-6 py-2 border-4 border-black rotate-6 z-20 shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase">
          {profile?.status || 'ACTIVO'}
        </div>

        <ProfileInfo
          profile={profile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          updating={updating}
          updateError={updateError}
          handleLogout={handleLogout}
        />

        {/* Decoración de fondo */}
        <div className="absolute -bottom-6 -left-6 w-full h-full bg-primary/10 -z-10 -rotate-1"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        <ProfileOrders />
        <ProfileLogros />
      </div>
    </div>
  );
};

export default ProfilePage;
