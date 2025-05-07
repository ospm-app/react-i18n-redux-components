import {
  memo,
  useId,
  type JSX,
  useCallback,
  type ComponentType,
  type MouseEventHandler,
} from 'react';
import classnames from 'classnames';
import { shallowEqual } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ClientOnly } from 'remix-utils/client-only';

import { toggleMobileMenu } from 'state/reducers/app.ts';

import { LinkIntl } from 'library/intl/link.tsx';

import { LinkSignUp } from 'layout/link-signup-mobile.tsx';
import { DarkModeToggle } from 'layout/dark-mode-toggle.tsx';
import { LinkProfile } from 'layout/link-profile-mobile.tsx';
import { ButtonLogout } from 'layout/button-logout-mobile.tsx';
import { LinkLogInMobile } from 'layout/link-login-mobile.tsx';

import { LanguageDropdown } from 'components/common/language.tsx';

import {
  useAppDispatch,
  useAppSelector,
  type ReduxState,
} from 'state/store.ts';

import type { Routes } from 'app/routes.ts';
import type { HeaderOption } from 'types/common.ts';
import type { IntlMessageId } from 'const/intl/index.ts';

import { languageDropDown, mobileMenu } from 'styles/layout.ts';
import { button, hiddenClassName } from 'styles/styles.ts';

type SelectorProps = {
  isLoggedIn: boolean;
  isMobileMenuOpen: boolean;
};

function selector(state: ReduxState): SelectorProps {
  return {
    isLoggedIn: state.profile.isLoggedIn,
    isMobileMenuOpen: state.app.isMobileMenuOpen,
  };
}

type Props = {
  darkModeLabel: IntlMessageId;
  langAriaLabel: IntlMessageId;
  loginLinkLabel: IntlMessageId;
  lightModeLabel: IntlMessageId;
  signupLinkLabel: IntlMessageId;
  profileLinkLabel: IntlMessageId;
  logOutButtonLabel: IntlMessageId;
  menu: ReadonlyArray<HeaderOption>;
};

function F_MobileMenu({
  menu,
  darkModeLabel,
  langAriaLabel,
  loginLinkLabel,
  lightModeLabel,
  signupLinkLabel,
  profileLinkLabel,
  logOutButtonLabel,
}: Props): JSX.Element {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const idLang = useId();

  const onClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(() => {
    dispatch(toggleMobileMenu());
  }, [dispatch]);

  const onSelect = useCallback<() => void>(() => {
    dispatch(toggleMobileMenu());
  }, [dispatch]);

  const { isLoggedIn, isMobileMenuOpen } = useAppSelector<SelectorProps>(
    selector,
    shallowEqual
  );

  return (
    <div
      aria-expanded={isMobileMenuOpen}
      className={classnames(mobileMenu.menuContainerClassName, {
        hidden: !isMobileMenuOpen,
        'md:flex': isMobileMenuOpen,
      })}
    >
      <div className={mobileMenu.overlayClassName} />

      <div className={mobileMenu.menuContentClassName}>
        <div className={mobileMenu.menuClassName}>
          {isLoggedIn ? (
            <div className={mobileMenu.buttonsWrapperClassName}>
              <LinkProfile
                onClick={onSelect}
                linkLabel={profileLinkLabel}
                linkClassName={classnames(
                  button.primaryButtonClassName,
                  mobileMenu.buttonClassName
                )}
                iconClassName={mobileMenu.buttonIconClassName}
              />

              <ButtonLogout
                onSelect={onSelect}
                buttonLabel={logOutButtonLabel}
                buttonClassName={classnames(
                  button.primaryButtonClassName,
                  mobileMenu.buttonClassName
                )}
                iconClassName={mobileMenu.buttonIconClassName}
              />
            </div>
          ) : (
            <div className={mobileMenu.buttonsWrapperClassName}>
              <LinkLogInMobile
                linkLabel={loginLinkLabel}
                linkClassName={classnames(
                  button.secondaryButtonClassName,
                  mobileMenu.buttonClassName
                )}
                iconClassName={mobileMenu.buttonIconClassName}
                onClick={onSelect}
              />

              <LinkSignUp
                linkLabel={signupLinkLabel}
                linkClassName={classnames(
                  button.primaryButtonClassName,
                  mobileMenu.buttonClassName
                )}
                iconClassName={mobileMenu.buttonIconClassName}
                onClick={onSelect}
              />
            </div>
          )}
          <div className={mobileMenu.listClassName}>
            {menu.map((option: HeaderOption): JSX.Element => {
              return (
                <LinkIntl
                  onClick={onClick}
                  key={option.label}
                  className={mobileMenu.menuItemClassName}
                  to={t(option.to) as Routes}
                >
                  {t(option.label)}
                </LinkIntl>
              );
            })}
          </div>
        </div>

        <div className={mobileMenu.menuClassName}>
          <ClientOnly fallback={null}>
            {(): JSX.Element => {
              return (
                <LanguageDropdown
                  id={idLang}
                  ariaLabel={langAriaLabel}
                  listClassName={mobileMenu.languageDropdownListClassName}
                  listItemClassName={languageDropDown.item}
                  divClassName={mobileMenu.languageDropdownDivClassName}
                  hiddenListClassName={hiddenClassName}
                  toggleButtonClassName={languageDropDown.toggleButton}
                  listItemButtonClassName={languageDropDown.itemButton}
                  toggleButtonIconClassName={languageDropDown.toggleButtonIcon}
                  toggleButtonLabelClassName={
                    languageDropDown.toggleButtonLabel
                  }
                  listItemButtonLabelClassName={
                    languageDropDown.itemButtonLabel
                  }
                  toggleButtonArrowClassNameOpen={
                    languageDropDown.toggleButtonArrowOpen
                  }
                  toggleButtonArrowClassNameClosed={
                    languageDropDown.toggleButtonArrowClosed
                  }
                />
              );
            }}
          </ClientOnly>
          <DarkModeToggle
            darkModeLabel={darkModeLabel}
            lightModeLabel={lightModeLabel}
            iconClassName={mobileMenu.darkModeToggleIconClassName}
            buttonClassName={mobileMenu.darkModeToggleButtonClassName}
          />
        </div>
      </div>
    </div>
  );
}

export const MobileMenu: ComponentType<Props> = memo<Props>(F_MobileMenu);
