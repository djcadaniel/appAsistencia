import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import { useDashboard } from '../../../context/AppContext';
import { TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';

export const AreaChartTardanzas = () => {

  const { filteredData, filters } = useDashboard();

  // ✅ Filtros locales SOLO para este gráfico
  const [localAnio, setLocalAnio] = useState<string>("");
  const [localMes, setLocalMes] = useState<string>("");

  // ✅ Filtros efectivos: si hay local, manda local; si no, cae al global
  const filtrosEfectivos = {
    anio: localAnio || filters.anio,
    mes: localMes || filters.mes,
  };

  const datosAreaTardanzasTiempo = useMemo(() => {
    if (filteredData.length === 0) return [];

    const ordenMeses = [
      "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
      "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    const mapa: Record<string, { anio: string | number; mes: string; value: number }> = {};

    filteredData.forEach((r) => {
      const anio = r.anio ?? filtrosEfectivos.anio;
      const mes = (r.mes ?? filtrosEfectivos.mes)?.toString().toUpperCase();

      const key = `${anio}-${mes}`;

      if (!mapa[key]) {
        mapa[key] = { anio, mes, value: 0 };
      }
      mapa[key].value += r.totalTarde;
    });

    // 👇 Serie agregada completa
    let serie = Object.values(mapa);

    // ✅ NUEVO: filtro local (no altera tu agregación, solo recorta output)
    if (localAnio) {
      serie = serie.filter(s => String(s.anio) === localAnio);
    }
    if (localMes) {
      serie = serie.filter(s => s.mes === localMes.toUpperCase());
    }

    // Orden por año y luego por mes
    serie.sort((a, b) => {
      const ya = Number(a.anio);
      const yb = Number(b.anio);
      if (ya !== yb) return ya - yb;

      return ordenMeses.indexOf(a.mes) - ordenMeses.indexOf(b.mes);
    });

    return serie.map((d) => ({
      name: `${d.mes} ${d.anio}`,
      tardanzas: d.value,
      anio: d.anio,
      mes: d.mes
    }));
  }, [
    filteredData,
    filtrosEfectivos.anio,
    filtrosEfectivos.mes,
    localAnio,
    localMes
  ]);


  // =========================
  // ✅ Opciones dinámicas de filtros (LOCAL)
  // =========================
  const opcionesAnios = useMemo(() => {
    const set = new Set<string>();
    filteredData.forEach(d => {
      const a = (d.anio ?? filters.anio)?.toString();
      if (a) set.add(a);
    });
    return Array.from(set).sort((a, b) => Number(a) - Number(b));
  }, [filteredData, filters.anio]);

  const opcionesMeses = useMemo(() => {
    const ordenMeses = [
      "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
      "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
    ];

    const normalizarMes = (m: string) =>
    m.toUpperCase().replace("SETIEMBRE", "SEPTIEMBRE"); // ✅ alias

  const set = new Set<string>();
  filteredData.forEach(d => {
    const mRaw = (d.mes ?? filters.mes)?.toString().toUpperCase();
    if (mRaw) set.add(normalizarMes(mRaw));
  });

    return Array.from(set).sort(
      (a, b) => ordenMeses.indexOf(a) - ordenMeses.indexOf(b)
    );
  }, [filteredData, filters.mes]);


  // ✅ Handlers locales
  const onChangeAnio = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalAnio(e.target.value);
  };

  const onChangeMes = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalMes(e.target.value);
  };


  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Tardanzas por Mes y Año
          </h2>

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


        {datosAreaTardanzasTiempo.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
            <p className="text-lg font-medium">No hay datos para mostrar</p>
            <p className="text-sm mt-1">Los datos se mostrarán aquí cuando estén disponibles</p>
          </div>
        ) : (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={datosAreaTardanzasTiempo}
                margin={{ top: 20, right: 20, left: 0, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

                <XAxis
                  dataKey="name"
                  tick={{ fill: "#64748b" }}
                  fontSize={12}
                  angle={-25}
                  textAnchor="end"
                  height={60}
                  label={{
                    value: "MES / AÑO",
                    position: "insideBottom",
                    offset: -10,
                    style: { fontSize: 13, fontWeight: "bold", fill: "#334155" }
                  }}
                />

                <YAxis
                  tick={{ fill: "#64748b" }}
                  fontSize={12}
                  label={{
                    value: "TARDANZAS",
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
                  formatter={(value) => [`${value} tardanzas`, "Cantidad"]}
                />

                <Area
                  type="monotone"
                  dataKey="tardanzas"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.2}
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
};
