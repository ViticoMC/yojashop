;
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { HighlightText } from '@/components/ui/HighlightText';
import { MessageCircle, Phone, Mail, MapPin, Send, Zap } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="min-h-screen bg-app-bg pb-20 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-dots" />

      {/* Header Section */}
      <section className="bg-primary border-b-8 border-black py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(white 3px, transparent 3px)', backgroundSize: '30px 30px' }}></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="inline-block bg-black text-white px-4 py-1 font-black uppercase italic tracking-[0.2em] mb-4 transform -rotate-1 shadow-[4px_4px_0px_rgba(255,255,255,1)]">
            ¡HABLEMOS!
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-none mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            CENTRO DE <span className="text-black drop-shadow-none">COMUNICACIONES</span>
          </h1>
          <p className="max-w-2xl text-xl font-bold uppercase italic text-white leading-tight bg-black/20 p-4 border-2 border-white/20 backdrop-blur-sm">
            ¿Tienes dudas, sugerencias o simplemente quieres saludarnos? Nuestro equipo de soporte está listo para la acción.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Formulario Estilo Comic */}
          <div className="bg-white border-4 border-black p-8 shadow-[16px_16px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full group-hover:scale-150 transition-transform duration-1000" />

            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
              <Send className="text-primary transform -rotate-12" />
              ENVÍA TU MENSAJE
            </h2>

            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="NOMBRE CLAVE" placeholder="EJ: SUPER CLIENTE" />
                <Input label="CORREO ELECTRÓNICO" placeholder="TU@EMAIL.COM" type="email" />
              </div>
              <Input label="ASUNTO" placeholder="¿DE QUÉ SE TRATA?" />
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-black">MENSAJE DETALLADO</label>
                <textarea
                  className="w-full bg-white border-4 border-black p-4 font-bold text-sm min-h-[150px] shadow-[4px_4px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all outline-none"
                  placeholder="ESCRIBE AQUÍ TU CONSULTA..."
                ></textarea>
              </div>

              <Button variant="primary" size="full" className="h-16 text-xl group">
                <span className="flex items-center justify-center gap-3">
                  LANZAR MENSAJE
                  <Zap className="group-hover:animate-bounce" />
                </span>
              </Button>
            </form>
          </div>

          {/* Información de Contacto */}
          <div className="space-y-8">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">
              NUESTROS <HighlightText variant="secondary">CANALES</HighlightText>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                { icon: <MessageCircle className="text-success" size={32} />, label: "WHATSAPP", info: "+598 000 000 000", action: "Enviar WhatsApp", color: "hover:border-success shadow-success/20" },
                { icon: <Phone className="text-primary" size={32} />, label: "TELÉFONO", info: "2 000 0000", action: "Llamar ahora", color: "hover:border-primary shadow-primary/20" },
                { icon: <Mail className="text-secondary" size={32} />, label: "EMAIL", info: "hola@yojashop.com", action: "Redactar email", color: "hover:border-secondary shadow-secondary/20" },
                { icon: <MapPin className="text-black" size={32} />, label: "UBICACIÓN", info: "Maldonado, Uruguay", action: "Ver en mapa", color: "hover:border-black shadow-black/10" }
              ].map((c, i) => (
                <div key={i} className={`bg-white border-4 border-black p-6 flex items-center gap-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all ${c.color}`}>
                  <div className="p-3 bg-gray-100 border-2 border-black rotate-3">
                    {c.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest leading-none mb-1">{c.label}</h3>
                    <p className="text-xl font-black uppercase italic tracking-tight mb-2">{c.info}</p>
                    <button className="text-[10px] font-black uppercase underline hover:text-primary transition-colors italic">
                      {c.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Horarios (Resumen) */}
            <div className="bg-black text-white p-6 border-4 border-primary -rotate-1 shadow-[8px_8px_0px_rgba(239,68,68,1)]">
              <h3 className="text-xl font-black uppercase italic mb-4 flex items-center gap-2">
                <Zap className="text-secondary" size={20} />
                ESTAMOS DESPIERTOS:
              </h3>
              <div className="space-y-2 font-bold uppercase text-xs">
                <p className="flex justify-between"><span>LUNES A VIERNES:</span> <span className="text-secondary">18:00 - 22:00</span></p>
                <p className="flex justify-between"><span>SÁBADOS:</span> <span className="text-secondary">10:00 - 20:00</span></p>
                <p className="flex justify-between text-gray-500"><span>DOMINGOS:</span> <span>RECARGANDO BATERÍAS</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
