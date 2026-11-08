import { EmptyState } from '../../ui/EmptyState/EmptyState';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { TextLink } from '../../ui/TextLink/TextLink';

export function NotFoundPage() {
  return (
    <section className="flex flex-col gap-section">
      <PageTitle>Página no encontrada</PageTitle>
      <EmptyState message="La dirección no corresponde a ninguna sección.">
        <TextLink to="/">Volver a Inicio</TextLink>
      </EmptyState>
    </section>
  );
}
