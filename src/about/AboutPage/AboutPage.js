import { useLoaderData } from 'react-router';
import styles from './AboutPage.module.css';

export function AboutPage() {
  const paragraphs = useLoaderData();

  return (
    <article className={styles.page}>
      <h1 className={styles.title}>Quiénes somos</h1>
      {paragraphs.map(function renderParagraph(paragraph) {
        return (
          <p key={paragraph} className={styles.paragraph}>
            {paragraph}
          </p>
        );
      })}
    </article>
  );
}
