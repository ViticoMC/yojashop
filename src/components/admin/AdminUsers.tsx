import { useState } from 'react';
import { useAdminUsers } from '@/hooks/admin/useAdminUsers';
import { Button } from '@/components/ui/Button';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

export const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const { users, totalCount, loading, totalPages } = useAdminUsers(page);

  return (
    <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      <div className="flex justify-between items-center mb-8 border-b-4 border-black pb-4">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter">Archivo de Clientes</h2>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{totalCount} Usuarios Registrados</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black text-white italic uppercase text-sm">
              <th className="p-3 border-2 border-black">Cliente</th>
              <th className="p-3 border-2 border-black">Rango</th>
              <th className="p-3 border-2 border-black hidden md:table-cell">Cuartel (Dirección)</th>
              <th className="p-3 border-2 border-black">Estatus</th>
            </tr>
          </thead>
          <tbody className="font-bold uppercase text-xs">
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={4} className="p-4 border-2 border-black bg-gray-50 h-12" />
                </tr>
              ))
            ) : (
              users.map((u) => (
                <tr key={u.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="p-3 border-2 border-black">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary border-2 border-black flex items-center justify-center text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                        <User size={16} />
                      </div>
                      <span className="font-black group-hover:text-primary transition-colors">{u.name}</span>
                    </div>
                  </td>
                  <td className="p-3 border-2 border-black">
                    <span className={`px-2 py-0.5 border-2 border-black text-[10px] ${u.role === 'admin' ? 'bg-error text-white' : 'bg-success/20 text-black'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 border-2 border-black hidden md:table-cell max-w-[200px] truncate italic">
                    {u.default_direction || 'Sin dirección'}
                  </td>
                  <td className="p-3 border-2 border-black">
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full border border-black ${u.status === 'activo' ? 'bg-success' : 'bg-gray-400'}`} />
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación Estilo Comic */}
      <div className="mt-8 flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1 || loading}
          className="-rotate-2 flex items-center gap-1"
        >
          <ChevronLeft size={16} />
          Anterior
        </Button>
        <div className="bg-black text-white px-4 py-1 font-black skew-x-12">
          PÁGINA {page} DE {totalPages || 1}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || loading}
          className="rotate-2 flex items-center gap-1"
        >
          Siguiente
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};
