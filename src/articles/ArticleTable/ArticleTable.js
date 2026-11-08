import { Card } from '../../ui/Card/Card';
import { focusRingClass } from '../../ui/focusRing';
import { ArticleRow } from '../ArticleRow/ArticleRow';
import { headerCellClass, stickyCellClass } from '../tableCellClass';

const regionClass = `overflow-x-auto rounded-card ${focusRingClass}`;

export function ArticleTable(props) {
  return (
    <Card>
      <div
        aria-label="Inventario de artículos"
        className={regionClass}
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[36rem] border-collapse text-sm lg:min-w-0">
          <thead>
            <tr className="bg-background">
              <th className={`${headerCellClass} ${stickyCellClass}`} scope="col">
                Nombre
              </th>
              <th className={headerCellClass} scope="col">
                Marca
              </th>
              <th className={headerCellClass} scope="col">
                Tipo
              </th>
              <th className={headerCellClass} scope="col">
                Unidades
              </th>
              <th className={headerCellClass} scope="col">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {props.articles.map(function renderArticle(article) {
              return (
                <ArticleRow key={article.id} article={article} onRemove={props.onRemove} />
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
