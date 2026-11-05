import { ArticleRow } from '../ArticleRow/ArticleRow';

const headerClass =
  'border-b border-solid border-line px-3 py-2 text-left font-semibold';

export function ArticleTable(props) {
  return (
    <div
      aria-label="Inventario de artículos"
      className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
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
