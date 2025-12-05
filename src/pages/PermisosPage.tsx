// import { useDashboard } from "../context/AppContext";

import { AreaChartTardanzas } from "../components/Dashboard/Charts/AreaChartTardanzas"
import { BarrasChartTardanzas } from "../components/Dashboard/Charts/BarrasChartTardanzas"
import { BarrasVertTardanzas } from "../components/Dashboard/Charts/BarrasVertTardanzas"
import { PastelChartTardanzas } from "../components/Dashboard/Charts/PastelChartTardanzas"
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
        <BarrasChartTardanzas />
        <PastelChartTardanzas />
        <AreaChartTardanzas />
        <BarrasVertTardanzas />
      </div>
      
    </div>
  )
}
