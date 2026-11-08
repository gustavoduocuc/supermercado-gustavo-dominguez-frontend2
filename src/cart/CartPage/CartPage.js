import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { findArticle } from '../../articles/ArticleInventoryProvider/inventoryTransitions';
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
        <ul aria-label="Carrito" className="m-0 flex max-w-3xl list-none flex-col gap-3 p-0">
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
      )}
    </section>
  );
}
