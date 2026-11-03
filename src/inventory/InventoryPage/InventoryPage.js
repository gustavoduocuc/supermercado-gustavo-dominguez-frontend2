import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { ProductItem } from '../ProductItem/ProductItem';
import styles from './InventoryPage.module.css';

export function InventoryPage() {
  const inventory = useArticleInventory();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Inventario</h1>
      <ul className={styles.list}>
        {inventory.articles.map(function renderArticle(article) {
          return <ProductItem key={article.id} article={article} />;
        })}
      </ul>
    </section>
  );
}
