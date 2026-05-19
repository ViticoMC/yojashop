
import { LoginForm } from '@/components/auth/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-app-bg bg-dots py-20 px-4 flex items-center justify-center">
      <div className="max-w-md w-full relative">
        {/* Decoración Comic Superior */}
        <div className="absolute -top-12 -left-8 bg-primary text-black font-black px-4 py-2 border-4 border-black -rotate-6 z-20 shadow-[4px_4px_0px_rgba(0,0,0,1)] uppercase text-2xl">
          ¡HOLA!
        </div>

        <div className="bg-app-card border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">
              Iniciar <span className="text-primary">Sesión</span>
            </h1>
            <p className="font-bold text-gray-500 uppercase text-xs tracking-widest">
              Bienvenido de vuelta, ciudadano
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t-4 border-black text-center">
            <p className="font-bold uppercase text-sm">
              ¿Eres nuevo aquí?{' '}
              <Link to="/register" className="text-secondary hover:underline underline-offset-4 decoration-4">
                Regístrate ahora
              </Link>
            </p>
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute -bottom-6 -right-6 w-full h-full bg-black -z-10 rotate-1"></div>
      </div>
    </div>
  );
};

export default LoginPage;
