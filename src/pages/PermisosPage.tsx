import { BarrasHorizontalPermisosPersonales } from "../components/Dashboard/Charts/Permisos/BarrasHorizontalPermisosPersonales"
import { BarrasPermisosPersonalesPersona } from "../components/Dashboard/Charts/Permisos/BarrasPermisosPersonalesPersona"
import { Compensacion } from "../components/Dashboard/Charts/Permisos/Compensacion"
import { DashboardFilters } from "../components/Dashboard/DashboardFilters"
import { DashboardKPIS } from "../components/Dashboard/DashboardKPIS"
// import { useDashboard } from "../context/AppContext"

export const PermisosPage = () => {

  // const {filteredData} = useDashboard()

  return (
    <div className="space-y-6 p-6 bg-slate-50 w-full h-auto mt-[60px]">
      
      <DashboardFilters />
      <DashboardKPIS />
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarrasHorizontalPermisosPersonales />
        <BarrasPermisosPersonalesPersona />
        <Compensacion />
      </div>
      
    </div>
  )
}
