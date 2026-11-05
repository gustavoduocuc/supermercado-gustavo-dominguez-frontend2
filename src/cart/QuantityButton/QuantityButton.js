import { Button } from '../../ui/Button/Button';

export function QuantityButton(props) {
  return (
    <Button
      ariaLabel={`${props.action} ${props.article.name}`}
      disabled={props.disabled}
      variant="outline"
      onClick={props.onClick}
    >
      {props.symbol}
    </Button>
  );
}
