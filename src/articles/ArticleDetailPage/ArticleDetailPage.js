import { useParams } from 'react-router';
import { Button } from '../../ui/Button/Button';
import { Card } from '../../ui/Card/Card';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { ArticleNotFound } from '../ArticleNotFound/ArticleNotFound';
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { CategoryTile } from '../CategoryTile/CategoryTile';
import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';
import { findArticle } from '../ArticleInventoryProvider/inventoryTransitions';
import { UnitCount } from '../UnitCount/UnitCount';

export function ArticleDetailPage() {
  const params = useParams();
  const inventory = useArticleInventory();
  const article = findArticle(inventory.articles, params.articleId);

  if (!article) {
    return <ArticleNotFound />;
  }

  const hasStock = article.quantity > 0;

  function addToCart() {
    inventory.addUnitToCart(article.id);
  }

  return (
    <section>
      <Card className="flex flex-col gap-4 p-4 lg:flex-row lg:gap-8 lg:p-6">
        <div className="flex flex-col lg:w-2/5">
          <CategoryTile productType={article.productType} size="fill" />
        </div>
        <div className="flex flex-col gap-4 lg:flex-1 lg:justify-center">
          <PageTitle>{article.name}</PageTitle>
          <dl className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 text-base">
            <dt className="text-muted">Marca</dt>
            <dd>{article.brand}</dd>
            <dt className="text-muted">Tipo</dt>
            <dd>
              <CategoryChip productType={article.productType} />
            </dd>
            <dt className="text-muted">Unidades disponibles</dt>
            <dd aria-live="polite">
              <UnitCount quantity={article.quantity} />
            </dd>
          </dl>
          <div>
            <Button disabled={!hasStock} onClick={addToCart}>
              {hasStock ? 'Agregar al carrito' : 'Agotado'}
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
