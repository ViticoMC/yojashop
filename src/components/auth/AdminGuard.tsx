
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/auth/useAdmin';

interface AdminGuardProps {
  children: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen bg-app-bg flex items-center justify-center">
        <div className="text-2xl font-black uppercase italic animate-pulse">Verificando Credenciales de Administrador...</div>
      </div>
    );
  }

  if (isAdmin === false) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

