import { Link } from 'react-router';
import { focusRingClass } from '../focusRing';

export const textLinkClass = `inline-flex min-h-11 items-center rounded text-accent underline underline-offset-2 transition-colors duration-200 hover:text-accent-strong ${focusRingClass}`;

export function TextLink(props) {
  return (
    <Link className={textLinkClass} to={props.to}>
      {props.children}
    </Link>
  );
}
