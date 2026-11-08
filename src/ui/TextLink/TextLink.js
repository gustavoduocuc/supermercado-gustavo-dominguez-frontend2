import { Link } from 'react-router';
import { focusRingClass } from '../focusRing';

const linkClass = `inline-flex min-h-11 items-center rounded text-accent underline underline-offset-2 transition-colors duration-200 hover:text-text ${focusRingClass}`;

export function TextLink(props) {
  return (
    <Link className={linkClass} to={props.to}>
      {props.children}
    </Link>
  );
}
