import type { ReactNode } from "react";

interface StatProps {
  title: string;
  value: number;
  icon: ReactNode;
  colorClass: string; // ej: 'text-blue-600'
}

export const StatCard = ({ title, value, icon, colorClass }: StatProps) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
    <div className={`${colorClass} bg-slate-50 p-3 rounded-lg`}>
      {icon}
    </div>
  </div>
);