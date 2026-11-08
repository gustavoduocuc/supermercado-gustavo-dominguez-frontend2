const baseClass = 'rounded-card border bg-surface shadow-card';

export function Card(props) {
  const Element = props.as ?? 'div';

  return <Element className={`${baseClass} ${props.className ?? ''}`}>{props.children}</Element>;
}
