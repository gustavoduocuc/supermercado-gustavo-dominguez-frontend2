import { useArticleInventory } from '../../articles/ArticleInventoryProvider/ArticleInventoryProvider';
import { findArticle } from '../../articles/ArticleInventoryProvider/inventoryTransitions';
import { TextLink } from '../../ui/TextLink/TextLink';
import { CartLine } from '../CartLine/CartLine';

export function CartPage() {
  const inventory = useArticleInventory();

  return (
    <section className="flex flex-col gap-4">
      <h1 className="m-0 text-2xl">Carrito</h1>
      {inventory.cartLines.length === 0 ? (
        <div className="flex flex-col items-start gap-2">
          <p className="m-0 text-base text-muted">Tu carrito está vacío.</p>
          <TextLink to="/">Ver artículos</TextLink>
        </div>
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
