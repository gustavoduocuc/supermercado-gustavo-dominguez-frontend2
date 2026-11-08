import { useLoaderData } from 'react-router';
import { Card } from '../../ui/Card/Card';
import { PageTitle } from '../../ui/PageTitle/PageTitle';

export function AboutPage() {
  const paragraphs = useLoaderData();

  return (
    <article className="flex flex-col gap-section">
      <PageTitle>Quiénes somos</PageTitle>
      <Card className="flex w-full max-w-reading flex-col gap-4 p-4 leading-relaxed md:p-6">
        {paragraphs.map(function renderParagraph(paragraph) {
          return <p key={paragraph}>{paragraph}</p>;
        })}
      </Card>
    </article>
  );
}
