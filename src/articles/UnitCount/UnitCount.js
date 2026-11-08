const normalClass = 'whitespace-nowrap text-sm font-semibold text-text';
const largeClass = 'whitespace-nowrap text-xl font-bold text-text';

export function UnitCount(props) {
  return (
    <span className={props.large ? largeClass : normalClass}>{props.quantity} unidades</span>
  );
}
