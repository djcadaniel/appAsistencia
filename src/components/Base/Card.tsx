import type { ReactNode } from "react";

export const Card = ({ title, children, className = '' }: { title?: string, children: ReactNode, className?: string }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-slate-100 ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-4 text-slate-700">{title}</h3>}
    {children}
  </div>
);