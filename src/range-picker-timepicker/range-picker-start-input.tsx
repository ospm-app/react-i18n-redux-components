import {
  memo,
  type JSX,
  type RefObject,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';

import { useTouch } from 'utils/use-touch.ts';

type Props = {
  id: string;
  name: string;
  invalid: boolean;
  inputClassName: string;
  onInputClick: MouseEventHandler<HTMLInputElement>;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
  onInputBlurStart?: FocusEventHandler<HTMLInputElement>;
  onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onDateSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number | undefined;
  max?: number | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  placeholder?: string | undefined;
  strValueStart?: string | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onInputFocus?: FocusEventHandler<HTMLInputElement> | undefined;
};

function F_RangePickerTimepickerStartInput({
  id,
  min,
  max,
  name,
  invalid,
  disabled,
  required,
  inputRef,
  placeholder,
  onInputFocus,
  onDateSelect,
  onInputClick,
  strValueStart,
  inputClassName,
  onInputChange,
  onInputKeyDown,
  onInputBlurStart,
}: Props): JSX.Element {
  const isTouch = useTouch();

  return (
    <div>
      {isTouch ? (
        // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
        <input
          id={id}
          step={1}
          max={max}
          min={min}
          type='date'
          name={name}
          ref={inputRef}
          disabled={disabled}
          required={required}
          value={strValueStart}
          aria-invalid={invalid}
          onFocus={onInputFocus}
          onChange={onDateSelect}
          onBlur={onInputBlurStart}
          placeholder={placeholder}
          className={inputClassName}
        />
      ) : (
        // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
        <input
          id={id}
          readOnly
          type='text'
          name={name}
          ref={inputRef}
          disabled={disabled}
          value={strValueStart}
          onFocus={onInputFocus}
          onClick={onInputClick}
          aria-invalid={invalid}
          onChange={onInputChange}
          onBlur={onInputBlurStart}
          placeholder={placeholder}
          onKeyDown={onInputKeyDown}
          className={inputClassName}
        />
      )}
    </div>
  );
}

export const RangePickerTimepickerStartInput: ComponentType<Props> =
  memo<Props>(F_RangePickerTimepickerStartInput);
