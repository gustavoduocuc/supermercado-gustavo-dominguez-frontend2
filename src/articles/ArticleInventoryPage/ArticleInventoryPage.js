import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

export function ArticleInventoryPage() {
  const inventory = useArticleInventory();

  return (
    <section>
      <h1>Inventario de artículos</h1>
      <table>
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Marca</th>
            <th scope="col">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {inventory.articles.map(function renderArticle(article) {
            return (
              <tr key={article.id}>
                <td>{article.name}</td>
                <td>{article.brand}</td>
                <td>{article.productType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
