;
import { Banknote, Users, Package, Star, TrendingUp, Map } from 'lucide-react';

export const AdminStats = () => {
  // Mock data for visual representation
  const stats = [
    { label: 'Ventas Totales', value: '$128,450', color: 'bg-primary', icon: <Banknote size={32} /> },
    { label: 'Nuevos Clientes', value: '45', color: 'bg-secondary', icon: <Users size={32} /> },
    { label: 'Pedidos Pendientes', value: '12', color: 'bg-error', icon: <Package size={32} /> },
    { label: 'Satisfacción', value: '98%', color: 'bg-success', icon: <Star size={32} /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${stat.color} border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform flex flex-col`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-black bg-white/20 p-2 border-2 border-black/10 rounded-sm">
                {stat.icon}
              </div>
              <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter shadow-[2px_2px_0px_rgba(255,255,255,0.3)]">Live</span>
            </div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black/60 mb-1">{stat.label}</h3>
            <p className="text-3xl font-black italic tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Mock Gráficas Estilo Comic */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-1">
          <div className="flex items-center gap-2 mb-6 border-b-4 border-black pb-2 inline-flex">
            <TrendingUp size={20} className="text-primary" />
            <h3 className="text-xl font-black uppercase italic">Flujo de Batalla (Ventas Semanales)</h3>
          </div>
          <div className="h-48 flex items-end gap-2 px-2">
            {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-primary border-2 border-black group-hover:bg-secondary transition-colors relative shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] px-1 font-bold z-10">
                    {h}k
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase">D{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1">
          <div className="flex items-center gap-2 mb-6 border-b-4 border-black pb-2 inline-flex">
            <Map size={20} className="text-secondary" />
            <h3 className="text-xl font-black uppercase italic">Zonas de Despliegue</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Centro Ciudad', p: 75, c: 'bg-primary' },
              { label: 'Sector Norte', p: 45, c: 'bg-secondary' },
              { label: 'Distrito Sur', p: 60, c: 'bg-success' },
            ].map((zona, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[10px] font-black uppercase italic">
                  <span>{zona.label}</span>
                  <span>{zona.p}%</span>
                </div>
                <div className="h-4 bg-gray-100 border-2 border-black overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                  <div className={`h-full ${zona.c} border-r-2 border-black transition-all duration-1000`} style={{ width: `${zona.p}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
