;
import { HighlightText } from '@/components/ui/HighlightText';
import { ShoppingBag, Truck, ShieldCheck, Clock } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-app-bg pb-20 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-dots" />

      {/* Hero Section */}
      <section className="bg-secondary border-b-8 border-black py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '24px 24px' }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-block bg-black text-white px-6 py-2 font-black uppercase italic tracking-widest mb-6 transform -rotate-2 shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            CONOCE NUESTRA HISTORIA
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-black uppercase italic tracking-tighter leading-none mb-6 transform rotate-1">
            SOMOS <span className="text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">YOJASHOP</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl font-bold uppercase italic text-black leading-tight bg-white/30 p-4 border-2 border-black/10 backdrop-blur-sm">
            Tu aliado estratégico para llenar la heladera con productos frescos, sin perder tiempo y con la mejor onda del mercado.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-24">

        {/* Nuestra Misión */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-primary transform -rotate-3 rounded-xl shadow-[8px_8px_0px_rgba(0,0,0,1)]"></div>
            <img
              src="https://img.freepik.com/free-photo/courier-holding-paper-bag-with-food-vegetables-home_23-2148505545.jpg"
              alt="Misión YojaShop"
              className="relative z-10 w-full h-auto border-4 border-black rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">
              NUESTRA <span className="text-primary underline decoration-8">MISIÓN</span>
            </h2>
            <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_rgba(0,0,0,1)] -rotate-1">
              <p className="text-lg font-bold uppercase italic leading-relaxed text-gray-800">
                NACIMOS EN EL CORAZÓN DE <HighlightText variant="secondary">MALDONADO</HighlightText> CON UN OBJETIVO CLARO: REVOLUCIONAR LA FORMA EN QUE COMPRAS TUS VÍVERES.
                <br /><br />
                SABEMOS QUE TU TIEMPO VALE ORO. POR ESO, NOS ESPECIALIZAMOS EN LLEVARTE LA MEJOR CALIDAD JUSTO CUANDO TERMINAS TU JORNADA LABORAL. ¡PORQUE MERECES LLEGAR A CASA Y TENER TODO LISTO PARA DISFRUTAR!
              </p>
            </div>
          </div>
        </div>

        {/* Valores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <ShoppingBag size={40} />, title: "CALIDAD TOTAL", desc: "Seleccionamos cada producto como si fuera para nuestra propia mesa." },
            { icon: <Truck size={40} />, title: "ENTREGA RÁPIDA", desc: "Llegamos a todo el departamento con una logística de superhéroes." },
            { icon: <ShieldCheck size={40} />, title: "CONFIANZA", desc: "Pago contra entrega para tu total tranquilidad y seguridad." },
            { icon: <Clock size={40} />, title: "HORARIO ÚNICO", desc: "Abrimos cuando otros cierran, pensamos en el trabajador." }
          ].map((v, i) => (
            <div key={i} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group overflow-hidden">
              <div className="text-primary mb-4 group-hover:scale-125 transition-transform duration-300 transform rotate-12 inline-block">
                {v.icon}
              </div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2">{v.title}</h3>
              <p className="text-xs font-bold uppercase italic text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* El Equipo (Placeholder) */}
        <div className="bg-black text-white p-12 border-4 border-black shadow-[20px_20px_0px_rgba(239,68,68,1)] rotate-1 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 -mr-32 -mt-32 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
              EL EQUIPO <span className="text-secondary">DETRÁS</span> DE LA MAGIA
            </h2>
            <p className="max-w-2xl text-lg font-bold uppercase italic">
              SOMOS UN GRUPO DE VECINOS APASIONADOS POR EL SERVICIO Y LA CALIDAD. TRABAJAMOS INCANSABLEMENTE PARA QUE YOJASHOP SEA TU OPCIÓN NÚMERO 1 EN TODO URUGUAY.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
