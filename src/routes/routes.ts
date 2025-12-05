import { MainLayout } from "../layouts/MainLayout";
import { AsistenciaPage } from "../pages/AsistenciaPage";
import { CompensacionPage } from "../pages/CompensacionPage";
import { FaltasPage } from "../pages/FaltasPage";
import { MemosPage } from "../pages/MemosPage";
import { PermisosPage } from "../pages/PermisosPage";

export const ROUTE_PATHS = {
  HOME: '/',
  PERMISOS : '/permisos',
  MEMOS : '/memos',
  FALTAS : '/faltas',
  COMPENSACION : '/compensacion',
}

export const NAVIGATION_LABELS = {
  HOME: 'Asistencia',
  PERMISOS: 'Permisos y Sobretiempo',
  MEMOS: 'Memos',
  FALTAS: 'Faltas',
  COMPENSACION: 'Comopensacion',
}

export const routes = [
  {
    path: ROUTE_PATHS.HOME,
    layout: MainLayout,
    component: AsistenciaPage,
    name: NAVIGATION_LABELS.HOME
  },
  {
    path: ROUTE_PATHS.PERMISOS,
    layout: MainLayout,
    component: PermisosPage,
    name: NAVIGATION_LABELS.PERMISOS
  },
  {
    path: ROUTE_PATHS.MEMOS,
    layout: MainLayout,
    component: MemosPage,
    name: NAVIGATION_LABELS.PERMISOS
  },
  {
    path: ROUTE_PATHS.FALTAS,
    layout: MainLayout,
    component: FaltasPage,
    name: NAVIGATION_LABELS.PERMISOS
  },
  {
    path: ROUTE_PATHS.COMPENSACION,
    layout: MainLayout,
    component: CompensacionPage,
    name: NAVIGATION_LABELS.PERMISOS
  },
]