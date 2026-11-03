import styles from './ProductItem.module.css';

export function ProductItem(props) {
  return (
    <li className={styles.item}>
      <span className={styles.name}>{props.article.name}</span>
      <span className={styles.detail}>
        {props.article.brand} · {props.article.productType}
      </span>
      <span className="whitespace-nowrap text-sm font-semibold text-[var(--color-text)]">
        {props.article.quantity} unidades
      </span>
    </li>
  );
}
