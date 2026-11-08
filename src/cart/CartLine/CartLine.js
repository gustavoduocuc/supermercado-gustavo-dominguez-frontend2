import { ArticleLink } from '../../articles/ArticleLink/ArticleLink';
import { CategoryTile } from '../../articles/CategoryTile/CategoryTile';
import { Card } from '../../ui/Card/Card';
import { QuantityButton } from '../QuantityButton/QuantityButton';

export function CartLine(props) {
  const article = props.article;

  function increase() {
    props.onIncrease(article.id);
  }

  function decrease() {
    props.onDecrease(article.id);
  }

  return (
    <Card as="li" className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:gap-4">
      <div className="flex items-center gap-3 md:flex-1">
        <CategoryTile productType={article.productType} size="small" />
        <div className="flex flex-col">
          <ArticleLink article={article} />
          <span className="text-sm text-muted">
            {article.brand} · {article.productType}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <QuantityButton action="Disminuir" article={article} symbol="−" onClick={decrease} />
        <span aria-live="polite" className="min-w-24 text-center text-base font-semibold">
          {`Cantidad: ${props.quantity}`}
        </span>
        <QuantityButton
          action="Aumentar"
          article={article}
          disabled={article.quantity < 1}
          symbol="+"
          onClick={increase}
        />
      </div>
    </Card>
  );
}
