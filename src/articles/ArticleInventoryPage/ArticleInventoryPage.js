import { CategoryFilter } from '../../filters/CategoryFilter/CategoryFilter';
import { NoArticlesMessage } from '../../filters/NoArticlesMessage/NoArticlesMessage';
import { useCategoryFilter } from '../../filters/useCategoryFilter/useCategoryFilter';
import { ArticleTable } from '../ArticleTable/ArticleTable';
import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

export function ArticleInventoryPage() {
  const inventory = useArticleInventory();
  const filter = useCategoryFilter(inventory.articles);

  return (
    <section className="flex flex-col gap-4">
      <h1 className="m-0 text-2xl">Inventario de artículos</h1>
      <CategoryFilter category={filter.category} onSelect={filter.selectCategory} />
      {filter.visibleArticles.length === 0 ? (
        <NoArticlesMessage />
      ) : (
        <ArticleTable articles={filter.visibleArticles} onRemove={inventory.removeArticle} />
      )}
    </section>
  );
}
