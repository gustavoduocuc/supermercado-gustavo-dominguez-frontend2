import styles from './ProductItem.module.css';

export function ProductItem(props) {
  return (
    <li className={styles.item}>
      <span className={styles.name}>{props.product.name}</span>
      <span className={styles.stock}>{props.product.stock} en stock</span>
    </li>
  );
}
