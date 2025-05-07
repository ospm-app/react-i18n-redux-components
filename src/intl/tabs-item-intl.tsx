import {
  memo,
  useRef,
  useState,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
  type MouseEventHandler,
  type KeyboardEventHandler,
} from 'react';
import { useTranslation } from 'react-i18next';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  index: number;
  checked: boolean;
  className: string;
  title: IntlMessageId;
  onSelect: (index: number) => void;
  onKeyDown: KeyboardEventHandler<HTMLButtonElement>;
};

function F_TabsItemIntl({
  index,
  title,
  checked,
  onSelect,
  className,
  onKeyDown,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const ref = useRef<HTMLButtonElement>(null);
  const [, setSelected] = useState<boolean>(checked);

  useEffect((): void => {
    if (checked) {
      setSelected((selected: boolean) => {
        if (selected !== checked && ref.current !== null) {
          ref.current.focus();
        }

        return checked;
      });
    } else {
      setSelected(false);
    }
  }, [checked]);

  const onClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >((): void => {
    onSelect(index);
  }, [onSelect, index]);

  return (
    <button
      ref={ref}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='radio'
      type='button'
      onClick={onClick}
      className={className}
      onKeyDown={onKeyDown}
      aria-checked={checked}
      tabIndex={checked ? 0 : -1}
    >
      {t(title)}
    </button>
  );
}

export const TabsItemIntl: ComponentType<Props> = memo<Props>(F_TabsItemIntl);
