import {
  memo,
  useId,
  type JSX,
  type ComponentType,
  type ChangeEventHandler,
} from 'react';

export type RadioOption = {
  id?: string | undefined;
  label: string;
  value: string;
  disabled?: boolean;
  description?: string | undefined;
  renderDescription?: (() => JSX.Element) | undefined;
};

type Props = {
  name: string;
  selected: string;
  required: boolean;
  option: RadioOption;
  divClassName: string;
  labelClassName: string;
  titleClassName: string;
  inputClassName: string;
  checkerClassName: string;
  checkmarkClassName: string;
  containerClassName: string;
  descriptionClassName: string;
  invalid?: boolean | undefined;
  disabled?: boolean | undefined;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
};

function F_RadioOption({
  name,
  option,
  invalid,
  required,
  disabled,
  selected,
  divClassName,
  onInputChange,
  labelClassName,
  inputClassName,
  titleClassName,
  checkerClassName,
  checkmarkClassName,
  containerClassName,
  descriptionClassName,
}: Props): JSX.Element {
  const id = useId();

  return (
    <div className={containerClassName}>
      <div className={divClassName}>
        <input
          id={id}
          type='radio'
          name={name}
          required={required}
          disabled={disabled}
          onChange={onInputChange}
          className={inputClassName}
          checked={selected === option.value}
          value={option.value}
        />

        <div className={checkerClassName}>
          {selected === option.value ? (
            <div className={checkmarkClassName} />
          ) : null}
        </div>

        <label htmlFor={id} data-invalid={invalid} className={labelClassName}>
          <div className={titleClassName}>{option.label}</div>

          {typeof option.renderDescription === 'function' ? (
            option.renderDescription()
          ) : typeof option.description === 'string' ? (
            <div className={descriptionClassName}>{option.description}</div>
          ) : null}
        </label>
      </div>
    </div>
  );
}

export const RadioOption: ComponentType<Props> = memo<Props>(F_RadioOption);
