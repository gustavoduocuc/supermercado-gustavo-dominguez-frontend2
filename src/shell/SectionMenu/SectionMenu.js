import { NavLink } from 'react-router';
import styles from './SectionMenu.module.css';

const destinations = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/quienes-somos', label: 'Quiénes somos', end: false },
  { to: '/contacto', label: 'Contáctanos', end: false },
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
      {destinations.map(function renderDestination(destination) {
        return (
          <NavLink
            key={destination.to}
            className={sectionLinkClass}
            to={destination.to}
            end={destination.end}
          >
            {destination.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
