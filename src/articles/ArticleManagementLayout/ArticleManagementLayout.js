import { NavLink, Navigate, Outlet } from 'react-router';

export function ArticleManagementIndex() {
  return <Navigate to="inventario-articulos" replace />;
}

function articleLinkClass(state) {
  if (state.isActive) {
    return 'rounded px-3 py-2 text-sm font-semibold text-[var(--color-accent)] underline';
  }
  return 'rounded px-3 py-2 text-sm text-[var(--color-muted)]';
}

export function ArticleManagementLayout() {
  return (
    <>
      <nav aria-label="Gestión de artículos" className="mb-6 flex flex-wrap gap-2">
        <NavLink className={articleLinkClass} to="agregar-articulo">
          Agregar artículo
        </NavLink>
        <NavLink className={articleLinkClass} to="inventario-articulos">
          Inventario de artículos
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
}
