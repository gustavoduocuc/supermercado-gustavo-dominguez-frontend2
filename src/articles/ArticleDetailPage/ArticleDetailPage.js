import { useParams } from 'react-router';
import { Button } from '../../ui/Button/Button';
import { ArticleNotFound } from '../ArticleNotFound/ArticleNotFound';
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
    <section className="flex flex-col gap-4">
      <h1 className="m-0 text-2xl">{article.name}</h1>
      <dl className="m-0 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-base">
        <dt className="text-muted">Marca</dt>
        <dd className="m-0">{article.brand}</dd>
        <dt className="text-muted">Tipo</dt>
        <dd className="m-0">{article.productType}</dd>
        <dt className="text-muted">Unidades disponibles</dt>
        <dd aria-live="polite" className="m-0">
          <UnitCount quantity={article.quantity} />
        </dd>
      </dl>
      <div>
        <Button disabled={!hasStock} onClick={addToCart}>
          {hasStock ? 'Agregar al carrito' : 'Agotado'}
        </Button>
      </div>
    </section>
  );
}
