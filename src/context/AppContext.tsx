import { createContext, useContext, useState, type ReactNode } from 'react';
import rawData from '../data/data_asistencia.json';
import type { AsistenciaRecord, FilterState } from '../types';

interface AppContextType {
  data: AsistenciaRecord[];
  filteredData: AsistenciaRecord[];
  filters: FilterState;
  setFilter: (key: keyof FilterState, value: string) => void;
  resetFilters: () => void;
  uniqueValues: {
    areas: string[];
    anios: string[];
    meses: string[];
    usuarios: string[];
  };
  totalCantidadTarde: number;
  totalMemorandums: number;
  totalFaltas: number;
  totalPermisosPersonales: number;
  totalCompensacion: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_FILTERS: FilterState = {
  area: 'Todas',
  anio: 'Todos',
  mes: 'Todos',
  usuario: 'Todos'
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  
  const data = rawData as AsistenciaRecord[];

  const areasUnicas = ['Todas', ...new Set(data.map(registro => registro.area))];
  const aniosUnicos = ['Todos', ...new Set(data.map(registro => registro.anio.toString()))];
  const mesesUnicos = ['Todos', ...new Set(data.map(registro => registro.mes))];
  const usuariosUnicos = ['Todos', ...new Set(data.map(registro => registro.usuario))];

  const filteredData = data.filter(registro => {

    const cumpleArea = filters.area === 'Todas' || registro.area === filters.area;
    const cumpleMes = filters.mes === 'Todos' || registro.mes === filters.mes;
    const cumpleAnio = filters.anio === 'Todos' || registro.anio.toString() === filters.anio;
    const cumpleUsuario = filters.usuario === 'Todos' || registro.usuario === filters.usuario;
    
    return cumpleArea && cumpleMes && cumpleAnio && cumpleUsuario;
  });

  const setFilter = (key: keyof FilterState, value: string) => {
    const filtrosNuevos = {...filters};
    filtrosNuevos[key] = value
    setFilters(filtrosNuevos)
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const totalCantidadTarde = filteredData.reduce((suma, registro) => {
    return suma + registro.totalTarde;
  }, 0);

  const totalMemorandums = filteredData.reduce((suma, registro) => {
    return suma + registro.memorandums;
  }, 0);

  const totalFaltas = filteredData.reduce((suma, registro) => {
    return suma + registro.faltas;
  }, 0);

  const totalPermisosPersonales = filteredData.reduce((suma, registro) => {
    return suma + registro.permisosPersonales;
  }, 0)

  const totalCompensacion = filteredData.reduce((suma, registro) => {
    return suma + registro.compensacion;
  }, 0)

  

  const value: AppContextType = {
    data,
    filteredData,
    filters,
    setFilter,
    resetFilters,
    uniqueValues: {
      areas: areasUnicas,
      anios: aniosUnicos,
      meses: mesesUnicos,
      usuarios: usuariosUnicos
    },
    totalCantidadTarde,
    totalMemorandums,
    totalFaltas,
    totalPermisosPersonales,
    totalCompensacion
  };

  // Proveer los datos a todos los componentes hijos
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useDashboard debe usarse dentro de DashboardProvider");
  }
  return context;
};