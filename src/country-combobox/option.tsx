import {
  memo,
  useRef,
  type JSX,
  useEffect,
  useCallback,
  type ComponentType,
} from 'react';
import classnames from 'classnames';
import { scrollToElement } from 'utils/scroll.ts';

import * as flagsBgClasses from 'styles/flags.module.css';

import type { Flags } from 'app/valibot.ts';

type Props = {
  id: string;
  value: Flags;
  label: string;
  active: boolean;
  selected: boolean;
  itemClassName: string;
  flagClassName: string;
  spanOptionClassName: string;
  onSelect: (value: Flags) => void;
};

function F_Option({
  id,
  value,
  label,
  active,
  onSelect,
  selected,
  itemClassName,
  flagClassName,
  spanOptionClassName,
}: Props): JSX.Element {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect((): void => {
    if (active) {
      scrollToElement(itemRef.current);
    }
  }, [active]);

  const onClick = useCallback<() => void>((): void => {
    onSelect(value);
  }, [onSelect, value]);

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    <li
      id={id}
      ref={itemRef}
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='option'
      aria-current={active}
      aria-selected={selected}
      className={itemClassName}
      onKeyDown={undefined}
      onClick={onClick}
      tabIndex={0}
    >
      <div
        role='img'
        aria-hidden
        className={classnames(flagClassName, flagsBgClasses[value])}
      />

      <span className={spanOptionClassName}>{label}</span>
    </li>
  );
}

export const Option: ComponentType<Props> = memo<Props>(F_Option);
