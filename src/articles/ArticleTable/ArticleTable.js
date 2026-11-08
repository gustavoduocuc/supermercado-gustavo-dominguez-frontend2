import { focusRingClass } from '../../ui/focusRing';
import { ArticleRow } from '../ArticleRow/ArticleRow';

const headerClass =
  'border-b border-solid border-line px-3 py-2 text-left font-semibold';
const regionClass = `overflow-x-auto ${focusRingClass}`;

export function ArticleTable(props) {
  return (
    <div
      aria-label="Inventario de artículos"
      className={regionClass}
      role="region"
      tabIndex={0}
    >
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
            return <ArticleRow key={article.id} article={article} onRemove={props.onRemove} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
