import { useLoaderData } from 'react-router';
import styles from './ContactPage.module.css';

export function ContactPage() {
  const contact = useLoaderData();

  return (
    <article className={styles.page}>
      <h1 className={styles.title}>Contáctanos</h1>
      <address className={styles.address}>
        <p className={styles.line}>{contact.address}</p>
        <dl className={styles.details}>
          <dt className={styles.term}>Teléfono</dt>
          <dd className={styles.value}>{contact.phone}</dd>
          <dt className={styles.term}>Correo</dt>
          <dd className={styles.value}>
            <a className={styles.email} href={'mailto:' + contact.email}>
              {contact.email}
            </a>
          </dd>
        </dl>
      </address>
    </article>
  );
}
