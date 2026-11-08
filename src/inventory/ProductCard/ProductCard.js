import { ArticleLink } from '../../articles/ArticleLink/ArticleLink';
import { CategoryChip } from '../../articles/CategoryChip/CategoryChip';
import { CategoryTile } from '../../articles/CategoryTile/CategoryTile';
import { UnitCount } from '../../articles/UnitCount/UnitCount';
import { Card } from '../../ui/Card/Card';

export function ProductCard(props) {
  return (
    <Card as="li" className="flex flex-col gap-3 p-4">
      <CategoryTile productType={props.article.productType} />
      <div className="flex flex-col">
        <p className="text-lg font-semibold leading-snug">
          <ArticleLink article={props.article} />
        </p>
        <p className="text-sm text-muted">{props.article.brand}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2">
        <CategoryChip productType={props.article.productType} />
        <UnitCount quantity={props.article.quantity} />
      </div>
    </Card>
  );
}
