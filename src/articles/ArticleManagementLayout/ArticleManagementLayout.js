import { NavLink, Navigate, Outlet } from 'react-router';

export function ArticleManagementIndex() {
  return <Navigate to="inventario-articulos" replace />;
}

export function ArticleManagementLayout() {
  return (
    <>
      <nav aria-label="Gestión de artículos">
        <NavLink to="agregar-articulo">Agregar artículo</NavLink>
        <NavLink to="inventario-articulos">Inventario de artículos</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
