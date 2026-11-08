import { Button } from '../../ui/Button/Button';
import { ArticleLink } from '../ArticleLink/ArticleLink';
import { bodyCellClass, stickyCellClass } from '../tableCellClass';
import { UnitCount } from '../UnitCount/UnitCount';

export function ArticleRow(props) {
  function removeRow() {
    props.onRemove(props.article.id);
  }

  return (
    <tr className="bg-surface transition-colors duration-200 hover:bg-accent-soft">
      <td className={`${bodyCellClass} ${stickyCellClass}`}>
        <ArticleLink article={props.article} />
      </td>
      <td className={bodyCellClass}>{props.article.brand}</td>
      <td className={bodyCellClass}>{props.article.productType}</td>
      <td className={bodyCellClass}>
        <UnitCount quantity={props.article.quantity} />
      </td>
      <td className={bodyCellClass}>
        <Button
          ariaLabel={`Eliminar ${props.article.name}`}
          variant="danger"
          onClick={removeRow}
        >
          Eliminar
        </Button>
      </td>
    </tr>
  );
}
