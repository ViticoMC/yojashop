
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-app-bg bg-dots py-20 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full relative">
        {/* Decoración Comic Superior */}
        <div className="absolute -top-12 -right-8 bg-secondary text-black font-black px-6 py-2 border-4 border-black rotate-3 z-20 shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase text-2xl">
          ¡ÚNETE!
        </div>

        <div className="bg-app-card border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">
              Crear <span className="text-secondary">Cuenta</span>
            </h1>
            <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">
              Forma parte de la comunidad YOJASHOP
            </p>
          </div>

          <RegisterForm />

          <div className="mt-8 pt-6 border-t-4 border-black text-center">
            <p className="font-bold uppercase text-sm">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary hover:underline underline-offset-4 decoration-4">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>

        {/* Efecto de capas estilo comic */}
        <div className="absolute -bottom-4 -left-4 w-full h-full bg-primary/20 -z-20 -rotate-1"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
