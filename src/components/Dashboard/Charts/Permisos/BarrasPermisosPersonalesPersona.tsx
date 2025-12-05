import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import { useDashboard } from "../../../../context/AppContext";

export const BarrasPermisosPersonalesPersona = () => {
  const { filteredData, filters } = useDashboard();

  const dataPermisosPorPersona = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    const mapa: Record<string, number> = {};

    filteredData.forEach((r: any) => {
      const usuario = (r.usuario ?? r.user ?? r.nombre ?? "SIN USUARIO")
        .toString()
        .trim();

      if (!mapa[usuario]) mapa[usuario] = 0;

      // ✅ Ajusta a tu campo real (deja solo el correcto)
      mapa[usuario] += Number(
        r.permisosPersonales ??
        r.totalPermisosPersonales ??
        r.horasPermisoPersonal ??
        r.totalPermisos ??
        0
      );
    });

    return Object.entries(mapa)
      .map(([usuario, permisos]) => ({ usuario, permisos }))
      .sort((a, b) => b.permisos - a.permisos);
  }, [filteredData, filters.anio, filters.mes]);

  // ✅ Altura dinámica + scroll si hay muchos usuarios
  const ROW_HEIGHT = 32;
  const chartHeight = Math.max(420, dataPermisosPorPersona.length * ROW_HEIGHT);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        Permisos Personales por Usuario
      </h2>

      {dataPermisosPorPersona.length === 0 ? (
        <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
          <p className="text-lg font-medium">No hay datos para mostrar</p>
          <p className="text-sm mt-1">
            Los datos se mostrarán aquí cuando estén disponibles
          </p>
        </div>
      ) : (
        <div className="h-[420px] w-full overflow-y-auto pr-2">
          <div style={{ height: chartHeight }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataPermisosPorPersona}
                layout="vertical" // ✅ clave: barras horizontales
                margin={{ top: 10, right: 30, left: 80, bottom: 20 }}
                barCategoryGap={10}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                {/* ✅ Eje X = cantidad de permisos */}
                <XAxis
                  type="number"
                  tick={{ fill: "#64748b" }}
                  fontSize={12}
                  allowDecimals={false}
                  label={{
                    value: "CANTIDAD DE PERMISOS PERSONALES",
                    position: "insideBottom",
                    offset: -5,
                    style: {
                      fontSize: 13,
                      fontWeight: "bold",
                      fill: "#334155",
                    },
                  }}
                />

                {/* ✅ Eje Y = usuarios */}
                <YAxis
                  type="category"
                  dataKey="usuario"
                  tick={{ fill: "#64748b" }}
                  fontSize={12}
                  width={150}
                  label={{
                    value: "USUARIO",
                    angle: -90,
                    position: "insideLeft",
                    style: {
                      fontSize: 13,
                      fontWeight: "bold",
                      fill: "#334155",
                    },
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value} permisos`, "Cantidad"]}
                />

                <Bar
                  dataKey="permisos"
                  fill="#93c5fd"     // azul suave
                  stroke="#3b82f6"   // azul fuerte
                  strokeWidth={1}
                  radius={[0, 8, 8, 0]}
                  maxBarSize={28}
                >
                  <LabelList
                    dataKey="permisos"
                    position="right"
                    style={{ fill: "#0f172a", fontWeight: 700, fontSize: 12 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
