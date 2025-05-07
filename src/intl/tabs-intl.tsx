import {
  memo,
  type JSX,
  useCallback,
  type Dispatch,
  type ComponentType,
  type SetStateAction,
  type KeyboardEventHandler,
} from 'react';

import { TabsItemIntl } from 'library/intl/tabs-item-intl.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props = {
  tab: number;
  className: string;
  itemClassName: string;
  list: ReadonlyArray<IntlMessageId>;
  setTab: Dispatch<SetStateAction<number>>;
};

function F_TabsIntl({
  tab,
  list,
  setTab,
  className,
  itemClassName,
}: Props): JSX.Element {
  const onSelect = useCallback<(index: number) => void>(
    (index: number): void => {
      setTab(index);
    },
    [setTab]
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLButtonElement>>(
    (event): void => {
      switch (event.key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          event.preventDefault();

          setTab((tab - 1 + list.length) % list.length);

          break;
        }

        case 'ArrowDown':
        case 'ArrowRight': {
          event.preventDefault();

          setTab((tab + 1) % list.length);

          break;
        }

        default: {
          break;
        }
      }
    },
    [tab, list.length, setTab]
  );

  return (
    <div role='radiogroup' className={className}>
      {list.map((title: IntlMessageId, index: number): JSX.Element => {
        return (
          <TabsItemIntl
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            index={index}
            title={title}
            onSelect={onSelect}
            onKeyDown={onKeyDown}
            checked={tab === index}
            className={itemClassName}
          />
        );
      })}
    </div>
  );
}

export const TabsIntl: ComponentType<Props> = memo<Props>(F_TabsIntl);
