import {
  useRef,
  type JSX,
  useEffect,
  useCallback,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';
import { scrollToElement } from 'utils/scroll.ts';

import { reactMemo } from 'utils/react-memo.ts';

import type { SelectOptionIntl } from 'library/types.ts';

type Props<Value extends string | undefined> = {
  id: string;
  index: number;
  active: boolean;
  selected: boolean;
  className: string;
  onSelect: (index: number) => void;
  option: Readonly<SelectOptionIntl<Value>>;
  onKeyDown: KeyboardEventHandler<HTMLLIElement>;
};

function F_ComboboxOption<Value extends string | undefined>({
  id,
  index,
  option,
  active,
  selected,
  onSelect,
  className,
  onKeyDown,
}: Props<Value>): JSX.Element {
  const { t } = useTranslation();

  const itemRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    if (active) {
      scrollToElement(itemRef.current);
    }
  }, [active]);

  const onClick = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event) => {
      event.stopPropagation();

      onSelect(index);
    },
    [index, onSelect]
  );

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <li
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='option'
      ref={itemRef}
      onClick={onClick}
      aria-current={active}
      className={className}
      onKeyDown={onKeyDown}
      aria-selected={selected}
      id={`${id}-option-$index`}
    >
      {`${t(option.label)} ${option['offset']} (${option['time']})`}
    </li>
  );
}

export const ComboboxOption = reactMemo(F_ComboboxOption);
