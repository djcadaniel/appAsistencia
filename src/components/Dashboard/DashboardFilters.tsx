import { Clock, Filter, LayoutDashboard, FileText, UserX, CalendarClock } from "lucide-react";
import { useDashboard } from "../../context/AppContext";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const DashboardFilters = () => {
  const { filters, setFilter, uniqueValues } = useDashboard();
  const location = useLocation();

  // ✅ Configuración por ruta
  const headerConfig = {
    "/": {
      title: "Dashboard de Tardanzas",
      subtitle: "Monitoreo de tardanzas",
      icon: LayoutDashboard,
    },
    "/permisos": {
      title: "Dashboard de Permisos",
      subtitle: "Monitoreo de Permisos Personales",
      icon: Clock,
    },
    "/memos": {
      title: "Dashboard de Memorándums",
      subtitle: "Monitoreo de Memorándums",
      icon: FileText,
    },
    "/faltas": {
      title: "Dashboard de Faltas",
      subtitle: "Monitoreo de Faltas",
      icon: UserX,
    },
    "/compensacion": {
      title: "Dashboard de Compensaciones",
      subtitle: "Monitoreo de Compensaciones",
      icon: CalendarClock,
    },
  } as const;

  // ✅ Header dinámico con fallback
  const currentHeader = useMemo(() => {
    return (
      headerConfig[location.pathname as keyof typeof headerConfig] ?? {
        title: "Control de Asistencia",
        subtitle: "Monitoreo general del personal",
        icon: Clock,
      }
    );
  }, [location.pathname]);

  const HeaderIcon = currentHeader.icon;

  return (
    <div className="bg-white px-6 py-2 rounded-xl shadow-md fixed top-[70px] w-[95%] z-30">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

        {/* ✅ Título dinámico */}
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-3">
            <HeaderIcon className="w-8 h-8 text-blue-600" />
            {currentHeader.title}
          </h1>
          <p className="text-slate-500 mt-1 text-md">
            {currentHeader.subtitle}
          </p>
        </div>

        {/* Filtros (sin cambios) */}
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="w-5 h-5 text-slate-400" />

          <div className="flex flex-col items-center text-slate-700">
            <h3>Año</h3>
            <select
              value={filters.anio}
              onChange={(e) => setFilter("anio", e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueValues.anios.map((anio) => (
                <option key={anio} value={anio}>{anio}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center text-slate-700">
            <h3>Mes</h3>
            <select
              value={filters.mes}
              onChange={(e) => setFilter("mes", e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueValues.meses.map((mes) => (
                <option key={mes} value={mes}>{mes}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center text-slate-700">
            <h3>Área</h3>
            <select
              value={filters.area}
              onChange={(e) => setFilter("area", e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueValues.areas.map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col items-center text-slate-700">
            <h3>Usuario</h3>
            <select
              value={filters.usuario}
              onChange={(e) => setFilter("usuario", e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniqueValues.usuarios.map((usuario) => (
                <option key={usuario} value={usuario}>{usuario}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
