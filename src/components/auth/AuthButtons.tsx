import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { type User } from '@supabase/supabase-js';

export const AuthButtons: React.FC<{ isMobile?: boolean; onCloseMobile?: () => void }> = ({
  isMobile,
  onCloseMobile
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="w-20 h-8 animate-pulse bg-gray-200 border-2 border-black" />;

  if (user) {
    return (
      <Link
        to="/perfil"
        onClick={onCloseMobile}
        className={isMobile ? "w-full" : ""}
      >
        <Button
          variant="primary"
          size={isMobile ? "full" : "md"}
          className="flex items-center justify-center gap-2 rotate-1"
        >
          <span className="text-xl">👤</span>
          MI PERFIL
        </Button>
      </Link>
    );
  }

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 w-full`}>
      <Link to="/login" onClick={onCloseMobile} className={isMobile ? "w-full" : ""}>
        <Button variant="outline" size={isMobile ? "full" : "md"} className="-rotate-1">
          ENTRAR
        </Button>
      </Link>
      <Link to="/register" onClick={onCloseMobile} className={isMobile ? "w-full" : ""}>
        <Button variant="secondary" size={isMobile ? "full" : "md"} className="rotate-1">
          REGISTRO
        </Button>
      </Link>
    </div>
  );
};
