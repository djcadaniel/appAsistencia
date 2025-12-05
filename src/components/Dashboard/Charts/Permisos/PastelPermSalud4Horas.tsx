import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip } from "recharts";
import { Calendar } from "lucide-react";
import { useDashboard } from "../../../../context/AppContext";

export const PastelPermSalud4Horas = () => {
  const { filteredData } = useDashboard();

  const datosPiePermisoSalud4Horas = useMemo(() => {
    if (filteredData.length === 0) return [];

    const salud4HorasPorArea: Record<string, number> = {};

    // Sumar permisoSalud4Horas por área
    filteredData.forEach((r) => {
      salud4HorasPorArea[r.area] = (salud4HorasPorArea[r.area] || 0) + r.permisoSalud4Horas;
    });

    const total = Object.values(salud4HorasPorArea).reduce((s, v) => s + v, 0);

    const colors = [
      "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
      "#8b5cf6", "#06b6d4", "#f97316", "#22c55e"
    ];

    return Object.entries(salud4HorasPorArea)
      .map(([area, value], i) => ({
        name: area,                 // Nombre = Área
        value,
        percentage: total > 0 ? (value / total) * 100 : 0,  // Calcular el porcentaje
        color: colors[i % colors.length], // Color para cada área
      }))
      .sort((a, b) => b.value - a.value);  // Ordenar de mayor a menor
  }, [filteredData]);

  const totalPermisoSalud4Horas = datosPiePermisoSalud4Horas.reduce(
    (s, i) => s + i.value, 0
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-purple-600" />
        % de Permiso Salud 4 Horas por Área
      </h2>

      {datosPiePermisoSalud4Horas.length === 0 ? (
        <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
          <p className="text-lg font-medium">No hay datos para mostrar</p>
          <p className="text-sm mt-1">Los datos se mostrarán aquí cuando estén disponibles</p>
        </div>
      ) : (
        <div className="h-[400px] w-full flex flex-col lg:flex-row items-center lg:items-start gap-6">
          {/* ===== CHART (IZQUIERDA) ===== */}
          <div className="w-full lg:w-2/3 h-[300px] lg:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={datosPiePermisoSalud4Horas}
                  cx="50%"
                  cy="50%"
                  dataKey="value"
                  innerRadius="52%"
                  outerRadius="82%"
                  paddingAngle={2}
                  labelLine={false}
                  label={({ percent }) => {
                    const p = (percent! * 100).toFixed(0);
                    return Number(p) >= 8 ? `${p}%` : "";
                  }}
                  style={{ fontSize: "16px", fontWeight: 600 }}
                >
                  {datosPiePermisoSalud4Horas.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>

                {/* Centro del donut */}
                <g>
                  <circle cx="50%" cy="50%" r="48" fill="#f8fafc" stroke="#e2e8f0" />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill="#475569"
                    fontSize={11}
                    fontWeight={700}
                    dy={-8}
                  >
                    Total
                  </text>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill="#7c3aed"
                    fontSize={20}
                    fontWeight={800}
                    dy={10}
                  >
                    {totalPermisoSalud4Horas.toLocaleString()}
                  </text>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize={10}
                    fontWeight={500}
                    dy={26}
                  >
                    permisos
                  </text>
                </g>

                <PieTooltip
                  formatter={(value) => {
                    const v = Number(value);
                    const perc =
                      totalPermisoSalud4Horas > 0
                        ? ((v / totalPermisoSalud4Horas) * 100).toFixed(1)
                        : "0.0";
                    return `${v} permisos (${perc}%)`;
                  }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "12px",
                    padding: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ===== LEYENDA (DERECHA) ===== */}
          <div className="w-full lg:w-1/3 h-auto lg:h-[400px] overflow-y-auto pr-1">
            <div className="space-y-2">
              {datosPiePermisoSalud4Horas.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate text-sm text-slate-800 font-medium">
                      {item.name}
                    </span>
                  </div>

                  <div className="text-right shrink-0 ml-2">
                    <div className="text-sm font-bold text-slate-900">
                      {item.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">
                      {item.percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
