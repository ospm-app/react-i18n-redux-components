import classnames from 'classnames';

import {
  main_logo_colors,
  main_icons_colors,
  text_default_colors,
  main_background_colors,
  select_text_default_colors,
  input_border_default_colors,
  select_background_hover_colors,
  select_background_default_colors,
} from 'styles/colors.ts';

import { button, flexCol, flexRow, text } from 'styles/styles.ts';

export const header = {
  header: classnames(
    main_background_colors,
    flexRow,
    'h-16 items-center p-4 xl:h-28 xl:p-8'
  ),
  inner: classnames(flexRow, 'w-full items-center justify-between gap-x-8'),
  brandLink: classnames('my-auto block w-[104px] md:w-[152px]'),
  brandLogo: classnames(main_logo_colors),
  mobileMenuIcon: classnames(text_default_colors, 'block size-5'),
  mobileMenuButton: classnames(
    text_default_colors,
    main_icons_colors,
    flexCol,
    'my-auto items-center text-xs xl:hidden'
  ),
  rightMenu: classnames(
    flexRow,
    'w-[400px] items-center justify-between gap-x-4 max-xl:hidden'
  ),
  leftMenu: classnames(flexRow, 'gap-x-8'),
  darkModeIcon: classnames(text_default_colors, 'h-4 w-8'),
  darkModeButton: classnames(
    text_default_colors,
    flexRow,
    'h-12 w-[102px] items-center justify-center gap-x-2'
  ),
  desktop: classnames('max-xl:hidden'),
  linkButtonsClassName: classnames(
    flexRow,
    'w-[169px] items-center justify-between gap-x-4'
  ),
  link: classnames(button.primaryButtonClassName),
  linkIcon: classnames('hidden'),
  desktopMenu: classnames(
    'max-xl:hidden xl:flex xl:flex-row xl:flex-wrap xl:justify-start xl:gap-x-4'
  ),
  desktopMenuLink: classnames(text_default_colors, 'px-2'),
} as const;

export const footer = {
  footer: classnames(main_background_colors, 'items-center px-4 py-8 xl:px-8'),
  inner: classnames(flexCol, 'justify-between gap-y-[52px]'),
  top: classnames(flexCol, 'gap-y-[52px]'),
  topRow: classnames('md:flex md:flex-row md:justify-between'),
  brandLink: classnames('block w-[104px] md:w-[152px]'),
  brandLogo: classnames(main_logo_colors),
  darkModeIcon: classnames(text_default_colors, 'h-4 w-8'),
  darkModeButton: classnames(
    text_default_colors,
    flexRow,
    'items-center justify-center gap-x-2 max-md:hidden'
  ),
  menu: classnames(
    flexCol,
    'gap-y-6 decoration-from-font md:flex-row md:flex-wrap md:gap-x-4'
  ),
  menuLink: classnames(text_default_colors),
  infoLinks: classnames(
    flexCol,
    'gap-y-6 underline decoration-from-font md:flex-1 md:flex-row md:justify-evenly'
  ),
  infoLink: classnames(text_default_colors),
  powered: classnames(text_default_colors, 'text-center'),
} as const;

export const languageDropDown = {
  list: classnames(
    input_border_default_colors,
    select_background_default_colors,
    select_text_default_colors,
    flexCol,
    'absolute top-12 box-border w-[160px] rounded-md border-2 border-solid'
  ),
  item: classnames(
    text.inputPlaceholderClassName,
    select_background_hover_colors,
    'indent-4'
  ),
  itemButton: classnames(''),
  itemButtonLabel: classnames(''),
  divClassName: classnames(flexCol, 'relative w-[100px] items-start'),
  toggleButton: classnames(
    button.secondaryButtonClassName,
    flexRow,
    'h-12 w-[100px] items-center justify-center gap-x-2'
  ),
  toggleButtonIcon: classnames('flex size-3 items-center justify-center'),
  toggleButtonLabel: classnames(''),
  toggleButtonArrowOpen: classnames('rotate-0 transition duration-100'),
  toggleButtonArrowClosed: classnames('rotate-180 transition duration-100'),
} as const;

export const mobileMenu = {
  menuContainerClassName: classnames(
    flexRow,
    'absolute inset-0 top-16 z-50 w-full xl:hidden'
    // might use -> 'h-screen max-xl:bottom-[320px] max-md:bottom-[742px]'
  ),
  overlayClassName: classnames(
    main_background_colors,
    'w-1/2 opacity-50 max-md:hidden'
  ),
  menuContentClassName: classnames(
    main_background_colors,
    flexCol,
    'w-1/2 justify-between p-6 pb-24 max-md:absolute max-md:inset-0 max-md:w-full'
  ),
  menuClassName: classnames(flexCol, 'gap-y-[22px]'),
  buttonsWrapperClassName: classnames(flexCol, 'gap-y-[22px]'),
  buttonClassName: classnames(flexRow, 'h-10 items-center gap-x-2'),
  buttonIconClassName: classnames('size-4', text.buttonTitleClassName),
  listClassName: classnames(flexCol, 'gap-y-[22px]'),
  menuItemClassName: classnames(text_default_colors),
  languageDropdownListClassName: classnames(
    input_border_default_colors,
    select_background_default_colors,
    select_text_default_colors,
    text.inputPlaceholderClassName,
    flexCol,
    'absolute top-12 box-border w-full rounded-md border-2 border-solid'
  ),

  languageDropdownDivClassName: classnames(
    flexCol,
    'relative w-full items-start'
  ),
  darkModeToggleButtonClassName: classnames(
    text_default_colors,
    flexRow,
    'w-full items-center justify-center gap-x-2'
  ),
  darkModeToggleIconClassName: classnames('h-4 w-8', text_default_colors),
} as const;

export const scrollToTop = {
  buttonWrapperClassName: classnames(
    'fixed bottom-4 right-4 flex h-10 w-12 items-center justify-center'
  ),
  buttonClassName: classnames(button.invisibleButtonClassName),
  iconClassName: classnames('w-5'),
} as const;

export const userBar = {
  sectionClassName: classnames(main_background_colors, flexCol, 'gap-y-4'),
  userLinkClassNames: classnames('h-6 w-full'),
} as const;

export const profileIncomplete = {
  sectionClassName: classnames(main_background_colors, flexRow, 'gap-x-5'),
  infoClassName: classnames(flexRow, 'items-center gap-x-3'),
  iconClassNames: classnames(text_default_colors, 'w-4'),
} as const;

export const offline = {
  // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
  divClassName: classnames(
    main_background_colors,
    text_default_colors,
    'absolute top-0 flex size-full items-center justify-center',
    'bg-opacity-80 dark:bg-opacity-80'
  ),
  wrapperClassName: classnames('flex flex-col gap-y-4'),
  iconClassName: classnames('w-40'),
  messageClassName: classnames(text.subheadClassName, 'text-center'),
};
