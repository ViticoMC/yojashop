import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { UserProfile } from '@/types/user';
import { type UseFormRegister, type FieldErrors, type FieldValues } from 'react-hook-form';

interface ProfileInfoProps {
  profile: UserProfile | null;
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  register: UseFormRegister<FieldValues>;
  handleSubmit: () => void;
  errors: FieldErrors<FieldValues>;
  updating: boolean;
  updateError: string | null;
  handleLogout: () => void;
}

export const ProfileInfo = ({
  profile,
  isEditing,
  setIsEditing,
  register,
  handleSubmit,
  errors,
  updating,
  updateError,
  handleLogout
}: ProfileInfoProps) => {
  return (
    <div className="bg-app-card border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
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
                error={errors.fullName?.message as string}
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
              error={errors.defaultDirection?.message as string}
              defaultValue={profile?.default_direction}
            />
          </div>
        )}

        {updateError && (
          <div className="bg-error/10 border-2 border-error p-3 text-error font-bold text-xs uppercase">
            {updateError}
          </div>
        )}
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
  );
};
