import { Link } from 'react-router';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.message}>
        La dirección no corresponde a ninguna sección.
      </p>
      <Link className={styles.homeLink} to="/">
        Volver a Inicio
      </Link>
    </section>
  );
}
