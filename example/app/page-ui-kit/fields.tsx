/* eslint-disable i18next/no-literal-string */
import { memo, useRef, type JSX, type ComponentType } from 'react';
import { ClientOnly } from 'remix-utils/client-only';

import { routes } from 'app/routes.ts';

import { LinkIntl } from 'library/intl/link.tsx';

import { useCapsLock } from 'utils/use-caps-lock.ts';

import { Hint } from 'components/page-ui-kit/fields/password-hint.tsx';
import { InputEmail } from 'components/page-ui-kit/fields/input-email.tsx';
import { InputPhone } from 'components/page-ui-kit/fields/input-phone.tsx';
import { InputPassword } from 'components/page-ui-kit/fields/input-password.tsx';
import { CheckboxAgree } from 'components/page-ui-kit/fields/checkbox-agree.tsx';
import { InputLastName } from 'components/page-ui-kit/fields/input-last-name.tsx';
import { SelectSubject } from 'components/page-ui-kit//fields/select-subject.tsx';
import { SelectTimezone } from 'components/page-ui-kit/fields/select-timezone.tsx';
import { InputFirstName } from 'components/page-ui-kit/fields/input-first-name.tsx';
import { ComboboxCountry } from 'components/page-ui-kit/fields/combobox-country.tsx';
import { TextareaMessage } from 'components/page-ui-kit//fields/textarea-message.tsx';
import { InputPasswordConfirm } from 'components/page-ui-kit/fields/input-password-confirm.tsx';

import type { IntlMessageId } from 'const/intl/index.ts';
import type { SelectOptionIntl } from 'library/types.ts';

import {
  form,
  hint,
  text,
  email,
  phone,
  select,
  country,
  section,
  password,
  checkBox,
  messages,
  textarea,
  timezone,
  divClassName,
  inputClassName,
  validClassName,
  hiddenClassName,
  selectClassName,
  invalidClassName,
  inputTouchedClassName,
  inputUnTouchedClassName,
  // descriptionClassName,
} from 'styles/styles.ts';

type TranslationComponents = {
  terms: JSX.Element;
  privacy: JSX.Element;
};

const components: TranslationComponents = {
  terms: (
    <LinkIntl to={routes.terms} className={textarea.textUnderlineClassName} />
  ),
  privacy: (
    <LinkIntl to={routes.privacy} className={textarea.textUnderlineClassName} />
  ),
} as const;

export type UiKitFormContext = {
  email: {
    label: IntlMessageId;
    placeholder: IntlMessageId;
    validationError: IntlMessageId;
  };
  firstName: {
    label: IntlMessageId;
    placeholder: IntlMessageId;
    validationError: IntlMessageId;
  };
  lastName: {
    label: IntlMessageId;
    placeholder: IntlMessageId;
    validationError: IntlMessageId;
  };
  country: {
    label: IntlMessageId;
    placeholder: IntlMessageId;
    validationError: IntlMessageId;
  };
  phone: {
    label: IntlMessageId;
    validationError: IntlMessageId;
    searchLabel: IntlMessageId;
    searchPlaceholder: IntlMessageId;
  };
  password: {
    label: IntlMessageId;
    placeholder: IntlMessageId;
    validationError: IntlMessageId;
  };
  passwordConfirm: {
    label: IntlMessageId;
    placeholder: IntlMessageId;
    validationError: IntlMessageId;
  };
  agreement: {
    label: IntlMessageId;
    validationError: IntlMessageId;
  };
  subject: {
    label: IntlMessageId;
    // description: IntlMessageId
    // placeholder: IntlMessageId
    validationError: IntlMessageId;
    options: ReadonlyArray<SelectOptionIntl<IntlMessageId>>;
  };
  message: {
    label: IntlMessageId;
    // description: IntlMessageId
    placeholder: IntlMessageId;
    // validationError: IntlMessageId
  };
  hint: {
    passwordHint: IntlMessageId;
    passwordDigitHint: IntlMessageId;
    passwordLengthHint: IntlMessageId;
    passwordCapitalHint: IntlMessageId;
    passwordStrengthHint: IntlMessageId;
    passwordCapsLockHint: IntlMessageId;
    passwordLowercaseHint: IntlMessageId;
    passwordsNotEqualHint: IntlMessageId;
    countryNotSelectedHint: IntlMessageId;
    passwordSpecialCharacterHint: IntlMessageId;
  };
  datePicker: {
    title: IntlMessageId;
    label: IntlMessageId;
    // placeholder: IntlMessageId
    // validationError: IntlMessageId
  };
  datePickerTimePicker: {
    title: IntlMessageId;
    label: IntlMessageId;
    amPmLabel: IntlMessageId;
    hoursLabel: IntlMessageId;
    minutesLabel: IntlMessageId;
    hoursFormatLabel: IntlMessageId;
    datePickerTimePickerLabel: IntlMessageId;
    // placeholder: IntlMessageId
    // validationError: IntlMessageId
  };
  rangePicker: {
    title: IntlMessageId;
    label: IntlMessageId;
    // placeholder: IntlMessageId
    // validationError: IntlMessageId
  };
  rangePickerTimePicker: {
    title: IntlMessageId;
    label: IntlMessageId;
    amPmLabel: IntlMessageId;
    hoursLabel: IntlMessageId;
    minutesLabel: IntlMessageId;
    hoursFormatLabel: IntlMessageId;
    rangePickerTimePickerLabel: IntlMessageId;
    rangePickerTimePickerTitle: IntlMessageId;
    // placeholder: IntlMessageId
    // validationError: IntlMessageId
  };
  timezone: {
    label: IntlMessageId;
    // description: IntlMessageId
    // placeholder: IntlMessageId
    // validationError: IntlMessageId
  };
};

