import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/useAppStore';
import { AuthButtons } from '@/components/auth/AuthButtons';

export const Navbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useAppStore((state) => state.cart.reduce((acc, item) => acc + item.quantity, 0));

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Categorías', path: '/categories' },
    { name: 'Ofertas', path: '/sales' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <div className="w-full px-[2%] md:px-[5%] pt-4 sticky top-0 z-40 bg-app-bg/80 backdrop-blur-md">
      <nav className="relative flex justify-between items-center h-16 px-4 md:px-8 bg-nav-bg shadow-md md:-skew-x-6 border-b-4 border-r-4 border-black/10">

        {/* LADO IZQUIERDO: Menú Mobile + Logo */}
        <div className="flex items-center gap-2 md:gap-4 md:skew-x-6">
          {/* Botón Menú Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 bg-black text-white border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase flex items-center">
            <span className="text-primary leading-none">Yoja</span>
            <span className="text-gray-800 leading-none">Shop</span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="list-none hidden lg:flex gap-6 m-0 p-0 ml-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="no-underline text-gray-800 text-xs font-black uppercase tracking-widest hover:text-primary transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LADO DERECHO: Carrito + Auth */}
        <div className="flex items-center gap-3 md:gap-6 md:skew-x-6">
          {/* Carrito */}
          <button
            onClick={onCartClick}
            className="relative text-xl cursor-pointer text-gray-800 hover:scale-110 transition-transform bg-transparent border-none p-0 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
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
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white shadow-[1px_1px_0px_rgba(0,0,0,1)]">
              {cartCount}
            </span>
          </button>

          {/* Botones Auth Desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-x-4 border-b-4 border-black shadow-[0_10px_0_rgba(0,0,0,0.1)] lg:hidden overflow-hidden md:skew-x-0">
            <ul className="flex flex-col p-4 gap-4 list-none m-0">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block p-3 font-black uppercase text-sm border-2 border-transparent hover:border-black hover:bg-yellow-50 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t-2 border-black/5 flex flex-col gap-2">
                <AuthButtons isMobile onCloseMobile={() => setIsMenuOpen(false)} />
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};
