import { Button } from '../../ui/Button/Button';

const headerClass =
  'border-b border-solid border-line px-3 py-2 text-left font-semibold';
const cellClass = 'border-b border-solid border-line px-3 py-2 text-left';
const quantityClass = `${cellClass} whitespace-nowrap text-sm font-semibold`;

export function ArticleTable(props) {
  return (
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
          {props.articles.map(function renderArticle(article) {
            return (
              <tr key={article.id}>
                <td className={cellClass}>{article.name}</td>
                <td className={cellClass}>{article.brand}</td>
                <td className={cellClass}>{article.productType}</td>
                <td className={quantityClass}>{article.quantity} unidades</td>
                <td className={cellClass}>
                  <Button
                    variant="ghost"
                    onClick={function removeRow() {
                      props.onRemove(article.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
