import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, ShieldCheck, Box, Trophy, Package } from 'lucide-react';

export const Administracion = () => {
    const location = useLocation();
    
    const tabs = [
        { id: 'stats', label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/administracion' },
        { id: 'users', label: 'Clientes', icon: <Users size={18} />, path: '/administracion/users' },
        { id: 'products', label: 'Productos', icon: <Package size={18} />, path: '/administracion/products' },
        { id: 'combos', label: 'Combos', icon: <Box size={18} />, path: '/administracion/combos' },
        { id: 'pedidos', label: 'Pedidos', icon: <ShoppingBag size={18} />, path: '/administracion/pedidos' },
        { id: 'logros', label: 'Logros', icon: <Trophy size={18} />, path: '/administracion/logros' },
    ];

    return (
        <div className="min-h-screen bg-app-bg bg-dots py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Cabecera Admin */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative">
                        <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                            CENTRO DE <span className="text-primary">ADMINISTRACIÓN</span>
                        </h1>
                        <div className="h-3 w-32 bg-secondary border-2 border-black -rotate-2 mt-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
                    </div>

                    <div className="bg-black text-white p-3 border-4 border-black rotate-2 shadow-[4px_4px_0px_rgba(239,68,68,1)] hidden md:flex items-center gap-2">
                        <ShieldCheck size={16} className="text-primary" />
                        <p className="text-xs font-black uppercase tracking-widest italic">Sesión de Administrador</p>
                    </div>
                </header>

                {/* Tabs de Navegación */}
                <div className="flex flex-wrap gap-4 border-b-4 border-black pb-4">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path;
                        return (
                            <Link
                                key={tab.id}
                                to={tab.path}
                                className={`
                    px-6 py-3 font-black uppercase italic text-sm tracking-tighter transition-all flex items-center gap-2 border-4 border-black
                    ${isActive
                                        ? 'bg-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1'
                                        : 'bg-white hover:bg-gray-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    }
                  `}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Contenido Dinámico */}
                <div className="py-6">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default Administracion;