type Props = {
  fieldsPageContext: UiKitFormContext;
};

function F_Fields({ fieldsPageContext }: Props): JSX.Element {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);
  const countryRef = useRef<HTMLInputElement | null>(null);
  const inputSubjectRef = useRef<HTMLInputElement | null>(null);
  const inputMessageRef = useRef<HTMLTextAreaElement | null>(null);
  const inputAgreeRef = useRef<HTMLInputElement | null>(null);
  const selectSubjectRef = useRef<HTMLSelectElement | null>(null);
  const selectTimezoneRef = useRef<HTMLSelectElement | null>(null);

  const [capsLock, onKeyEvent] = useCapsLock();

  return (
    <div className={section.pageWithFormClassName}>
      <div className={section.topSectionClassName}>
        <h3 className={text.h3ClassName}>Fields</h3>

        <hr className={section.horizontalDividerClassName} />
      </div>

      <div className={section.sectionClassName}>
        <div className={form.form}>
          <InputFirstName
            inputRef={firstNameRef}
            nextInputRef={lastNameRef}
            divClassName={divClassName}
            errorClassName={messages.errorClassName}
            inputClassName={inputClassName}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            // descriptionClassName={text.descriptionClassName}
            inputTouchedClassName={inputTouchedClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            label={fieldsPageContext.firstName.label}
            // description={fieldsPageContext.firstName.description}
            placeholder={fieldsPageContext.firstName.placeholder}
            errorMessage={fieldsPageContext.firstName.validationError}
          />

          <InputLastName
            inputRef={lastNameRef}
            nextInputRef={emailRef}
            divClassName={divClassName}
            errorClassName={messages.errorClassName}
            inputClassName={inputClassName}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            // descriptionClassName={text.descriptionClassName}
            inputTouchedClassName={inputTouchedClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            label={fieldsPageContext.lastName.label}
            // description={fieldsPageContext.lastName.description}
            placeholder={fieldsPageContext.lastName.placeholder}
            errorMessage={fieldsPageContext.lastName.validationError}
          />

          <InputEmail
            inputRef={emailRef}
            nextInputRef={countryRef}
            inputClassName={inputClassName}
            errorClassName={messages.errorClassName}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            fieldsetClassName={email.fieldsetClassName}
            // descriptionClassName={text.descriptionClassName}
            inputTouchedClassName={inputTouchedClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            label={fieldsPageContext.email.label}
            // description={fieldsPageContext.email.description}
            placeholder={fieldsPageContext.email.placeholder}
            errorMessage={fieldsPageContext.email.validationError}
          />

          <ComboboxCountry
            inputRef={countryRef}
            nextInputRef={phoneRef}
            errorClassName={messages.errorClassName}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            listClassName={country.listClassName}
            itemClassName={country.itemClassName}
            inputClassName={country.inputClassName}
            // descriptionClassName={text.descriptionClassName}
            fieldsetClassName={country.fieldsetClassName}
            flagClassName={country.flagClassName}
            optionFlagClassName={country.optionFlagClassName}
            spanOptionClassName={country.spanOptionClassName}
            inputSelectedClassName={country.inputSelectedClassName}
            inputUnselectedClassName={country.inputUnselectedClassName}
            label={fieldsPageContext.country.label}
            // description={fieldsPageContext.country.description}
            placeholder={fieldsPageContext.country.placeholder}
            errorMessage={fieldsPageContext.country.validationError}
          />

          <InputPhone
            inputRef={phoneRef}
            nextInputRef={passwordRef}
            validClassname={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            flagClassName={country.flagClassName}
            inputClassName={phone.inputClassName}
            buttonClassName={phone.buttonClassName}
            searchClassName={phone.searchClassName}
            errorClassName={messages.errorClassName}
            listBoxClassName={phone.listBoxClassName}
            fieldsetClassName={phone.fieldsetClassName}
            containerClassName={phone.containerClassName}
            inputTouchedClassName={inputTouchedClassName}
            searchIconClassName={phone.searchIconClassName}
            listboxItemClassName={phone.listboxItemClassName}
            searchLabelClassName={phone.searchLabelClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            listContainerClassName={phone.listContainerClassName}
            dropdownButtonClassName={phone.dropdownButtonClassName}
            listboxDividerClassName={phone.listboxDividerClassName}
            listboxItemIconClassName={phone.listboxItemIconClassName}
            listboxItemDescClassName={phone.listboxItemDescClassName}
            searchContainerClassName={phone.searchContainerClassName}
            listboxItemNameClassName={phone.listboxItemNameClassName}
            noEntriesMessageClassName={phone.noEntriesMessageClassName}
            dropdownButtonIconClassName={phone.dropdownButtonIconClassName}
            label={fieldsPageContext.phone.label}
            errorMessage={fieldsPageContext.phone.validationError}
            searchInputLabel={fieldsPageContext.phone.searchLabel}
            searchPlaceholder={fieldsPageContext.phone.searchPlaceholder}
          />

          <InputPassword
            onKeyUp={onKeyEvent}
            inputRef={passwordRef}
            errorClassName={messages.errorClassName}
            inputClassName={inputClassName}
            validClassName={validClassName}
            nextInputRef={passwordConfirmRef}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            inputTouchedClassName={inputTouchedClassName}
            fieldsetClassName={password.fieldsetClassName}
            inputIconClassName={password.inputIconClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            inputIconButtonClassName={password.inputIconButtonClassName}
            label={fieldsPageContext.password.label}
            placeholder={fieldsPageContext.password.placeholder}
            errorMessage={fieldsPageContext.password.validationError}
          />

          <Hint
            capsLock={capsLock}
            divClassName={hint.divClassName}
            listClassName={hint.listClassName}
            itemClassName={hint.itemClassName}
            itemIconClassName={hint.itemIconClassName}
            passwordHint={fieldsPageContext.hint.passwordHint}
            itemIconCheckClassName={hint.itemIconCheckClassName}
            itemIconUncheckClassName={hint.itemIconUncheckClassName}
            passwordDigitHint={fieldsPageContext.hint.passwordDigitHint}
            passwordLengthHint={fieldsPageContext.hint.passwordLengthHint}
            passwordCapitalHint={fieldsPageContext.hint.passwordCapitalHint}
            passwordCapsLockHint={fieldsPageContext.hint.passwordCapsLockHint}
            passwordLowercaseHint={fieldsPageContext.hint.passwordLowercaseHint}
            passwordSpecialCharacterHint={
              fieldsPageContext.hint.passwordSpecialCharacterHint
            }
          />

          <InputPasswordConfirm
            onKeyUp={onKeyEvent}
            inputRef={passwordConfirmRef}
            nextInputRef={inputSubjectRef}
            errorClassName={messages.errorClassName}
            inputClassName={inputClassName}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            inputTouchedClassName={inputTouchedClassName}
            fieldsetClassName={password.fieldsetClassName}
            inputIconClassName={password.inputIconClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            label={fieldsPageContext.passwordConfirm.label}
            placeholder={fieldsPageContext.passwordConfirm.placeholder}
            inputIconButtonClassName={password.inputIconButtonClassName}
            errorMessage={fieldsPageContext.passwordConfirm.validationError}
          />

          <ClientOnly fallback={null}>
            {(): JSX.Element => {
              return (
                <SelectSubject
                  inputRef={inputSubjectRef}
                  selectRef={selectSubjectRef}
                  nextInputRef={inputMessageRef}
                  errorClassName={messages.errorClassName}
                  validClassName={validClassName}
                  selectClassName={selectClassName}
                  hiddenClassName={hiddenClassName}
                  invalidClassName={invalidClassName}
                  labelClassName={text.labelClassName}
                  divClassName={select.divClassName}
                  listClassName={select.listClassName}
                  inputTouchedClassName={inputTouchedClassName}
                  optionClassName={select.optionClassName}
                  selectDivClassName={select.selectDivClassName}
                  readonlyInputClassName={select.readonlyInputClassName}
                  inputUnTouchedClassName={select.inputUnTouchedClassName}
                  selectButtonIconClassName={select.selectButtonIconClassName}
                  label={fieldsPageContext.subject.label}
                  options={fieldsPageContext.subject.options}
                  errorMessage={fieldsPageContext.subject.validationError}
                />
              );
            }}
          </ClientOnly>

          <TextareaMessage
            inputRef={inputMessageRef}
            nextInputRef={inputAgreeRef}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            // errorClassName={messages.errorClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            fieldsetClassName={textarea.fieldsetClassName}
            textareaClassName={textarea.textareaClassName}
            textareaTouchedClassName={inputTouchedClassName}
            textareaUnTouchedClassName={inputUnTouchedClassName}
            // descriptionClassName={textarea.descriptionClassName}
            label={fieldsPageContext.message.label}
            placeholder={fieldsPageContext.message.placeholder}
            // description={fieldsPageContext.message.description}
            // errorMessage={fieldsPageContext.message.validationError}
          />

          <CheckboxAgree<TranslationComponents>
            components={components}
            inputRef={inputAgreeRef}
            validClassName={validClassName}
            hiddenClassName={hiddenClassName}
            invalidClassName={invalidClassName}
            labelClassName={text.labelClassName}
            inputClassName={checkBox.inputClassName}
            checkerClassName={checkBox.checkerClassName}
            inputTouchedClassName={inputTouchedClassName}
            checkBoxClassName={checkBox.checkBoxClassName}
            fieldsetClassName={checkBox.fieldsetClassName}
            checkMarkClassName={checkBox.checkMarkClassName}
            inputUnTouchedClassName={inputUnTouchedClassName}
            // descriptionClassName={text.descriptionClassName}
            label={fieldsPageContext.agreement.label}
            // description={fieldsPageContext.agreement.description}
          />

          <ClientOnly fallback={null}>
            {(): JSX.Element => {
              return (
                <SelectTimezone
                  inputRef={inputSubjectRef}
                  selectRef={selectTimezoneRef}
                  nextInputRef={inputMessageRef}
                  errorClassName={messages.errorClassName}
                  validClassName={validClassName}
                  selectClassName={selectClassName}
                  hiddenClassName={hiddenClassName}
                  invalidClassName={invalidClassName}
                  labelClassName={text.labelClassName}
                  divClassName={timezone.divClassName}
                  listClassName={timezone.listClassName}
                  inputTouchedClassName={inputTouchedClassName}
                  optionClassName={timezone.optionClassName}
                  selectDivClassName={timezone.selectDivClassName}
                  readonlyInputClassName={timezone.readonlyInputClassName}
                  inputUnTouchedClassName={timezone.inputUnTouchedClassName}
                  selectButtonIconClassName={timezone.selectButtonIconClassName}
                  label={fieldsPageContext.timezone.label}
                  errorMessage={fieldsPageContext.subject.validationError}
                  // options={fieldsPageContext.subject.options}
                />
              );
            }}
          </ClientOnly>
        </div>
      </div>
    </div>
  );
}

export const Fields: ComponentType<Props> = memo<Props>(F_Fields);
