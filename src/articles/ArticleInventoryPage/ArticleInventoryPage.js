import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

const headerClass =
  'border-b border-[var(--color-line)] px-3 py-2 text-left font-semibold';
const cellClass = 'border-b border-[var(--color-line)] px-3 py-2 text-left';

export function ArticleInventoryPage() {
  const inventory = useArticleInventory();

  return (
    <section>
      <h1 className="mb-4 text-2xl">Inventario de artículos</h1>
      <table className="w-full max-w-3xl border-collapse text-sm">
        <thead>
          <tr>
            <th className={headerClass} scope="col">
              Nombre
            </th>
            <th className={headerClass} scope="col">
              Marca
            </th>
            <th className={headerClass} scope="col">
              Tipo
            </th>
          </tr>
        </thead>
        <tbody>
          {inventory.articles.map(function renderArticle(article) {
            return (
              <tr key={article.id}>
                <td className={cellClass}>{article.name}</td>
                <td className={cellClass}>{article.brand}</td>
                <td className={cellClass}>{article.productType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
