import { TextLink } from '../../ui/TextLink/TextLink';

export function ArticleNotFound() {
  return (
    <section className="flex flex-col items-start gap-4">
      <h1 className="m-0 text-2xl">Artículo no encontrado</h1>
      <p className="m-0 text-base text-muted">El artículo que buscas no existe.</p>
      <TextLink to="/">Volver a Inicio</TextLink>
    </section>
  );
}
