import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useRegister } from '@/hooks/auth/useRegister';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    serverError,
    handleGoogleLogin,
    showVerificationModal,
    setShowVerificationModal,
    registeredEmail
  } = useRegister();

  const handleCloseModal = () => {
    setShowVerificationModal(false);
    navigate('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        {serverError && (
          <div className="bg-error/10 border-2 border-error p-3 text-error font-bold text-xs uppercase mb-4">
            {serverError}
          </div>
        )}

        <Input
          label="Nombre Completo"
          placeholder="Peter Parker"
          icon="👤"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <Input
          label="Correo Electrónico"
          type="email"
          placeholder="spidey@dailybugle.com"
          icon="📧"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Dirección de Entrega"
          placeholder="Av. Principal #123, Tu Ciudad"
          icon="📍"
          {...register('defaultDirection')}
          error={errors.defaultDirection?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            icon="🔑"
            {...register('password')}
            error={errors.password?.message}
          />
          <Input
            label="Repetir"
            type="password"
            placeholder="********"
            icon="🛡️"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </div>

        <div className="pt-4 space-y-4">
          <Button variant="secondary" size="full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'REGISTRANDO...' : '¡UNIRME AL EQUIPO!'}
          </Button>

          <div className="text-center">
            <p className="font-bold uppercase text-xs tracking-widest text-gray-500 mb-4">
              O regístrate con
            </p>
            <Button
              variant="outline"
              type="button"
              size="full"
              className="flex items-center justify-center gap-2 hover:bg-gray-100 hover:-rotate-1 transition-all active:scale-95"
              onClick={handleGoogleLogin}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              GOOGLE
            </Button>
          </div>
        </div>

        <div className="bg-yellow-100 border-2 border-black p-3 mt-4 -rotate-1 text-center">
          <p className="text-[10px] font-bold uppercase leading-tight">
            Al unirte, aceptas nuestros términos de servicio y la política de privacidad del gremio.
          </p>
        </div>
      </form>

      <Modal
        isOpen={showVerificationModal}
        onClose={handleCloseModal}
        title="CLIENTE REGISTRADO!"
      >
        <div className="space-y-4 italic">
          <p className="font-black text-xl leading-tight">
            ¡ESTÁS CASI LISTO PARA LA ACCIÓN!
          </p>
          <p className="text-sm font-bold">
            Hemos enviado un wmail de confirmación a:
          </p>
          <div className="bg-primary/20 border-2 border-dashed border-black p-2 text-center font-black">
            {registeredEmail}
          </div>
          <p className="text-xs font-bold leading-none">
            ⚠️ POR FAVOR, REVISA TU BANDEJA DE ENTRADA (Y SPAM) PARA VERIFICAR TU CUENTA ANTES DE INICIAR SESIÓN.
          </p>
        </div>
      </Modal>
    </>
  );
};
