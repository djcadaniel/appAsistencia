import { AlertTriangle, Clock, FileText, TrendingUp } from "lucide-react";
import { useDashboard } from "../../context/AppContext";

export const DashboardKPIS = () => {

  const { totalCantidadTarde, totalMemorandums, totalFaltas, totalPermisosPersonales, totalCompensacion, permisoSaludCITT, permisoSalud4Horas, permisoSalud2Horas } = useDashboard();

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2">

        {/* Tarjeta 1: Total de Tardanzas */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Tardanzas</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalCantidadTarde}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Número de veces</p>
        </div>



        {/* Tarjeta 4: Memorándums */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Memorándums</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">{totalMemorandums}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Documentos emitidos</p>
        </div>

        {/* Tarjeta 3: Faltas */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Faltas</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{totalFaltas}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Días no asistidos</p>
        </div>

        {/* Total Permisos Personales */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Permisos Personales</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalPermisosPersonales}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Total acumulado</p>
        </div>

        {/* Total Permisos Salud CITT*/}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Permisos Salud CITT</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{permisoSaludCITT}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Total acumulado</p>
        </div>

        {/* Total Permisos Salud 2 Horas */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Permisos Salud 2 Horas</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{permisoSalud2Horas}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Total acumulado</p>
        </div>

        {/* Total Permisos Salud 4 Horas */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Permisos Salud 4 Horas</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{permisoSalud4Horas}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Total acumulado</p>
        </div>

        {/* Total Compensacion */}
        <div className="bg-white px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Compensación</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">{totalCompensacion}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">Total acumulado</p>
        </div>


      </div>
    </>
  )
}
