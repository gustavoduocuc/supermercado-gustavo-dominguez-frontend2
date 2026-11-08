import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { findArticle } from '../../articles/ArticleInventoryProvider/inventoryTransitions';
import { UnitCount } from '../../articles/UnitCount/UnitCount';
import { Card } from '../../ui/Card/Card';
import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { TextLink } from '../../ui/TextLink/TextLink';
import { CartLine } from '../CartLine/CartLine';

export function CartPage() {
  const inventory = useArticleInventory();

  return (
    <section className="flex flex-col gap-section">
      <PageTitle>Carrito</PageTitle>
      {inventory.cartLines.length === 0 ? (
        <EmptyState message="Tu carrito está vacío.">
          <TextLink to="/">Ver artículos</TextLink>
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-section lg:flex-row lg:items-start">
          <ul aria-label="Carrito" className="flex flex-1 flex-col gap-3">
            {inventory.cartLines.map(function renderLine(line) {
              return (
                <CartLine
                  key={line.articleId}
                  article={findArticle(inventory.articles, line.articleId)}
                  quantity={line.quantity}
                  onDecrease={inventory.removeUnitFromCart}
                  onIncrease={inventory.addUnitToCart}
                />
              );
            })}
          </ul>
          <Card as="aside" className="p-4 lg:sticky lg:top-24 lg:w-72">
            <UnitCount quantity={inventory.cartUnitCount} size="large" />
          </Card>
        </div>
      )}
    </section>
  );
}
