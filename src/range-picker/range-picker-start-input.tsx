import {
  memo,
  type JSX,
  type RefObject,
  type ComponentType,
  type FocusEventHandler,
  type MouseEventHandler,
  type KeyboardEventHandler,
  type ChangeEventHandler,
} from 'react';

import { useTouch } from 'utils/use-touch.ts';

type Props = {
  id: string;
  name: string;
  invalid: boolean;
  inputClassName: string;
  onInputClick: MouseEventHandler<HTMLInputElement>;
  onInputChange: ChangeEventHandler<HTMLInputElement>;
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
  onInputBlurStart?: FocusEventHandler<HTMLInputElement> | undefined;
};

function F_RangePickerStartInput({
  id,
  min,
  max,
  name,
  invalid,
  inputRef,
  disabled,
  required,
  placeholder,
  onInputFocus,
  onDateSelect,
  onInputClick,
  onInputChange,
  strValueStart,
  inputClassName,
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
          value={strValueStart}
          disabled={disabled}
          required={required}
          onBlur={onInputBlurStart}
          onFocus={onInputFocus}
          onChange={onDateSelect}
          placeholder={placeholder}
          className={inputClassName}
          aria-invalid={invalid}
        />
      ) : (
        // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
        <input
          id={id}
          readOnly
          type='text'
          name={name}
          ref={inputRef}
          value={strValueStart}
          disabled={disabled}
          onBlur={onInputBlurStart}
          onFocus={onInputFocus}
          onClick={onInputClick}
          onChange={onInputChange}
          placeholder={placeholder}
          onKeyDown={onInputKeyDown}
          className={inputClassName}
          aria-invalid={invalid}
        />
      )}
    </div>
  );
}

export const RangePickerStartInput: ComponentType<Props> = memo<Props>(
  F_RangePickerStartInput
);
