import { MainLayout } from "../layouts/MainLayout";
import { AsistenciaPage } from "../pages/AsistenciaPage";
import { PermisosPage } from "../pages/PermisosPage";

export const ROUTE_PATHS = {
  HOME: '/',
  PERMISOS : '/permisos'
}

export const NAVIGATION_LABELS = {
  HOME: 'Asistencia',
  PERMISOS: 'Permisos y Sobretiempo'
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
  }
]