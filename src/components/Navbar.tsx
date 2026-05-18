import { Link } from 'react-router-dom';
import { NAVIGATIONS } from '../const/navigations';


export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4 px-[5%] bg-app-bg font-sans sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <Link to="/">
          <span className="text-primary">Yoja</span><span className="text-secondary">Shop</span>
        </Link>
      </div>
      <ul className="list-none hidden md:flex gap-6 m-0 p-0">
        {NAVIGATIONS.map((nav) => (
          <li key={nav.path}>
            <Link to={nav.path} className="no-underline text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary transition-colors">
              {nav.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-6">
        <div className="relative text-xl cursor-pointer text-app-text">
          👜 <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-3.75 h-[15px] flex items-center justify-center rounded-full">0</span>
        </div>
        <Link to="/signin" className="no-underline text-primary font-semibold text-sm hidden sm:block">Iniciar Sesión</Link>
        <Link to="/signup" className="no-underline bg-primary text-white py-2 px-6 rounded-[10px] font-semibold text-sm transition-opacity hover:opacity-90">Registrarse</Link>
      </div>
    </nav>
  );
};