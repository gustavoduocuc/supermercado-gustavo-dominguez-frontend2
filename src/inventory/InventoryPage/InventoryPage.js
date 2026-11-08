import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { CategoryFilter } from '../../filters/CategoryFilter/CategoryFilter';
import { NoArticlesMessage } from '../../filters/NoArticlesMessage/NoArticlesMessage';
import { useCategoryFilter } from '../../filters/useCategoryFilter/useCategoryFilter';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { ProductCard } from '../ProductCard/ProductCard';

export function InventoryPage() {
  const inventory = useArticleInventory();
  const filter = useCategoryFilter(inventory.articles);

  return (
    <section className="flex flex-col gap-section">
      <PageTitle>Inventario</PageTitle>
      <CategoryFilter category={filter.category} onSelect={filter.selectCategory} />
      {filter.visibleArticles.length === 0 ? (
        <NoArticlesMessage />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filter.visibleArticles.map(function renderArticle(article) {
            return <ProductCard key={article.id} article={article} />;
          })}
        </ul>
      )}
    </section>
  );
}
