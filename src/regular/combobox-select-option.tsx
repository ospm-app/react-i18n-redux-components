import {
  memo,
  useRef,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
  type MouseEventHandler,
} from 'react';

import { scrollToElement } from 'utils/scroll.ts';

import type { SelectOption } from 'library/types.ts';

type Props = {
  id: string;
  index: number;
  active: boolean;
  className: string;
  selected: boolean;
  option: Readonly<SelectOption>;
  onSelect: (index: number) => void;
};

function F_ComboboxSelectOption({
  id,
  index,
  active,
  option,
  selected,
  onSelect,
  className,
}: Props): JSX.Element {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    if (active) {
      scrollToElement(itemRef.current);
    }
  }, [active]);

  const onClick = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event): void => {
      event.stopPropagation();

      onSelect(index);
    },
    [index, onSelect]
  );

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <li
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
      role='option'
      ref={itemRef}
      onClick={onClick}
      aria-current={active}
      className={className}
      onKeyDown={undefined}
      aria-selected={selected}
      id={`${id}-option-${index}`}
    >
      {option.label}
    </li>
  );
}

export const ComboboxSelectOption: ComponentType<Props> = memo<Props>(
  F_ComboboxSelectOption
);
