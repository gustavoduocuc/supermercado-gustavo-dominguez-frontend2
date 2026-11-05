import { fieldClass, labelClass } from '../fieldClass';

export function TextField(props) {
  return (
    <label className={labelClass}>
      {props.label}
      <input
        className={fieldClass}
        min={props.min}
        name={props.name}
        step={props.step}
        type={props.type ?? 'text'}
        value={props.value}
        onChange={props.onChange}
      />
    </label>
  );
}
