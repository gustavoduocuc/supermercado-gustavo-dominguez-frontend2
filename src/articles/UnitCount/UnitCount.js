const baseClass = 'whitespace-nowrap text-text';

const sizeClasses = {
  normal: `${baseClass} text-sm font-semibold`,
  large: `${baseClass} text-xl font-bold`,
};

export function UnitCount(props) {
  return (
    <span className={sizeClasses[props.size ?? 'normal']}>{props.quantity} unidades</span>
  );
}
