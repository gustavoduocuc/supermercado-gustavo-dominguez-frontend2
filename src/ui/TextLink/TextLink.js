import { Link } from 'react-router';

const linkClass =
  'inline-flex min-h-11 items-center rounded text-accent underline underline-offset-2 transition-colors duration-200 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function TextLink(props) {
  return (
    <Link className={linkClass} to={props.to}>
      {props.children}
    </Link>
  );
}
