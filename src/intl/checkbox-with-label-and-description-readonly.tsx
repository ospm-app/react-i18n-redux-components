import type { JSX, RefObject } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { reactMemo } from 'utils/react-memo.ts';

import { CheckCircleIcon } from 'svg/check-circle.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';

type Props<
  TranslationComponents extends Record<string, JSX.Element> | undefined,
> = {
  id: string;
  name: string;
  value: boolean;
  inputClassName: string;
  labelClassName: string;
  hiddenClassName: string;
  checkerClassName: string;
  fieldsetClassName: string;
  checkBoxClassName: string;
  checkMarkClassName: string;
  dataTestId?: string | undefined;
  label?: IntlMessageId | undefined;
  description?: IntlMessageId | undefined;
  descriptionClassName?: string | undefined;
  components?: TranslationComponents | undefined;
  inputRef?: RefObject<HTMLInputElement> | undefined;
};

function F_CheckboxWithLabelAdnDescriptionReadonly<
  TranslationComponents extends Record<string, JSX.Element> | undefined,
>({
  id,
  name,
  value,
  label,
  inputRef,
  components,
  description,
  inputClassName,
  labelClassName,
  hiddenClassName,
  checkerClassName,
  fieldsetClassName,
  checkBoxClassName,
  checkMarkClassName,
  descriptionClassName = hiddenClassName,
  dataTestId = '',
}: Props<TranslationComponents>): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={fieldsetClassName}>
      <div className={checkBoxClassName}>
        <input
          id={id}
          name={name}
          ref={inputRef}
          type='checkbox'
          readOnly
          className={inputClassName}
          checked={value}
          onChange={undefined}
          data-testid={dataTestId}
        />
        <div className={checkerClassName}>
          {value ? (
            <div className={checkMarkClassName}>
              <CheckCircleIcon />
            </div>
          ) : null}
        </div>
      </div>

      <label htmlFor={id} className={labelClassName}>
        {typeof label === 'string' ? (
          typeof components === 'undefined' ? (
            t(label)
          ) : (
            <Trans<IntlMessageId> i18nKey={label} components={components} />
          )
        ) : null}
      </label>

      <p className={descriptionClassName}>
        {typeof description === 'undefined' ? null : t(description)}
      </p>
    </div>
  );
}

export const CheckboxWithLabelAdnDescriptionReadonly = reactMemo(
  F_CheckboxWithLabelAdnDescriptionReadonly
);
