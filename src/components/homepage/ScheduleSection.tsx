
import { Briefcase, ShoppingBag, Moon } from 'lucide-react';
import { HighlightText } from '@/components/ui/HighlightText';

const SCHEDULE_DATA = [
  {
    days: "Lunes a Viernes",
    hours: "18:00 - 22:00",
    note: "¡Justo después de tu jornada!",
    icon: <Briefcase size={28} />,
    accent: "bg-primary"
  },
  {
    days: "Sábados",
    hours: "10:00 - 20:00",
    note: "Horario extendido",
    icon: <ShoppingBag size={28} />,
    accent: "bg-secondary"
  },
  {
    days: "Domingos",
    hours: "Cerrado",
    note: "Recargando energías",
    icon: <Moon size={28} />,
    accent: "bg-gray-400"
  }
];

export const ScheduleSection = () => {
  return (
    <section className="py-24 bg-app-bg relative overflow-hidden">
      {/* Elementos decorativos de fondo (Ben-Day dots extra) */}
      <div className="absolute top-0 left-0 w-full h-20 bg-black -skew-y-2 origin-left z-0" />

      <div className="max-w-300 mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-app-text mb-4 italic">
            <span className="relative inline-block">
              <span className="relative z-10 text-primary drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">Horarios</span>
              <span className="absolute -inset-1 bg-black -rotate-2 -z-10"></span>
            </span>
            <br />
            de <span className="text-secondary drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Atención</span>
          </h2>
          <div className="inline-block bg-black text-white font-bold px-6 py-2 border-2 border-white -rotate-1 shadow-[4px_4px_0px_rgba(239,68,68,1)]">
            VENTAS DISPONIBLES AL CIERRE LABORAL
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SCHEDULE_DATA.map((item, index) => (
            <div
              key={index}
              className={`relative bg-app-card border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group hover:-translate-y-2 transition-transform duration-300 ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                }`}
            >
              {/* Círculo de acento estilo "Explosión" */}
              <div className={`absolute -top-6 -right-6 w-16 h-16 ${item.accent} border-4 border-black rounded-full flex items-center justify-center text-3xl shadow-[4px_4px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2 border-b-4 border-black pb-2 inline-block">
                {item.days}
              </h3>

              <div className="my-6">
                <span className={`text-4xl font-black italic uppercase ${item.days === 'Domingos' ? 'text-gray-500' : 'text-primary'}`}>
                  {item.hours}
                </span>
              </div>

              <div className="bg-black text-white p-3 rotate-1 inline-block">
                <p className="font-bold text-xs uppercase tracking-widest leading-none">
                  {item.note}
                </p>
              </div>

              {/* Decoración de esquina estilo comic */}
              <div className="absolute bottom-2 right-2 opacity-10 text-4xl font-black uppercase">
                POW!
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje de aclaración */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="relative bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] -rotate-1">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border-l-4 border-b-4 border-black rotate-45 hidden md:block" />
            <p className="font-bold text-lg uppercase tracking-tight text-center leading-tight">
              "Sabemos que tu día es largo, por eso abrimos cuando <HighlightText variant="primary">tú tienes tiempo</HighlightText>. Recibe tus compras frescas al llegar a casa."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
