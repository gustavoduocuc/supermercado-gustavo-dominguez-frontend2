import { NavLink } from 'react-router';
import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import styles from './SectionMenu.module.css';

function sectionLinkClass(state) {
  if (state.isActive) {
    return styles.linkCurrent;
  }

  return styles.link;
}

export function SectionMenu() {
  const inventory = useArticleInventory();

  return (
    <nav className={styles.menu} aria-label="Secciones">
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
          <span className={styles.badge}>{inventory.cartUnitCount}</span>
        )}
      </NavLink>
      <NavLink className={sectionLinkClass} to="/gestion-articulos">
        Gestión de artículos
      </NavLink>
    </nav>
  );
}
