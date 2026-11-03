import { useArticleInventory } from '../ArticleInventoryProvider/ArticleInventoryProvider';

const headerClass =
  'border-b border-[var(--color-line)] px-3 py-2 text-left font-semibold';
const cellClass = 'border-b border-[var(--color-line)] px-3 py-2 text-left';
const quantityClass = `${cellClass} whitespace-nowrap text-sm font-semibold`;

export function ArticleInventoryPage() {
  const inventory = useArticleInventory();

  return (
    <section>
      <h1 className="mb-4 text-2xl">Inventario de artículos</h1>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] max-w-3xl border-collapse text-sm">
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
              <th className={headerClass} scope="col">
                Unidades
              </th>
              <th className={headerClass} scope="col">
                Acciones
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
                  <td className={quantityClass}>{article.quantity} unidades</td>
                  <td className={cellClass}>
                    <button
                      className="min-h-11 rounded px-3 py-2 text-sm text-[var(--color-accent)]"
                      type="button"
                      onClick={function removeRow() {
                        inventory.removeArticle(article.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
