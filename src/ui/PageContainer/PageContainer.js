const baseClass = 'mx-auto w-full max-w-page px-gutter md:px-gutter-wide';

export function PageContainer(props) {
  return <div className={`${baseClass} ${props.className ?? ''}`}>{props.children}</div>;
}
