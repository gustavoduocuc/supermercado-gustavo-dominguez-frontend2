import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { TextLink } from '../../ui/TextLink/TextLink';

export function ArticleNotFound() {
  return (
    <section className="flex flex-col gap-section">
      <PageTitle>Artículo no encontrado</PageTitle>
      <EmptyState message="El artículo que buscas no existe.">
        <TextLink to="/">Volver a Inicio</TextLink>
      </EmptyState>
    </section>
  );
}
