import { useLoaderData } from 'react-router';
import { ProductItem } from '../ProductItem/ProductItem';
import styles from './InventoryPage.module.css';

export function InventoryPage() {
  const products = useLoaderData();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Inventario</h1>
      <ul className={styles.list}>
        {products.map(function renderProduct(product) {
          return <ProductItem key={product.id} product={product} />;
        })}
      </ul>
    </section>
  );
}
