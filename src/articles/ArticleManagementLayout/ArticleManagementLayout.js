import { NavLink, Navigate, Outlet } from 'react-router';
import { focusRingClass } from '../../ui/focusRing';

const baseLinkClass = `inline-flex min-h-11 items-center rounded px-3 py-2 text-sm transition-colors duration-200 hover:text-accent ${focusRingClass}`;
const currentLinkClass = `${baseLinkClass} font-semibold text-accent underline`;
const otherLinkClass = `${baseLinkClass} text-muted`;

export function ArticleManagementIndex() {
  return <Navigate to="inventario-articulos" replace />;
}

function articleLinkClass(state) {
  if (state.isActive) {
    return currentLinkClass;
  }
  return otherLinkClass;
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
