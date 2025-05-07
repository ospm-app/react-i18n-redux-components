/* eslint-disable i18next/no-literal-string */
import { memo, type ComponentType, type JSX } from 'react';

import { button, section, text, uiKitButtons } from 'styles/styles.ts';

function getError(): never {
  throw new Error('It is unavailable now');
}

function F_Buttons(): JSX.Element {
  return (
    <section className={uiKitButtons.sectionClassName}>
      <div className={section.topSectionClassName}>
        <h2 className={text.h3ClassName}>Buttons</h2>

        <hr className={section.horizontalDividerClassName} />
      </div>

      <div className={section.sectionClassName}>
        <button
          type='button'
          onClick={getError}
          className={button.primaryButtonClassName}
        >
          Button Primary
        </button>

        <button
          type='button'
          onClick={getError}
          className={button.secondaryButtonClassName}
        >
          Button Secondary
        </button>

        <button
          type='button'
          onClick={getError}
          className={button.dangerButtonClassName}
        >
          Button Danger
        </button>

        <button
          type='button'
          onClick={getError}
          className={button.invisibleButtonClassName}
        >
          Button Invisible
        </button>

        <button
          type='button'
          onClick={getError}
          className={button.alternativeButtonClassName}
        >
          Button Alternative
        </button>
      </div>
    </section>
  );
}

export const Buttons: ComponentType = memo(F_Buttons);
