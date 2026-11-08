import { NavLink } from 'react-router';
import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { focusRingClass } from '../../ui/focusRing';

const menuClass =
  'fixed inset-x-0 bottom-0 flex justify-around gap-1 bg-surface px-1 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-menu md:static md:justify-end md:gap-0 md:bg-transparent md:p-0 md:shadow-none lg:gap-1';
const linkBaseClass = `flex min-h-11 flex-auto items-center justify-center gap-1 rounded-control px-0.5 text-center text-sm leading-tight transition-colors duration-200 md:flex-none md:px-1.5 lg:px-3 ${focusRingClass}`;
const linkCurrentClass = `${linkBaseClass} bg-accent-soft font-semibold text-accent`;
const linkOtherClass = `${linkBaseClass} text-muted hover:bg-background hover:text-text`;
const badgeClass =
  'rounded-pill bg-accent px-1.5 text-sm font-bold leading-normal text-surface';

function sectionLinkClass(state) {
  if (state.isActive) {
    return linkCurrentClass;
  }

  return linkOtherClass;
}

export function SectionMenu() {
  const inventory = useArticleInventory();

  return (
    <nav className={menuClass} aria-label="Secciones">
      <NavLink className={sectionLinkClass} to="/" end>
        Inicio
      </NavLink>
      <NavLink className={sectionLinkClass} to="/quienes-somos">
        Quiénes somos
      </NavLink>
      <NavLink className={sectionLinkClass} to="/contacto">
        Contáctanos
      </NavLink>
      <NavLink className={sectionLinkClass} to="/carrito">
        Carrito
        {inventory.cartUnitCount > 0 && (
          <span className={badgeClass}>{inventory.cartUnitCount}</span>
        )}
      </NavLink>
      <NavLink className={sectionLinkClass} to="/gestion-articulos">
        Gestión de artículos
      </NavLink>
    </nav>
  );
}
