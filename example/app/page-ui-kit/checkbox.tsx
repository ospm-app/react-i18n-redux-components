/* eslint-disable i18next/no-literal-string */
import { memo, type ComponentType, type JSX, useCallback, useId } from 'react';

import { CheckCircleIcon } from 'svg/check-circle.tsx';

import {
  text,
  section,
  checkBox,
  uiKitSectionClassName,
} from 'styles/styles.ts';

function F_Checkbox(): JSX.Element {
  const id1 = useId();
  const id2 = useId();

  const onChange1 = useCallback<() => void>(() => {}, []);
  const onChange2 = useCallback<() => void>(() => {}, []);

  return (
    <div className={uiKitSectionClassName}>
      <div className={section.topSectionClassName}>
        <h2 className={text.h3ClassName}>Checkbox</h2>
        <hr className={section.horizontalDividerClassName} />
        <p className={text.labelClassName}>Pressed / Disabled</p>
      </div>

      <div className={section.sectionClassName}>
        <div className={checkBox.checkBoxClassName}>
          <input
            id={id1}
            type='checkbox'
            checked
            onChange={onChange1}
            className={checkBox.inputClassName}
          />
          <div className={checkBox.checkerClassName}>
            <CheckCircleIcon />
          </div>
        </div>

        <div className={checkBox.checkBoxClassName}>
          <input
            id={id2}
            type='checkbox'
            className={checkBox.inputClassName}
            disabled
            onChange={onChange2}
          />

          <div className={checkBox.checkerClassName}>
            <CheckCircleIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export const Checkbox: ComponentType = memo(F_Checkbox);
