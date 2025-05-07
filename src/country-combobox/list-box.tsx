import { memo, type ComponentType, type JSX } from 'react';
import classnames from 'classnames';

import { Option } from 'library/country-combobox/option.tsx';

import type { Flags } from 'app/valibot.ts';
import type { CountryOption } from 'library/country-combobox/types.ts';

type Props = {
  id: string;
  active: number;
  expanded: boolean;
  currentValue: string;
  listClassName: string;
  itemClassName: string;
  flagClassName: string;
  spanOptionClassName: string;
  hiddenListClassName: string;
  onSelect: (value: Flags) => void;
  values: ReadonlyArray<CountryOption<Flags>>;
};

function F_ListBox({
  id,
  active,
  values,
  expanded,
  onSelect,
  currentValue,
  listClassName,
  itemClassName,
  flagClassName,
  spanOptionClassName,
  hiddenListClassName,
}: Props): JSX.Element {
  const className = classnames(listClassName, {
    [hiddenListClassName]: !expanded,
  });

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    <ul
      tabIndex={0}
      // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role='listbox'
      id={`${id}-listbox`}
      aria-expanded={expanded}
      aria-activedescendant={
        currentValue === '' ? undefined : `${id}-option-${currentValue}`
      }
      className={className}
    >
      {values.map(
        (
          { value, label }: Readonly<CountryOption<Flags>>,
          index: number
        ): JSX.Element => {
          return (
            <Option
              id={`${id}-option-${value}`}
              key={value}
              active={active === index}
              selected={value === currentValue}
              value={value}
              label={label}
              itemClassName={itemClassName}
              flagClassName={flagClassName}
              spanOptionClassName={spanOptionClassName}
              onSelect={onSelect}
            />
          );
        }
      )}
    </ul>
  );
}

export const ListBox: ComponentType<Props> = memo<Props>(F_ListBox);
