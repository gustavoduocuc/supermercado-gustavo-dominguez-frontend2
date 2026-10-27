import { Link, Outlet } from 'react-router';
import { SectionMenu } from '../SectionMenu/SectionMenu';
import styles from './AppShell.module.css';

export function AppShell() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link className={styles.brand} to="/">
          Supermercado La Quinta
        </Link>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <SectionMenu />
    </div>
  );
}
