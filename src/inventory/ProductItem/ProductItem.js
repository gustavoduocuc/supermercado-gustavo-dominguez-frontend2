import { ArticleLink } from '../../articles/ArticleLink/ArticleLink';
import { UnitCount } from '../../articles/UnitCount/UnitCount';
import styles from './ProductItem.module.css';

export function ProductItem(props) {
  return (
    <li className={styles.item}>
      <ArticleLink article={props.article} />
      <span className={styles.detail}>
        {props.article.brand} · {props.article.productType}
      </span>
      <UnitCount quantity={props.article.quantity} />
    </li>
  );
}
