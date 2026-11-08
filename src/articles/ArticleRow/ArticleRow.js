import { Button } from '../../ui/Button/Button';
import { ArticleLink } from '../ArticleLink/ArticleLink';
import { UnitCount } from '../UnitCount/UnitCount';

const cellClass = 'border-b border-solid border-line px-3 py-2 text-left';

export function ArticleRow(props) {
  function removeRow() {
    props.onRemove(props.article.id);
  }

  return (
    <tr>
      <td className={cellClass}>
        <ArticleLink article={props.article} />
      </td>
      <td className={cellClass}>{props.article.brand}</td>
      <td className={cellClass}>{props.article.productType}</td>
      <td className={cellClass}>
        <UnitCount quantity={props.article.quantity} />
      </td>
      <td className={cellClass}>
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
