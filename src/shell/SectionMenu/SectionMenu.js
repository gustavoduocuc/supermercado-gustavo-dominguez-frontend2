import { NavLink } from 'react-router';
import styles from './SectionMenu.module.css';

const sections = [
  { to: '/quienes-somos', label: 'Quiénes somos' },
  { to: '/contacto', label: 'Contáctanos' },
];

function sectionLinkClass(state) {
  if (state.isActive) {
    return styles.linkCurrent;
  }

  return styles.link;
}

export function SectionMenu() {
  return (
    <nav className={styles.menu} aria-label="Secciones">
      <NavLink className={sectionLinkClass} to="/" end>
        Inicio
      </NavLink>
      {sections.map(function renderSection(section) {
        return (
          <NavLink
            key={section.to}
            className={sectionLinkClass}
            to={section.to}
          >
            {section.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
