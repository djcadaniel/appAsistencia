import logo from '/logo.png'
import foto from '/diana.png'
import { 
  LayoutDashboard, 
  LogOut, 
  Menu,  
  Users, 
  X,
  ChevronRight,
  Bell,
  Search,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavItem {
  to: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  isNew?: boolean;
}

const navItems: NavItem[] = [
  { to: '/', icon: LayoutDashboard, label: 'Tardanzas', badge: 3 },
  { to: '/permisos', icon: Users, label: 'Permisos Personales y Sobretiempo', badge: 12 },
  // { to: '/reportes', icon: BarChart3, label: 'Reportes', isNew: true },
  // { to: '/calendario', icon: Calendar, label: 'Calendario' },
  // { to: '/documentos', icon: FileText, label: 'Documentos' },
  // { to: '/configuracion', icon: Settings, label: 'Configuración' },
  // { to: '/seguridad', icon: Shield, label: 'Seguridad' }
];

export const Navbar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar para móvil */}
      <div className="3xl:hidden fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-slate-900 to-slate-800 px-4 flex items-center justify-between shadow-lg border-b border-slate-700 h-[70px]">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {isMobileOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-linear">
                Asistencia de Personal
              </h2>
              <p className="text-sm text-slate-400">Inel Institute of Technology</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <Search className="w-5 h-5 text-slate-300" />
          </button>
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors relative">
            <Bell className="w-5 h-5 text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </button>
          <figure className='ml-5'>
            <img src={logo} alt="" className='w-[70px]'/>
          </figure>
        </div>
      </div>

      {/* Search Bar overlay para móvil */}
      {isSearchOpen && (
        <div className="3xl:hidden fixed top-16 left-0 right-0 z-50 bg-slate-900 px-4 py-3 shadow-lg border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar en el dashboard..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Overlay para móvil */}
      {isMobileOpen && (
        <div
          className="3xl:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed 3xl:sticky top-16 left-0 z-40
          w-72 bg-linear-to-b from-slate-900 to-slate-950 text-white 
          transform transition-all duration-300 ease-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full w-3xl:translate-x-0'}
          flex flex-col h-screen shadow-2xl border-r border-slate-800
          overflow-hidden
        `}
      >

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <div className="mb-6 px-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Navegación Principal
            </h3>
          </div>
          
          <div className="space-y-1 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    group relative flex items-center justify-between px-4 py-3
                    transition-all duration-200 rounded-xl
                    ${
                      active
                        ? 'bg-linear-to-r from-blue-500/20 to-cyan-500/10 text-blue-300 border-l-4 border-blue-500'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white hover:translate-x-1'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center mr-3
                      ${active 
                        ? 'bg-linear-to-br from-blue-500 to-cyan-500 text-white' 
                        : 'bg-slate-800/50 group-hover:bg-slate-700/50'
                      }
                    `}>
                      <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.isNew && (
                      <span className="ml-2 px-2 py-0.5 bg-linear-to-r from-green-500 to-emerald-500 text-xs font-semibold rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className={`
                        px-2 py-1 text-xs font-bold rounded-full min-w-6 text-center
                        ${active 
                          ? 'bg-white text-blue-600' 
                          : 'bg-blue-500/20 text-blue-300'
                        }
                      `}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`
                      w-4 h-4 transition-transform duration-200
                      ${active ? 'text-blue-400 rotate-90' : 'text-slate-500 group-hover:text-slate-300 group-hover:translate-x-1'}
                    `} />
                  </div>
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Separator */}
          <div className="my-8 px-3">
            <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent"></div>
          </div>

          {/* Quick Actions */}
          <div className="px-3 mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Acciones Rápidas
            </h3>
          </div>
          
          <div className="grid grid-cols-2 gap-2 px-2">
            <button className="flex flex-col items-center justify-center p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-white">Ayuda</span>
            </button>
            
            <button className="flex flex-col items-center justify-center p-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-xl transition-colors group">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-white">Docs</span>
            </button>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                  <img src={foto} alt="" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-white">Diana Sánchez</h4>
                <p className="text-xs text-slate-400">Asistente GTH</p>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors group relative">
              <Bell className="w-5 h-5 text-slate-400 group-hover:text-white" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                3
              </span>
            </button>
          </div>
          
          <button 
            onClick={() => {/* Lógica de logout */}}
            className="w-full flex items-center justify-center px-4 py-3 bg-linear-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-slate-300 hover:text-white rounded-xl transition-all duration-200 group border border-slate-700 hover:border-slate-600"
          >
            <LogOut className="w-5 h-5 mr-3 group-hover:rotate-180 transition-transform duration-300" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              v2.5.1 • © 2024 Dashboard Pro
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}