import { PastelFaltas } from "../components/Dashboard/Charts/Faltas/PastelFaltas"
import { DashboardFilters } from "../components/Dashboard/DashboardFilters"
import { DashboardKPIS } from "../components/Dashboard/DashboardKPIS"

export const FaltasPage = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 w-full h-auto mt-[60px]">
          
          <DashboardFilters />
          <DashboardKPIS />
            
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PastelFaltas />
          </div>
          
        </div>
  )
}
