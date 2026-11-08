import { useLoaderData } from 'react-router';
import { Card } from '../../ui/Card/Card';
import { PageTitle } from '../../ui/PageTitle/PageTitle';
import { textLinkClass } from '../../ui/TextLink/TextLink';

export function ContactPage() {
  const contact = useLoaderData();

  return (
    <article className="flex flex-col gap-section">
      <PageTitle>Contáctanos</PageTitle>
      <Card className="w-full max-w-reading p-4 md:p-6">
        <address className="flex flex-col gap-4 not-italic">
          <p>{contact.address}</p>
          <dl className="flex flex-col gap-1">
            <dt className="text-sm text-muted">Teléfono</dt>
            <dd className="mb-3">{contact.phone}</dd>
            <dt className="text-sm text-muted">Correo</dt>
            <dd>
              <a className={textLinkClass} href={'mailto:' + contact.email}>
                {contact.email}
              </a>
            </dd>
          </dl>
        </address>
      </Card>
    </article>
  );
}
