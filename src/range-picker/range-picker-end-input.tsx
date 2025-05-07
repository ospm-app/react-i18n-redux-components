import {
  memo,
  type JSX,
  type RefObject,
  type ChangeEvent,
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
  onInputKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onDateSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  min?: number | undefined;
  max?: number | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  strValueEnd?: string | undefined;
  placeholder?: string | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
  onInputFocus?: FocusEventHandler<HTMLInputElement> | undefined;
  onInputBlurEnd?: FocusEventHandler<HTMLInputElement> | undefined;
};

function F_RangePickerEndInput({
  id,
  min,
  max,
  name,
  invalid,
  inputRef,
  disabled,
  required,
  placeholder,
  strValueEnd,
  onInputClick,
  onInputFocus,
  onDateSelect,
  onInputChange,
  inputClassName,
  onInputKeyDown,
  onInputBlurEnd,
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
          value={strValueEnd}
          disabled={disabled}
          required={required}
          onBlur={onInputBlurEnd}
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
          value={strValueEnd}
          disabled={disabled}
          onBlur={onInputBlurEnd}
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

export const RangePickerEndInput: ComponentType<Props> = memo<Props>(
  F_RangePickerEndInput
);
