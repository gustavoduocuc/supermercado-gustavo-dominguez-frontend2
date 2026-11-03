import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { CategoryFilter } from '../../filters/CategoryFilter/CategoryFilter';
import { NoArticlesMessage } from '../../filters/NoArticlesMessage/NoArticlesMessage';
import { useCategoryFilter } from '../../filters/useCategoryFilter/useCategoryFilter';
import { ProductItem } from '../ProductItem/ProductItem';
import styles from './InventoryPage.module.css';

export function InventoryPage() {
  const inventory = useArticleInventory();
  const filter = useCategoryFilter(inventory.articles);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Inventario</h1>
      <CategoryFilter category={filter.category} onSelect={filter.selectCategory} />
      {filter.visibleArticles.length === 0 ? (
        <NoArticlesMessage />
      ) : (
        <ul className={styles.list}>
          {filter.visibleArticles.map(function renderArticle(article) {
            return <ProductItem key={article.id} article={article} />;
          })}
        </ul>
      )}
    </section>
  );
}
