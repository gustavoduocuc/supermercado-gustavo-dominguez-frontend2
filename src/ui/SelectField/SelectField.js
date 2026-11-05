import { fieldClass, labelClass } from '../fieldClass';

export function SelectField(props) {
  return (
    <label className={labelClass}>
      {props.label}
      <select
        className={fieldClass}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map(function renderOption(option) {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </label>
  );
}
