/* eslint-disable i18next/no-literal-string */
import { memo, type ComponentType, type JSX } from 'react';
import classnames from 'classnames';

import {
  text,
  section,
  uiKitColors,
  uiKitSectionClassName,
} from 'styles/styles.ts';

type ColorType = {
  name: string;
  color: string;
  twColor: string;
  textColor: string;
};

// const primaryColors: ColorType[] = [
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
// ]

// const secondaryColors: ColorType[] = [
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
// ]

// const focusAndInputColors: ColorType[] = [
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
//   {
//     name: '',
//     color: '',
//     twColor: classnames(''),
//     textColor: classnames(''),
//   },
// ]

const neutralColors: Array<ColorType> = [
  {
    name: '',
    color: '',
    twColor: classnames(''),
    textColor: classnames(''),
  },
  {
    name: '',
    color: '',
    twColor: classnames(''),
    textColor: classnames(''),
  },
  {
    name: '',
    color: '',
    twColor: classnames(''),
    textColor: classnames(''),
  },
];

function F_ColorItem({
  name,
  color,
  twColor,
  textColor,
}: ColorType): JSX.Element {
  return (
    <div>
      <div
        className={classnames(
          uiKitColors.colorItemWFullWrapperClassName,
          twColor
        )}
      >
        <div
          className={classnames(
            uiKitColors.colorItemFlexRowWrapperClassName,
            textColor
          )}
        >
          <p className={uiKitColors.colorItemParagraphClassName}>#{color}</p>
          <p className={uiKitColors.colorItemParagraphClassName}>{name}</p>
        </div>
      </div>
    </div>
  );
}

const ColorItem: ComponentType<ColorType> = memo<ColorType>(F_ColorItem);

function F_ColorList({ colors }: { colors: Array<ColorType> }): JSX.Element {
  return (
    <div className={uiKitColors.colorListWrapperClassName}>
      {colors.map(({ name, color, twColor, textColor }) => (
        <ColorItem
          key={name}
          name={name}
          color={color}
          twColor={twColor}
          textColor={textColor}
        />
      ))}
    </div>
  );
}

const ColorList: ComponentType<{ colors: Array<ColorType> }> = memo<{
  colors: Array<ColorType>;
}>(F_ColorList);

function F_Colors(): JSX.Element {
  return (
    <div className={uiKitSectionClassName}>
      <div className={section.topSectionClassName}>
        <h3 className={text.h3ClassName}>Color pallet</h3>

        <hr className={section.horizontalDividerClassName} />
      </div>

      <div className={uiKitColors.colorsFlexWrapperClassName}>
        <div className={uiKitColors.colorsH3LabelClassName}>
          <h3 className={text.labelClassName}>Primary</h3>

          {/* <ColorList colors={primaryColors} /> */}
        </div>

        <div className={uiKitColors.colorsH3LabelClassName}>
          <h3 className={text.labelClassName}>Secondary</h3>

          {/* <ColorList colors={secondaryColors} /> */}
        </div>

        <div className={uiKitColors.colorsH3LabelClassName}>
          <h3 className={text.labelClassName}>Focuses and inputs</h3>

          {/* <ColorList colors={focusAndInputColors} /> */}
        </div>

        <div className={uiKitColors.colorsH3LabelClassName}>
          <h3 className={text.labelClassName}>Neutrals</h3>

          <ColorList colors={neutralColors} />
        </div>
      </div>
    </div>
  );
}

export const Colors: ComponentType = memo(F_Colors);
