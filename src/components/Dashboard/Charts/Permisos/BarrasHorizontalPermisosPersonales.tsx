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
import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";
import { useDashboard } from "../../../../context/AppContext";

export const BarrasHorizontalPermisosPersonales = () => {
  const { filteredData, filters } = useDashboard();

  // ✅ Filtros locales SOLO para este gráfico
  const [localAnio, setLocalAnio] = useState<string>("");
  const [localMes, setLocalMes] = useState<string>("");

  const ordenMeses = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];

  const normalizarMes = (m: string) =>
    m.toUpperCase().replace("SETIEMBRE", "SEPTIEMBRE");

  // =========================
  // ✅ Serie agregada + filtros locales
  // =========================
  const dataPermisos = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return [];

    const mapa: Record<string, { anio: string | number; mes: string; value: number }> = {};

    filteredData.forEach((r: any) => {
      const anio = (r.anio ?? filters.anio)?.toString();
      const mes = normalizarMes((r.mes ?? filters.mes)?.toString() || "");

      // key = año-mes
      const key = `${anio}-${mes}`;

      if (!mapa[key]) {
        mapa[key] = { anio: anio ?? "", mes, value: 0 };
      }

      // ✅ Ajusta a tu campo real (deja solo el correcto)
      mapa[key].value += Number(
        r.permisosPersonales ??
        r.totalPermisosPersonales ??
        r.horasPermisoPersonal ??
        r.totalPermisos ??
        0
      );
    });

    let serie = Object.values(mapa);

    // ✅ Filtro local (recorta output sin tocar data global)
    if (localAnio) {
      serie = serie.filter(s => String(s.anio) === localAnio);
    }
    if (localMes) {
      serie = serie.filter(s => s.mes === normalizarMes(localMes));
    }

    // Orden por año y luego mes
    serie.sort((a, b) => {
      const ya = Number(a.anio);
      const yb = Number(b.anio);
      if (ya !== yb) return ya - yb;

      const ia = ordenMeses.indexOf(a.mes);
      const ib = ordenMeses.indexOf(b.mes);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });

    return serie.map((d) => ({
      name: `${d.mes} ${d.anio}`, // ✅ Eje X
      permisos: d.value,         // ✅ Eje Y
      anio: d.anio,
      mes: d.mes,
    }));
  }, [filteredData, filters.anio, filters.mes, localAnio, localMes]);

  // =========================
  // ✅ Opciones de filtros locales (combo)
  // =========================
  const opcionesAnios = useMemo(() => {
    const set = new Set<string>();
    filteredData.forEach((d: any) => {
      const a = (d.anio ?? filters.anio)?.toString();
      if (a) set.add(a);
    });
    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, [filteredData, filters.anio]);

  const opcionesMeses = useMemo(() => {
    const set = new Set<string>();
    filteredData.forEach((d: any) => {
      const mRaw = (d.mes ?? filters.mes)?.toString();
      if (mRaw) set.add(normalizarMes(mRaw));
    });

    return Array.from(set).sort((a, b) => {
      const ia = ordenMeses.indexOf(a);
      const ib = ordenMeses.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }, [filteredData, filters.mes]);

  // ✅ Handlers locales (no global)
  const onChangeAnio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalAnio(e.target.value);
  };

  const onChangeMes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalMes(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      {/* Header + Control layer local */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Permisos Personales x Año/Mes
        </h2>

        {/* ✅ Filtros SOLO para este chart */}
        <div className="flex flex-wrap gap-2">
          {/* Año */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-slate-600">Año:</label>
            <select
              value={localAnio}
              onChange={onChangeAnio}
              className="border border-slate-200 rounded-lg px-3 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Todos</option>
              {opcionesAnios.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Mes */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-slate-600">Mes:</label>
            <select
              value={localMes}
              onChange={onChangeMes}
              className="border border-slate-200 rounded-lg px-3 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Todos</option>
              {opcionesMeses.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {dataPermisos.length === 0 ? (
        <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
          <p className="text-lg font-medium">No hay datos para mostrar</p>
          <p className="text-sm mt-1">
            Los datos se mostrarán aquí cuando estén disponibles
          </p>
        </div>
      ) : (
        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataPermisos}
              margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
              barCategoryGap={18}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

              {/* ✅ Eje X = Mes/Año */}
              <XAxis
                dataKey="name"
                tick={{ fill: "#64748b" }}
                fontSize={12}
                angle={-20}
                textAnchor="end"
                height={70}
                interval={0}
                label={{
                  value: "MES / AÑO",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontSize: 13, fontWeight: "bold", fill: "#334155" }
                }}
              />

              {/* ✅ Eje Y = permisos */}
              <YAxis
                tick={{ fill: "#64748b" }}
                fontSize={12}
                allowDecimals={false}
                label={{
                  value: "PERMISOS PERSONALES",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 13, fontWeight: "bold", fill: "#334155" }
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)"
                }}
                formatter={(value) => [`${value} permisos`, "Cantidad"]}
              />

              <Bar
                dataKey="permisos"
                fill="#fbcfe8"
                stroke="#f472b6"
                strokeWidth={1}
                radius={[8, 8, 0, 0]}
                maxBarSize={70}
              >
                {/* ✅ valor encima */}
                <LabelList
                  dataKey="permisos"
                  position="top"
                  style={{ fill: "#0f172a", fontWeight: 700, fontSize: 12 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
