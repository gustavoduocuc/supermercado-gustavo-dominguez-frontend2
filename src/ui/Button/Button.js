import { focusRingClass } from '../focusRing';

const baseClass = `inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border border-solid px-4 py-2 text-sm font-semibold transition-colors duration-200 ${focusRingClass} disabled:cursor-not-allowed disabled:border-line disabled:bg-background disabled:text-muted`;

const variantClasses = {
  primary: `${baseClass} border-accent bg-accent text-surface enabled:hover:border-accent-strong enabled:hover:bg-accent-strong enabled:active:shadow-inner`,
  outline: `${baseClass} border-field bg-surface text-text enabled:hover:border-accent enabled:hover:bg-accent-soft enabled:active:border-accent-strong enabled:active:bg-accent-soft enabled:active:shadow-inner`,
  danger: `${baseClass} border-danger bg-surface text-danger enabled:hover:bg-danger-soft enabled:active:bg-danger-soft enabled:active:shadow-inner`,
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
