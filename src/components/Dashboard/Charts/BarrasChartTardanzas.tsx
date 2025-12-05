import { Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';
import { useDashboard } from '../../../context/AppContext';

export const BarrasChartTardanzas = () => {

  const { filteredData} = useDashboard();

  const datosGraficoBarras = useMemo(() => {

    const tardanzasPorArea: Record<string, number> = {};

    filteredData.forEach(registro => {
      const area = registro.area;

      if (tardanzasPorArea[area]) {
        tardanzasPorArea[area] += registro.totalTarde;
      } else {
        tardanzasPorArea[area] = registro.totalTarde;
      }
    });

    return Object.keys(tardanzasPorArea).map(area => ({
      name: area,
      tardanzas: tardanzasPorArea[area]
    }));
  }, [filteredData]);

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Tardanzas por Área
        </h2>

        {datosGraficoBarras.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-slate-400">
            <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg font-medium">No hay datos para mostrar</p>
            <p className="text-sm mt-1">Los datos se mostrarán aquí cuando estén disponibles</p>
          </div>
        ) : (
          <div className="h-[400px] w-full flex items-center justify-center">
            <BarChart
              width={800}
              height={450}
              data={datosGraficoBarras}
              margin={{ top: 50, right: 10, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                fontSize={12}
                tick={{ fill: '#64748b' }}
                angle={-45}
                textAnchor="end"
                height={60}
                label={{
                  value: 'ÁREA',
                  position: 'insideBottom',
                  offset: -5,
                  style: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#334155'
                  }
                }}
              />
              <YAxis
                fontSize={12}
                tick={{ fill: '#64748b' }}
                label={{
                  value: 'TARDANZAS',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 15,
                  style: {
                    fontSize: 14,
                    fontWeight: 'bold',
                    fill: '#334155'
                  }
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} tardanzas`, 'Cantidad']}
              />
              <Bar
                dataKey="tardanzas"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="tardanzas"
                  position="top"
                  fill="#334155"
                  fontSize={11}
                  fontWeight="bold"
                  offset={10}
                />
              </Bar>
            </BarChart>
          </div>
        )}
      </div>
    </>
  )
}
