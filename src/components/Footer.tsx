import { Link } from 'react-router-dom';
import { MessageCircle, Zap } from 'lucide-react';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 overflow-hidden relative border-t-8 border-primary">
      {/* Background Dots */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="text-4xl font-black italic tracking-tighter uppercase flex items-center group">
              <span className="text-primary leading-none group-hover:scale-110 transition-transform">Yoja</span>
              <span className="text-white leading-none">Shop</span>
            </Link>
            <p className="text-sm font-bold uppercase italic leading-tight text-gray-400">
              Llevamos la frescura del mercado directamente a tu baticueva. Calidad, rapidez y la mejor onda de Maldonado.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <FaInstagram size={20} />, link: "#" },
                { icon: <FaFacebook size={20} />, link: "#" },
                { icon: <FaTwitter size={20} />, link: "#" }
              ].map((s, i) => (
                <a key={i} href={s.link} className="p-2 border-2 border-white hover:bg-primary hover:border-black hover:text-black transition-all transform hover:-rotate-12">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase italic tracking-widest text-secondary">Navegación</h3>
            <ul className="space-y-4 font-bold uppercase italic text-sm">
              <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
              <li><Link to="/productos" className="hover:text-primary transition-colors">Productos</Link></li>
              <li><Link to="/combos" className="hover:text-primary transition-colors">Combos</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Legal / More */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase italic tracking-widest text-primary">Ayuda</h3>
            <ul className="space-y-4 font-bold uppercase italic text-sm text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Términos y Condiciones</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Políticas de Privacidad</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Zonas de Envío</Link></li>
            </ul>
          </div>

          {/* Contact / Action */}
          <div className="space-y-6">
            <h3 className="text-xl font-black uppercase italic tracking-widest text-white">¿Necesitas ayuda?</h3>
            <div className="bg-white text-black p-4 rotate-2 border-4 border-primary shadow-[6px_6px_0px_rgba(239,68,68,1)]">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2">WHATSAPP DIRECTO</p>
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle size={24} className="text-success" />
                <span className="font-black text-lg">+598 000 000 000</span>
              </div>
              <button className="w-full bg-black text-white font-black py-2 text-xs uppercase italic tracking-widest hover:bg-primary hover:text-black transition-colors">
                CHATEAR AHORA
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t-2 border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            © 2026 YOJASHOP - TODOS LOS DERECHOS RESERVADOS. CREADO CON <Zap size={10} className="inline text-primary" /> EN MALDONADO.
          </p>
          {/* <div className="flex gap-4 grayscale opacity-50">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
          </div> */}
        </div>
      </div>
    </footer>
  );
};
