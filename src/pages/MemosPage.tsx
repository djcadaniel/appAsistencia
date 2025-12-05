import { DashboardKPIS } from '../components/Dashboard/DashboardKPIS'
import { DashboardFilters } from '../components/Dashboard/DashboardFilters'
import { PastelMemo } from '../components/Dashboard/Charts/Memos/PastelMemo'

export const MemosPage = () => {
  return (
    <div className="space-y-6 p-6 bg-slate-50 w-full h-auto mt-[60px]">

      <DashboardFilters />
      <DashboardKPIS />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PastelMemo />
      </div>

    </div>
  )
}
