const baseClass = 'whitespace-nowrap text-text';
const normalClass = `${baseClass} text-sm font-semibold`;
const largeClass = `${baseClass} text-xl font-bold`;

export function UnitCount(props) {
  return (
    <span className={props.large ? largeClass : normalClass}>{props.quantity} unidades</span>
  );
}
