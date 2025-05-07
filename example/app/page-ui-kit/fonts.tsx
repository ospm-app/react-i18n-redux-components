/* eslint-disable i18next/no-literal-string */
import { memo, type JSX, type ComponentType } from 'react';

import classnames from 'classnames';

import { uiKitFonts, text, section } from 'styles/styles.ts';

const SAMPLE = 'Sample';

function F_FontsRows(): JSX.Element {
  return (
    <>
      <div className={uiKitFonts.fontsRowsFor16ContainerClassName}>
        <p>16</p>
        <p>{SAMPLE}</p>
        <p>24</p>
      </div>

      <div className={uiKitFonts.fontsRowsForH3ContainerClassName}>
        <p>18</p>
        <p>{SAMPLE}</p>
        <p>26</p>
      </div>

      <div className={uiKitFonts.fontsRowsForH2ContainerClassName}>
        <p>24</p>
        <p>{SAMPLE}</p>
        <p>32</p>
      </div>

      <div className={uiKitFonts.fontRowsForH1ContainerClassName}>
        <p>30</p>
        <p>{SAMPLE}</p>
        <p>40</p>
      </div>
    </>
  );
}

const FontsRows: ComponentType = memo(F_FontsRows);

function F_Fonts(): JSX.Element {
  return (
    <div className={uiKitFonts.fontsWrapperClassName}>
      <div className={section.topSectionClassName}>
        <h2 className={text.h3ClassName}>Fonts</h2>
        <hr className={section.horizontalDividerClassName} />
      </div>

      <div className={uiKitFonts.fontsBaseClassName}>
        <h3 className={uiKitFonts.fontsBaseLabelClassName}>400</h3>
        <FontsRows />
      </div>

      <div className={uiKitFonts.fontsBoldClassName}>
        <h3 className={uiKitFonts.fontsBoldLabelClassName}>700</h3>
        <FontsRows />
      </div>

      <div className={uiKitFonts.fontsHeavyClassName}>
        <h3 className={uiKitFonts.fontsHeavyLabelClassName}>900</h3>
        <FontsRows />
      </div>

      <div className={uiKitFonts.columnClassName}>
        <h3 className={uiKitFonts.textH1ClassName}>320</h3>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>h1</p>

          <p
            className={classnames(
              uiKitFonts.textH1ClassName,
              uiKitFonts.fontsHeavyClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Title name
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>h1 a</p>

          <p
            className={classnames(
              uiKitFonts.textH1ClassName,
              uiKitFonts.fontsHeavyClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Title <u>name</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>Subtitle1</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Subtitle text
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>p1</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early Middle Japanese pangram poem, composed before 1079 in the
            Heian period
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>p1 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early Middle Japanese pangram poem, composed{' '}
            <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>em1</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early <b>Middle Japanese</b> pangram poem, composed{' '}
            <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>em1 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early{' '}
            <u>
              <b>Middle Japanese</b>
            </u>{' '}
            pangram poem, composed <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>h2</p>

          <p
            className={classnames(
              uiKitFonts.textH2ClassName,
              uiKitFonts.fontsHeavyClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Title name
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>h2 a</p>

          <p
            className={classnames(
              uiKitFonts.textH2ClassName,
              uiKitFonts.fontsHeavyClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Title <u>name</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>Subtitle2</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Subtitle text
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>p2</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early Middle Japanese pangram poem, composed before 1079 in the
            Heian period
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>p2 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early Middle Japanese pangram poem, composed{' '}
            <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>em2</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early <b>Middle Japanese</b> pangram poem, composed{' '}
            <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>em2 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early{' '}
            <u>
              <b>Middle Japanese</b>
            </u>{' '}
            pangram poem, composed <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>h3</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontsHeavyClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Title name
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>h3 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontsHeavyClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Title <u>name</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>Subtitle3</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Subtitle text
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>p3</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early Middle Japanese pangram poem, composed before 1079 in the
            Heian period
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>p3 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early Middle Japanese pangram poem, composed{' '}
            <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>em3</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early <b>Middle Japanese</b> pangram poem, composed{' '}
            <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>em3 a</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Early{' '}
            <u>
              <b>Middle Japanese</b>
            </u>{' '}
            pangram poem, composed <u>before 1079 in the Heian period</u>
          </p>
        </div>

        <div className={uiKitFonts.rowClassName}>
          <p className={uiKitFonts.textH1ClassName}>Input</p>

          <p
            className={classnames(
              uiKitFonts.textH3ClassName,
              uiKitFonts.fontParagraphClassName
            )}
          >
            Input name
          </p>
        </div>
      </div>
    </div>
  );
}

export const Fonts: ComponentType = memo(F_Fonts);
