import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';

export const Navbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const cartCount = useAppStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <div className="w-full px-[5%] pt-4 sticky top-0 z-40 bg-app-bg/80 backdrop-blur-md">
      <nav className="relative flex justify-between items-center h-16 px-8 bg-nav-bg shadow-md transform -skew-x-6 border-b-4 border-r-4 border-black/10">
        
        {/* Contenido invertido para que el texto no salga inclinado */}
        <div className="flex items-center gap-6 transform skew-x-6">
          <ul className="list-none hidden lg:flex gap-6 m-0 p-0">
            <li><Link to="/" className="no-underline text-gray-800 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Inicio</Link></li>
            <li><Link to="/categories" className="no-underline text-gray-800 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Categorías</Link></li>
            <li><Link to="/sales" className="no-underline text-gray-800 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Ofertas</Link></li>
          </ul>
        </div>

        {/* Logo Centrado */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 skew-x-6">
          <Link to="/" className="text-3xl font-black italic tracking-tighter uppercase flex items-center">
            <span className="text-primary leading-none">Yoja</span>
            <span className="text-gray-800 leading-none">Shop</span>
          </Link>
        </div>

        {/* Lado Derecho */}
        <div className="flex items-center gap-6 transform skew-x-6">
          <ul className="list-none hidden lg:flex gap-6 m-0 p-0 mr-4">
            <li><Link to="/about" className="no-underline text-gray-800 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Nosotros</Link></li>
            <li><Link to="/contact" className="no-underline text-gray-800 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">Contacto</Link></li>
          </ul>
          
          <div className="flex items-center gap-4 border-l-2 border-black/5 pl-4">
            <button 
              onClick={onCartClick}
              className="relative text-xl cursor-pointer text-gray-800 hover:scale-110 transition-transform bg-transparent border-none p-0 group"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="group-hover:text-primary transition-colors"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.56-7.43H5.12" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                {cartCount}
              </span>
            </button>
            <Link to="/signin" className="hidden sm:block">
              <span className="text-gray-800 hover:text-primary transition-colors">👤</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};
