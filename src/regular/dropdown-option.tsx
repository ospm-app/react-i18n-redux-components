import {
  type JSX,
  useCallback,
  type ReactNode,
  type MouseEventHandler,
} from 'react';

import { reactMemo } from 'utils/react-memo.ts';

import type { Locale } from 'const/intl/index.ts';

type Props<Label extends ReactNode> = {
  id: string;
  value: Locale;
  label: Label;
  active: boolean;
  selected: boolean;
  onClick: (next: Locale) => void;
  listItemClassName: string;
  listItemButtonClassName: string;
  listItemButtonLabelClassName: string;
};

function F_DropdownOption<Label extends ReactNode>({
  id,
  value,
  label,
  active,
  selected,
  onClick,
  listItemClassName,
  listItemButtonClassName,
  listItemButtonLabelClassName,
}: Props<Label>): JSX.Element {
  const onLiClick = useCallback<MouseEventHandler<HTMLLIElement>>(
    (event): void => {
      event.stopPropagation();

      onClick(value);
    },
    [onClick, value]
  );

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    // biome-ignore lint/a11y/useFocusableInteractive: <explanation>
    <li
      id={id}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
      role='option'
      onClick={onLiClick}
      aria-current={active}
      onKeyDown={undefined}
      aria-selected={selected}
      className={listItemClassName}
    >
      <div className={listItemButtonClassName}>
        <div className={listItemButtonLabelClassName}>{label}</div>
      </div>
    </li>
  );
}

export const DropdownOption = reactMemo(F_DropdownOption);
