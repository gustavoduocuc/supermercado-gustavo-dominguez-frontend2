import { TextLink } from '../../ui/TextLink/TextLink';

export function ArticleLink(props) {
  return <TextLink to={`/articulos/${props.article.id}`}>{props.article.name}</TextLink>;
}
