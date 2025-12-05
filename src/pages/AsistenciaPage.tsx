import { useMemo } from 'react';

import { Users } from 'lucide-react';
import { DashboardProvider, useDashboard } from '../context/AppContext';

import { AreaChartTardanzas } from '../components/Dashboard/Charts/AreaChartTardanzas';
import { PastelChartTardanzas } from '../components/Dashboard/Charts/PastelChartTardanzas';
import { BarrasChartTardanzas } from '../components/Dashboard/Charts/BarrasChartTardanzas';
import { BarrasVertTardanzas } from '../components/Dashboard/Charts/BarrasVertTardanzas';
import { DashboardFilters } from '../components/Dashboard/DashboardFilters';
import { DashboardKPIS } from '../components/Dashboard/DashboardKPIS';


const DashboardContent = () => {
  
  const { filteredData } = useDashboard();

  const top5Empleados = useMemo(() => {
    return [...filteredData]
      .sort((a, b) => b.totalTarde - a.totalTarde)
      .slice(0, 5);
  }, [filteredData]);

  return (
    <div className="space-y-6 p-6 bg-slate-50 w-full h-auto mt-[60px]">

      <DashboardFilters />
      <DashboardKPIS />
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarrasChartTardanzas />
        <PastelChartTardanzas />
        <AreaChartTardanzas />
        <BarrasVertTardanzas />
      </div>

      {/* ===== SECCIÓN 4: TOP 5 EMPLEADOS CON MÁS TARDANZAS ===== */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          Top 5 Empleados con Más Tardanzas
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Empleado</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Área</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Tardanzas</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Minutos Tarde</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Faltas</th>
              </tr>
            </thead>
            <tbody>
              {top5Empleados.map((empleado, index) => (
                <tr
                  key={empleado.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-medium text-slate-800">{empleado.usuario}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{empleado.area}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {empleado.totalTarde}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-700 font-medium">
                    {empleado.totalTarde} min
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${empleado.faltas > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}>
                      {empleado.faltas}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// La página exportada envuelve todo en el Provider
export const AsistenciaPage = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};