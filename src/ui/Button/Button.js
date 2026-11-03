const baseClass =
  'min-h-11 rounded px-4 py-2 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50';

const variantClasses = {
  primary: `${baseClass} border-0 bg-accent text-surface hover:opacity-90`,
  ghost: `${baseClass} border-0 bg-transparent text-accent hover:underline disabled:hover:no-underline`,
  outline: `${baseClass} border border-solid border-line bg-surface text-text hover:border-accent disabled:hover:border-line`,
};

export function Button(props) {
  return (
    <button
      aria-label={props.ariaLabel}
      className={variantClasses[props.variant ?? 'primary']}
      disabled={props.disabled}
      type={props.type ?? 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
