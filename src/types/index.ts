import type { ComponentType, ReactNode } from "react";

export interface AsistenciaRecord {
  id: number;
  usuario: string;
  area: string;
  anio: number;
  mes: string;
  tardeIngreso: number;
  tardeRetorno: number;
  totalTarde: number;
  memorandums: number;
  faltas: number;
  permisosPersonales: number;
  permisoSaludCITT: number;
  permisoSalud4Horas: number;
  permisoSalud2Horas: number;
  compensacion: number;
}

export interface FilterState {
  area: string;
  anio: string;
  mes: string;
  usuario: string;
}

export interface RouteConfig {
  path: string;
  component: ComponentType;
  layout: ComponentType<{children: ReactNode}>;
}