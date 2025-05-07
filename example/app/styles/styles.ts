import classnames from 'classnames';

import {
  breadcrumbs_divider_colors,
  button_alternative_background_default_colors,
  button_alternative_background_disabled_colors,
  button_alternative_background_focus_colors,
  button_alternative_background_hover_colors,
  // button_alternative_background_inactive_colors,
  button_alternative_background_pressed_colors,
  button_alternative_border_default_colors,
  button_alternative_border_disabled_colors,
  button_alternative_border_focus_colors,
  button_alternative_border_hover_colors,
  button_alternative_border_pressed_colors,
  button_alternative_icon_default_colors,
  button_alternative_icon_disabled_colors,
  button_alternative_icon_focus_colors,
  button_alternative_icon_hover_colors,
  // button_alternative_icon_inactive_colors,
  button_alternative_icon_pressed_colors,
  button_alternative_text_default_colors,
  button_alternative_text_disabled_colors,
  button_alternative_text_focus_colors,
  button_alternative_text_hover_colors,
  // button_alternative_text_inactive_colors,
  button_alternative_text_pressed_colors,
  button_danger_background_default_colors,
  button_danger_background_disabled_colors,
  button_danger_background_focus_colors,
  button_danger_background_hover_colors,
  // button_danger_background_inactive_colors,
  button_danger_background_pressed_colors,
  button_danger_border_default_colors,
  button_danger_border_disabled_colors,
  button_danger_border_focus_colors,
  button_danger_border_hover_colors,
  button_danger_border_pressed_colors,
  button_danger_icon_default_colors,
  button_danger_icon_disabled_colors,
  button_danger_icon_focus_colors,
  button_danger_icon_hover_colors,
  // button_danger_icon_inactive_colors,
  button_danger_icon_pressed_colors,
  button_danger_text_default_colors,
  button_danger_text_disabled_colors,
  button_danger_text_focus_colors,
  button_danger_text_hover_colors,
  // button_danger_text_inactive_colors,
  button_danger_text_pressed_colors,
  button_invisible_background_default_colors,
  button_invisible_background_disabled_colors,
  button_invisible_background_focus_colors,
  button_invisible_background_hover_colors,
  // button_invisible_background_inactive_colors,
  button_invisible_background_pressed_colors,
  button_invisible_border_default_colors,
  button_invisible_border_disabled_colors,
  button_invisible_border_focus_colors,
  button_invisible_border_hover_colors,
  button_invisible_border_pressed_colors,
  button_invisible_icon_default_colors,
  button_invisible_icon_disabled_colors,
  button_invisible_icon_focus_colors,
  button_invisible_icon_hover_colors,
  // button_invisible_icon_inactive_colors,
  button_invisible_icon_pressed_colors,
  button_invisible_text_default_colors,
  button_invisible_text_disabled_colors,
  button_invisible_text_focus_colors,
  button_invisible_text_hover_colors,
  // button_invisible_text_inactive_colors,
  button_invisible_text_pressed_colors,
  button_primary_background_default_colors,
  button_primary_background_disabled_colors,
  button_primary_background_focus_colors,
  button_primary_background_hover_colors,
  button_primary_background_pressed_colors,
  button_primary_border_default_colors,
  button_primary_border_disabled_colors,
  button_primary_border_focus_colors,
  button_primary_border_hover_colors,
  button_primary_border_pressed_colors,
  button_primary_icon_default_colors,
  button_primary_icon_disabled_colors,
  button_primary_icon_focus_colors,
  button_primary_icon_hover_colors,
  button_primary_icon_pressed_colors,
  button_primary_text_default_colors,
  button_primary_text_disabled_colors,
  button_primary_text_focus_colors,
  button_primary_text_hover_colors,
  button_primary_text_pressed_colors,
  button_secondary_background_default_colors,
  button_secondary_background_disabled_colors,
  button_secondary_background_focus_colors,
  button_secondary_background_hover_colors,
  // button_secondary_background_inactive_colors,
  button_secondary_background_pressed_colors,
  button_secondary_border_default_colors,
  button_secondary_border_disabled_colors,
  button_secondary_border_focus_colors,
  button_secondary_border_hover_colors,
  button_secondary_border_pressed_colors,
  button_secondary_icon_default_colors,
  button_secondary_icon_disabled_colors,
  button_secondary_icon_focus_colors,
  button_secondary_icon_hover_colors,
  // button_secondary_icon_inactive_colors,
  button_secondary_icon_pressed_colors,
  button_secondary_text_default_colors,
  button_secondary_text_disabled_colors,
  button_secondary_text_focus_colors,
  button_secondary_text_hover_colors,
  // button_secondary_text_inactive_colors,
  button_secondary_text_pressed_colors,
  calendar_label_color,
  calendar_option_light,
  checkbox_background_checked_colors,
  checkbox_background_default_colors,
  checkbox_border_default_colors,
  checkbox_border_focus_colors,
  checkbox_icon_checked_colors,
  date_picker_background,
  date_picker_border,
  date_picker_days_color,
  date_picker_header_items_color,
  datepicker_weeks_months_color,
  datepicker_current_date_border_color,
  input_background_default_colors,
  input_background_disabled_colors,
  input_background_readonly_colors,
  input_border_default_colors,
  input_border_disabled_colors,
  input_border_focus_colors,
  input_border_hover_colors,
  input_border_invalid_colors,
  input_border_valid_colors,
  input_icon_default_colors,
  input_icon_disabled_colors,
  input_icon_focus_colors,
  input_icon_hover_colors,
  input_icon_invalid_colors,
  input_icon_pressed_colors,
  input_icon_valid_colors,
  input_message_invalid_colors,
  input_message_valid_colors,
  input_placeholder_default_colors,
  input_placeholder_disabled_colors,
  input_placeholder_hover_colors,
  input_placeholder_readonly_colors,
  link_text_accent_green_colors,
  main_background_colors,
  main_widget_border_colors,
  main_widget_surface_colors,
  select_background_default_colors,
  select_background_hover_colors,
  select_text_default_colors,
  text_default_colors,
  text_label_colors,
  text_lines_of_subtitle_colors,
  text_subtitle_colors,
  text_title_colors,
  main_icons_colors,
} from 'styles/colors.ts';

export const flexRow = classnames('flex flex-row');
export const flexCol = classnames('flex flex-col');

export const htmlClassName = classnames('h-full');

export const bodyClassName = classnames(
  flexCol,
  'relative min-h-full text-base font-base antialiased'
);

export const text = {
  h1ClassName: classnames(
    text_title_colors,
    'text-2xl/9 font-bold md:text-[28px]/[42px] lg:text-[32px]/[48px]'
  ),
  h2ClassName: classnames(
    text_subtitle_colors,
    'text-xl/8 font-bold md:text-2xl/9 lg:text-[28px]/[42px]'
  ),
  h3ClassName: classnames(
    text_subtitle_colors,
    'text-lg font-bold md:text-xl/8 lg:text-2xl/9'
  ),
  subheadClassName: classnames(
    text_subtitle_colors,
    'text-base font-bold md:text-lg lg:text-xl/8'
  ),
  buttonTitleClassName: classnames(
    // text_lines_of_subtitle_colors,
    'text-sm/[40px] font-bold'
  ),
  linkClassName: classnames(
    link_text_accent_green_colors,
    'text-sm md:text-base/5 lg:text-lg/5'
  ),
  subtitleClassName: classnames(text_subtitle_colors, 'text-lg/[30px]'),
  paragraphLargeClassName: classnames(
    text_lines_of_subtitle_colors,
    'text-base md:text-lg lg:text-xl/8'
  ),
  paragraphMediumClassName: classnames(
    text_lines_of_subtitle_colors,
    'text-sm md:text-base lg:text-lg'
  ),
  paragraphSmallClassName: classnames(
    text_lines_of_subtitle_colors,
    'text-xs/[18px] md:text-sm lg:text-base'
  ),
  labelClassName: classnames(text_label_colors, 'text-sm font-bold'),
  descriptionClassName: classnames(
    text_default_colors,
    'h-6 align-middle text-xs leading-6'
  ),
  inputPlaceholderClassName: classnames(
    'text-sm/10 text-light-input_placeholder_default hover:text-light-input_placeholder_hover dark:text-dark-input_placeholder_default hover:dark:text-dark-input_placeholder_hover'
  ),
  h3GreenClassName: classnames(
    link_text_accent_green_colors,
    'text-lg font-bold md:text-xl/8 lg:text-2xl/9'
  ),
};

export const buttonClassName = classnames(
  flexRow,
  'box-border h-[40px] w-full items-center justify-center gap-x-1 rounded-md border border-solid hover:border-2 focus:border-2'
);

export const button = {
  primaryButtonClassName: classnames(
    buttonClassName,
    text.buttonTitleClassName,
    button_primary_background_default_colors,
    button_primary_background_disabled_colors,
    button_primary_background_focus_colors,
    button_primary_background_pressed_colors,
    button_primary_background_hover_colors,
    button_primary_border_default_colors,
    button_primary_border_disabled_colors,
    button_primary_border_focus_colors,
    button_primary_border_pressed_colors,
    button_primary_border_hover_colors,
    button_primary_text_default_colors,
    button_primary_text_disabled_colors,
    button_primary_text_focus_colors,
    button_primary_text_pressed_colors,
    button_primary_text_hover_colors,
    button_primary_icon_default_colors,
    button_primary_icon_disabled_colors,
    button_primary_icon_focus_colors,
    button_primary_icon_pressed_colors,
    button_primary_icon_hover_colors
  ),

  secondaryButtonClassName: classnames(
    buttonClassName,
    text.buttonTitleClassName,
    button_secondary_background_default_colors,
    button_secondary_border_default_colors,
    button_secondary_text_default_colors,
    button_secondary_icon_default_colors,
    button_secondary_background_focus_colors,
    button_secondary_border_focus_colors,
    button_secondary_text_focus_colors,
    button_secondary_icon_focus_colors,
    button_secondary_background_hover_colors,
    button_secondary_border_hover_colors,
    button_secondary_text_hover_colors,
    button_secondary_icon_hover_colors,
    button_secondary_background_pressed_colors,
    button_secondary_border_pressed_colors,
    button_secondary_text_pressed_colors,
    button_secondary_icon_pressed_colors,
    button_secondary_background_disabled_colors,
    button_secondary_border_disabled_colors,
    button_secondary_text_disabled_colors,
    button_secondary_icon_disabled_colors
    // button_secondary_background_inactive_colors
    // button_secondary_text_inactive_colors,
    // button_secondary_icon_inactive_colors
  ),

  dangerButtonClassName: classnames(
    buttonClassName,
    text.buttonTitleClassName,
    button_danger_background_default_colors,
    button_danger_border_default_colors,
    button_danger_text_default_colors,
    button_danger_icon_default_colors,
    button_danger_background_focus_colors,
    button_danger_border_focus_colors,
    button_danger_text_focus_colors,
    button_danger_icon_focus_colors,
    button_danger_background_hover_colors,
    button_danger_border_hover_colors,
    button_danger_text_hover_colors,
    button_danger_icon_hover_colors,
    button_danger_background_pressed_colors,
    button_danger_border_pressed_colors,
    button_danger_text_pressed_colors,
    button_danger_icon_pressed_colors,
    button_danger_background_disabled_colors,
    button_danger_border_disabled_colors,
    button_danger_text_disabled_colors,
    button_danger_icon_disabled_colors
    // button_danger_background_inactive_colors,
    // button_danger_text_inactive_colors,
    // button_danger_icon_inactive_colors
  ),

  invisibleButtonClassName: classnames(
    buttonClassName,
    text.buttonTitleClassName,
    button_invisible_background_default_colors,
    button_invisible_border_default_colors,
    button_invisible_text_default_colors,
    button_invisible_icon_default_colors,
    button_invisible_background_focus_colors,
    button_invisible_border_focus_colors,
    button_invisible_text_focus_colors,
    button_invisible_icon_focus_colors,
    button_invisible_background_hover_colors,
    button_invisible_border_hover_colors,
    button_invisible_text_hover_colors,
    button_invisible_icon_hover_colors,
    button_invisible_background_pressed_colors,
    button_invisible_border_pressed_colors,
    button_invisible_text_pressed_colors,
    button_invisible_icon_pressed_colors,
    button_invisible_background_disabled_colors,
    button_invisible_border_disabled_colors,
    button_invisible_text_disabled_colors,
    button_invisible_icon_disabled_colors
    // button_invisible_background_inactive_colors,
    // button_invisible_text_inactive_colors,
    // button_invisible_icon_inactive_colors
  ),

  alternativeButtonClassName: classnames(
    buttonClassName,
    text.buttonTitleClassName,
    button_alternative_background_default_colors,
    button_alternative_border_default_colors,
    button_alternative_text_default_colors,
    button_alternative_icon_default_colors,
    button_alternative_background_focus_colors,
    button_alternative_border_focus_colors,
    button_alternative_text_focus_colors,
    button_alternative_icon_focus_colors,
    button_alternative_background_hover_colors,
    button_alternative_border_hover_colors,
    button_alternative_text_hover_colors,
    button_alternative_icon_hover_colors,
    button_alternative_background_pressed_colors,
    button_alternative_border_pressed_colors,
    button_alternative_text_pressed_colors,
    button_alternative_icon_pressed_colors,
    button_alternative_background_disabled_colors,
    button_alternative_border_disabled_colors,
    button_alternative_text_disabled_colors,
    button_alternative_icon_disabled_colors
    // button_alternative_background_inactive_colors
    // button_alternative_text_inactive_colors,
    // button_alternative_icon_inactive_colors
  ),
} as const;

export const layoutClassName = classnames(
  main_background_colors,
  flexCol,
  'min-h-full grow gap-y-4 px-4 pb-12 pt-6'
);

export const spinner = {
  wrapperClassName: 'flex flex-1 flex-col items-center justify-center',
  iconClassName: 'size-8 text-cyan-500',
} as const;

export const section = {
  pageWithFormClassName: classnames(
    flexCol,
    'mx-auto w-full max-w-[430px] gap-y-4'
  ),
  sectionClassName: classnames(
    main_background_colors,
    main_widget_border_colors,
    flexCol,
    'rounded-md border border-solid',
    'p-4 md:p-6 lg:p-8',
    'items-center justify-center gap-y-4'
  ),
  topSectionClassName: classnames(
    main_background_colors,
    'p-4',
    flexCol,
    'items-center justify-center gap-y-4'
  ),
  horizontalDividerClassName: classnames(
    breadcrumbs_divider_colors,
    'h-px w-full border-none'
  ),
  imageContainerClassName: classnames(
    'm-auto mt-4 size-[196px]',
    text_default_colors
  ),
} as const;

export const form = {
  form: classnames(flexCol, 'w-full gap-y-2'),
  formColumnWrapperClassName: classnames(flexCol, 'gap-2'),
  formRowWrapperClassName: classnames(flexRow, 'gap-1'),
};

export const divClassName = classnames(flexCol, 'gap-y-1');

export const maintainersStyle = {
  linkButtonClassName: classnames(
    flexRow,
    'w-full justify-center',
    text.linkClassName
  ),
  arrowIconClassName: classnames('ml-2 size-6'),
};

export const baseInputStatesClassName = classnames(
  text_default_colors,
  input_placeholder_default_colors,
  input_background_default_colors,
  input_border_default_colors,
  input_border_hover_colors,
  input_placeholder_hover_colors,
  input_border_focus_colors,
  input_background_disabled_colors,
  input_border_disabled_colors,
  input_placeholder_disabled_colors,
  input_background_readonly_colors,
  input_placeholder_readonly_colors,
  text.inputPlaceholderClassName,
  'align-middle',
  'read-only:shadow-[0_1px_0_0_rgba(31,35,40,0.04)]'
);

export const baseInputClassName = classnames(
  'h-10 w-full rounded-md border border-solid outline-none hover:border-2 focus:border-2',
  baseInputStatesClassName
);

export const inputClassName = classnames(baseInputClassName, 'w-full indent-4');
export const selectClassName = classnames(
  baseInputClassName,
  'w-full pr-4 indent-4'
);

export const errorClassName = classnames(
  input_message_invalid_colors,
  'h-6 align-middle text-xs leading-6'
);

export const inputTouchedClassName = classnames('ring-1 ring-inset');
export const inputUnTouchedClassName = classnames('cursor-pointer');

export const hiddenClassName = classnames('hidden');

export const checkBox = {
  fieldsetClassName: classnames(flexRow, 'gap-x-3'),
  inputClassName: classnames(
    checkbox_background_default_colors,
    checkbox_background_checked_colors,
    checkbox_border_default_colors,
    checkbox_border_focus_colors,
    checkbox_icon_checked_colors,
    'block size-6 shrink-0 cursor-pointer appearance-none rounded-[2px] border hover:border-2'
  ),
  checkBoxClassName: classnames('relative'),
  checkerClassName: classnames(
    'pointer-events-none absolute left-0 top-0 block size-6 text-white'
  ),
  checkMarkClassName: classnames(''),
};

export const password = {
  fieldsetClassName: classnames(flexCol, 'relative gap-x-3'),
  inputIconButtonClassName: classnames(
    'absolute bottom-0 right-0 block size-10 p-2'
  ),
  inputIconClassName: classnames(
    'relative',
    input_icon_default_colors,
    input_icon_disabled_colors,
    input_icon_hover_colors,
    input_icon_focus_colors,
    input_icon_pressed_colors
  ),
};

export const messages = {
  divClassName: classnames(flexRow, 'min-h-8 items-center pb-2'),
  errorClassName: classnames(
    input_message_invalid_colors,
    'h-6 align-middle text-xs/[24px]'
  ),
  successClassName: classnames(input_message_valid_colors),
};

export const capsLockMessage = {
  divClassName: classnames('h-6'),
  listClassName: classnames(''),
  listItemClassName: classnames(
    text_default_colors,
    'align-middle text-xs/[24px]'
  ),
};

export const email = {
  fieldsetClassName: classnames(divClassName),
};

export const phone = {
  buttonClassName: classnames(''),
  fieldsetClassName: classnames(divClassName),
  inputClassName: classnames(
    'h-10 w-full flex-1 indent-2 outline-none',
    'rounded-r-md border border-solid hover:border-2 focus:border-2',
    baseInputStatesClassName
  ),
  searchClassName: classnames('indent-8', baseInputClassName),
  listBoxClassName: classnames(
    input_background_default_colors,
    input_border_default_colors,
    flexCol,
    'size-full overflow-auto',
    'rounded-md border-2 border-solid'
  ),
  containerClassName: classnames(flexRow, 'relative flex-wrap gap-y-1'),
  searchIconClassName: classnames(
    input_icon_default_colors,
    input_icon_hover_colors,
    input_icon_focus_colors,
    input_icon_default_colors,
    input_icon_pressed_colors,
    input_icon_disabled_colors,
    'absolute left-1 top-[30px] z-20 block size-7'
  ),
  listboxItemClassName: classnames(
    text.inputPlaceholderClassName,
    flexRow,
    'cursor-pointer items-center justify-center gap-x-2 px-2'
  ),
  searchLabelClassName: classnames(text.labelClassName, 'w-full'),
  listContainerClassName: classnames(
    main_widget_surface_colors,
    main_widget_border_colors,
    flexCol,
    'absolute top-[45px] z-10 max-h-[268px] w-full gap-y-2 p-2',
    'rounded-md border-2 border-solid'
  ),
  dropdownButtonClassName: classnames(
    baseInputStatesClassName,
    flexRow,
    'mr-1 size-10 items-center justify-center rounded-l-md border hover:border-2 focus:border-2'
  ),
  listboxDividerClassName: classnames(''),
  listboxItemIconClassName: classnames('h-3'),
  listboxItemNameClassName: classnames(flexRow, 'h-10 items-center'),
  listboxItemDescClassName: classnames(
    flexRow,
    'ml-auto h-10 items-center justify-center'
  ),
  searchContainerClassName: classnames(
    flexCol,
    'relative w-full items-center gap-x-2 gap-y-1'
  ),
  dropdownButtonIconClassName: classnames(''),
  noEntriesMessageClassName: classnames(''),
};

export const country = {
  inputClassName: classnames(baseInputClassName, 'w-full'),
  inputUnselectedClassName: classnames('indent-4'),
  inputSelectedClassName: classnames('indent-[48px]'),
  fieldsetClassName: classnames('relative mb-2 h-[100px]'),
  listClassName: classnames(
    input_background_default_colors,
    input_border_default_colors,
    flexCol,
    'absolute top-[68px] z-30 max-h-[160px] w-full overflow-auto',
    'rounded-md border-2 border-solid'
  ),
  itemClassName: classnames(
    text.inputPlaceholderClassName,
    flexRow,
    'w-full cursor-pointer items-center gap-x-2 self-start px-4'
  ),
  flagClassName: classnames(
    'absolute left-4 top-[38px] h-[11px] w-4',
    'bg-flags'
  ),
  optionFlagClassName: classnames('h-[11px] w-4', 'bg-flags'),
  spanOptionClassName: classnames(flexRow, 'h-10 items-center justify-center'),
} as const;

export const hint = {
  divClassName: classnames(text_label_colors, flexCol, 'gap-y-1 pb-8'),
  listClassName: classnames(flexCol, 'gap-y-2 pt-3'),
  itemClassName: classnames(
    text_default_colors,
    flexRow,
    'items-center gap-x-2'
  ),
  itemIconClassName: classnames('size-4'),
  itemIconCheckClassName: classnames(input_icon_valid_colors),
  itemIconUncheckClassName: classnames(input_icon_invalid_colors),
} as const;

export const birthday = {
  divClassName: classnames('relative mb-8 block h-[100px]'),
  daysClassName: classnames(flexCol, 'gap-2'),
  headerClassName: classnames(flexRow, 'justify-between'),
  daysColClassName: classnames(flexRow, 'justify-center'),
  daysRowClassName: classnames('grid grid-cols-7'),
  daysBodyClassName: classnames(flexCol, 'gap-1'),
  containerClassName: classnames(
    flexCol,
    'absolute top-[85px] z-10 w-full gap-4 p-3 shadow-md'
  ),
  daysHeaderClassName: classnames('grid grid-cols-7'),
  headerYearClassName: classnames(flexRow, 'w-24 justify-between'),
  daysColOverClassName: classnames('opacity-20'),
  headerMonthClassName: classnames(flexRow, 'w-[140px] justify-between'),
  headerButtonClassName: classnames('size-6'),
  inputContainerClassName: classnames(flexCol, 'gap-4'),
  daysColSelectedClassName: classnames(''),
} as const;

export const select = {
  divClassName: classnames('relative'),
  listClassName: classnames(
    input_border_default_colors,
    select_background_default_colors,
    select_text_default_colors,
    flexCol,
    'absolute top-[70px] z-10 w-full',
    'box-border rounded-md border-2 border-solid'
  ),
  optionClassName: classnames(
    select_background_hover_colors,
    text.inputPlaceholderClassName,
    'indent-4'
  ),
  selectDivClassName: classnames(
    flexRow,
    'w-full flex-wrap items-center justify-between'
  ),
  readonlyInputClassName: classnames(
    'w-full flex-1 cursor-pointer text-left indent-4',
    baseInputClassName
  ),
  inputUnTouchedClassName: classnames('cursor-pointer'),
  selectButtonIconClassName: classnames(
    text_default_colors,
    'pointer-events-none absolute right-3 w-3 rotate-180 p-px'
  ),
} as const;

export const textarea = {
  fieldsetClassName: classnames(''),
  textareaClassName: classnames(
    baseInputStatesClassName,
    'h-[64px] w-full rounded-md border border-solid px-4 hover:border-2 focus:border-2'
  ),
  descriptionClassName: classnames(''),
  textUnderlineClassName: classnames('underline'),
} as const;

export const uiKitSectionClassName = classnames(flexCol, 'gap-y-4');

export const uiKitColors = {
  colorItemParagraphClassName: classnames('w-full'),
  colorItemWFullWrapperClassName: classnames(
    'text-base/10 font-bold',
    'w-full rounded-md px-4'
  ),
  colorItemFlexRowWrapperClassName: classnames(flexRow, 'gap-x-3'),

  colorListWrapperClassName: classnames(flexCol, 'gap-y-2'),

  colorsFlexWrapperClassName: classnames(flexRow, 'flex-wrap gap-4'),
  colorsH3LabelClassName: classnames(
    main_background_colors,
    main_widget_border_colors,
    flexCol,
    'h-full max-w-[332px] flex-1 gap-y-[10px] rounded-md border border-solid p-6'
  ),
};

export const uiKitButtons = {
  sectionClassName: classnames(uiKitSectionClassName, 'w-full max-w-[430px]'),
};

export const uiKitIcons = {
  bigIconClassName: classnames(text_default_colors, 'size-[196px]'),
  smallIconClassName: classnames(text_default_colors, 'size-6'),
  bigIconsWrapperClassName: classnames(flexRow, 'flex-wrap'),
  smallIconsWrapperClassName: classnames(flexRow, 'flex-wrap gap-6 pb-5'),
};

export const uiKitFonts = {
  fontsRowsFor16ContainerClassName: classnames(flexRow, 'justify-between'),
  fontsRowsForH3ContainerClassName: classnames(
    flexRow,
    'justify-between text-h3'
  ),
  fontsRowsForH2ContainerClassName: classnames(
    flexRow,
    'justify-between text-h2'
  ),
  fontRowsForH1ContainerClassName: classnames(
    flexRow,
    'justify-between text-h1'
  ),

  fontsWrapperClassName: classnames(
    uiKitSectionClassName,
    'w-full max-w-[430px]'
  ),
  fontsBaseClassName: classnames(text_default_colors, 'font-base'),
  fontsBaseLabelClassName: classnames('pb-2 text-h2'),

  fontsBoldClassName: classnames(text_default_colors, 'font-bold'),
  fontsBoldLabelClassName: classnames('pb-2 text-h2'),

  fontsHeavyClassName: classnames(text_default_colors, 'font-heavy'),
  fontsHeavyLabelClassName: classnames('pb-2 text-h2'),

  columnClassName: classnames(text_default_colors, flexCol, 'gap-y-4'),
  rowClassName: classnames(flexRow, 'justify-between'),
  fontParagraphClassName: classnames('w-full max-w-40 items-start'),

  textH1ClassName: classnames('text-h1'),
  textH2ClassName: classnames('text-h2'),
  textH3ClassName: classnames('text-h3'),
};

export const timezone = {
  divClassName: classnames('relative mt-3'),
  listClassName: classnames(
    input_border_default_colors,
    select_background_default_colors,
    select_text_default_colors,
    flexCol,
    'absolute top-[70px] z-10 max-h-60 w-full overflow-y-auto',
    'box-border rounded-md border-2 border-solid'
  ),
  optionClassName: classnames(
    select_background_hover_colors,
    text.inputPlaceholderClassName,
    'cursor-pointer indent-4'
  ),
  selectDivClassName: classnames(
    flexRow,
    'w-full flex-wrap items-center justify-between'
  ),
  readonlyInputClassName: classnames(
    'flex-1 cursor-pointer text-left indent-4',
    baseInputClassName
  ),
  inputUnTouchedClassName: classnames('cursor-pointer'),
  selectButtonIconClassName: classnames(
    text_default_colors,
    'pointer-events-none absolute right-3 w-3 rotate-180 p-px'
  ),
  // containerClassName: classnames(flexRow, 'relative flex-wrap gap-y-1'),
  // selectClassName: classnames(selectClassName, 'cursor-pointer'),
  // optionClassName: classnames(select.optionClassName, 'cursor-pointer rounded-md border-2 border-solid'),

  // inputClassName: classnames(baseInputClassName),
  // inputUnselectedClassName: classnames('indent-4'),
  // inputSelectedClassName: classnames('indent-[48px]'),
  // fieldsetClassName: classnames('relative mb-2 h-[100px]'),
  // listClassName: classnames(
  //   input_background_default_colors,
  //   input_border_default_colors,
  //   flexCol,
  //   'absolute top-[68px] z-30 max-h-[160px] w-full overflow-auto',
  //   'rounded-md border-2 border-solid'
  // ),
  // itemClassName: classnames(
  //   text.inputPlaceholderClassName,
  //   flexRow,
  //   'w-full cursor-pointer items-center gap-x-2 self-start px-4'
  // ),
  // spanOptionClassName: classnames(flexRow, 'h-10 items-center justify-center'),
};

export const validClassName = classnames(input_border_valid_colors);

export const invalidClassName = classnames(input_border_invalid_colors);

export const calendarStyles = {
  divPaddingClassName: classnames('p-5'),
  h2ClassName: classnames('mb-4 text-h2 font-bold'),

  containerClass: classnames(
    'mx-auto w-full max-w-xl rounded-lg bg-gray-800 p-6 shadow-lg'
  ),
  headerClassName: classnames(
    flexRow,
    'mb-4 items-center justify-between text-white'
  ),
  daysRowClassName: classnames(flexRow, 'justify-center'),
  daysColClassName: classnames(
    flexRow,
    'size-14 items-center justify-center rounded-lg'
  ),

  daysBodyClassName: classnames('min-h-[340px] w-full'),
  daysHeaderClassName: classnames(
    datepicker_weeks_months_color,
    'mb-4 grid h-12 w-full grid-cols-7 items-center text-center'
  ),
  headerYearClassName: classnames(
    date_picker_header_items_color,
    flexRow,
    'items-center justify-center text-xl font-semibold'
  ),
  daysColOverClassName: classnames('opacity-20'),
  emptyButtonClassName: classnames(
    'rounded-lg bg-gray-700 p-2 text-white hover:bg-gray-600'
  ),
  headerMonthClassName: classnames(
    date_picker_header_items_color,
    'flex w-[190px] items-center justify-between text-xl font-semibold'
  ),
  headerButtonClassName: classnames(date_picker_header_items_color, 'w-10'),
  // daysColCurrentClassName: classnames('rounded-lg bg-green-600 text-white'),
  daysColCurrentClassName: classnames(
    datepicker_current_date_border_color,
    'border-2 border-solid'
  ),

  daysColSelectedClassName: classnames('rounded-lg bg-green-600 text-white'),
  daysRangeColSelectedClassName: classnames('bg-green-600/10'),
  headerButtonIconClassName: classnames('size-5'),
  footerClassName: classnames(flexCol, 'mt-1 gap-y-3'),
  footerWrapperClassName: classnames(flexRow, 'gap-x-3'),
  checkboxMarkerContainerClassName: classnames(
    flexRow,
    'relative items-center gap-x-2 text-white'
  ),
  checkboxClassName: classnames(
    // date_picker_background,
    checkbox_border_default_colors,
    checkbox_background_checked_colors,
    checkbox_background_default_colors,
    'peer relative size-6 shrink-0 cursor-pointer appearance-none rounded-md border checked:border-0'
  ),
  calendarCheckerClassName: classnames(
    'pointer-events-none absolute left-0 top-0 block size-6 text-white'
  ),
  labelWrapperClassName: classnames(flexRow, 'gap-2.5'),
  inputNumberClassName: classnames(
    // input number in footer
    baseInputClassName,
    text.labelClassName,
    'w-[78px] text-center indent-4'
  ),
  inputTimeFormatClassName: classnames(
    // input number in footer
    baseInputClassName,
    text.labelClassName,
    'w-[61px] text-center indent-2'
  ),
  calendarsRowClassName: classnames(flexRow),
  timeSectionWrapperClassName: classnames(flexRow, 'mt-4 gap-2.5'),
  timeInputWrapperClassName: classnames(flexCol, 'gap-2'),
  calendarLabelClassName: classnames(calendar_label_color, 'text-sm font-bold'),
  selectOptionsClassName: classnames(
    calendar_option_light,
    'cursor-pointer text-center text-sm font-bold'
  ),
  dateInputClassName: classnames(baseInputClassName, 'w-[256px] pl-6'),
  inputContainerClassName: classnames(flexCol, 'relative gap-4'),
  calendarContainerClassName: classnames('absolute left-0 top-11 z-50'),
  containerClassName: classnames(
    date_picker_background,
    date_picker_border,
    'rounded-lg border p-6'
  ),
  daysClassName: classnames(date_picker_days_color),
  rangeContainerClassName: classnames(flexRow, 'gap-4'),
  calendarAnimationClassName: classnames('transition-all duration-1000'),
} as const;

export const captchaClassName = classnames('');

export const loadingPageClassName = classnames(
  'mx-auto flex size-[120px] animate-spin items-center justify-center'
);

export const listClassName = {
  listItemClassName: classnames('w-full list-none self-center'),
  listItemColClassName: classnames(
    'flex w-full list-none flex-col gap-y-2 self-center'
  ),
  listItemWrapperClassName: classnames(
    'flex flex-row border-b border-gray-300 py-5 hover:bg-gray-100'
  ),
  fontClassName: classnames(text_default_colors, 'font-bold'),
  buttonClassName: classnames(button.primaryButtonClassName, 'max-w-20'),
  linkClassName: classnames(
    text.linkClassName,
    'flex items-center justify-center'
  ),
  linkIconClassName: classnames(
    'w-9 cursor-pointer transition-colors duration-200 hover:text-green-300 md:w-[40px]'
  ),
  detailsWrapperClassName: classnames('mt-2 flex items-center space-x-2'),
  detailTextItemClassName: classnames('inline-block'),
};

export const paginationClassName = {
  paginationWrapperClassName: classnames(
    text_default_colors,
    'mx-auto flex w-full max-w-md flex-nowrap items-center justify-between overflow-x-auto font-bold'
  ),
  firstButtonClassName: classnames('px-4 py-2'),
  lastButtonClassName: classnames('px-4 py-2'),
  activeButtonClassName: classnames(
    'box-border h-[40px] w-10 items-center justify-center gap-x-1 rounded-md border border-solid hover:border-2 focus:border-2',
    flexRow,
    text.buttonTitleClassName,
    button_primary_background_default_colors,
    button_primary_background_disabled_colors,
    button_primary_background_focus_colors,
    button_primary_background_pressed_colors,
    button_primary_background_hover_colors,
    button_primary_border_default_colors,
    button_primary_border_disabled_colors,
    button_primary_border_focus_colors,
    button_primary_border_pressed_colors,
    button_primary_border_hover_colors,
    button_primary_text_default_colors,
    button_primary_text_disabled_colors,
    button_primary_text_focus_colors,
    button_primary_text_pressed_colors,
    button_primary_text_hover_colors,
    button_primary_icon_default_colors,
    button_primary_icon_disabled_colors,
    button_primary_icon_focus_colors,
    button_primary_icon_pressed_colors,
    button_primary_icon_hover_colors
  ),
  buttonClassName: classnames('w-10'),
  ellipsesClassName: classnames(text_default_colors, 'font-bold'),
};

export const untitledListClassName = classnames(flexCol, 'w-full gap-y-6');

export const organizationPageClassName = {
  sectionHorizontalDividerClassName: classnames(
    section.horizontalDividerClassName,
    'mx-auto my-12 h-px w-1/3 border-none bg-gray-300'
  ),
  sectionClassName: classnames(
    main_background_colors,
    main_widget_border_colors,
    flexCol,
    'mx-auto flex w-full flex-col gap-8 px-4 py-6 md:flex-row'
  ),
  listBlockClassName: classnames('md:w-3/4'),
  detailsBlockClassName: classnames(
    breadcrumbs_divider_colors,
    'pr-8 md:w-1/4 md:border-l'
  ),
};

export const organizationPackagesClassName = {
  packagesWrapperClassName: classnames('space-y-4'),
  packagesTitleClassName: classnames(text.h3ClassName, 'text-center'),
  packagesListClassName: classnames('list-disc space-y-2 pl-5'),
};

export const organizationProjectsClassName = {
  projectsWrapperClassName: classnames('space-y-4'),
  projectsTitleClassName: classnames(text.h3ClassName, 'text-center'),
  projectsListClassName: classnames('list-disc space-y-2 pl-5'),
};

export const organizationDetailsClassName = {
  blockWrapperClassName: classnames('flex flex-col space-y-4 pl-5'),
  avatarWrapperClassName: classnames('flex items-center space-x-4'),
  avatarImgClassName: classnames('size-20 rounded-lg'),
  detailsWrapperClassName: classnames('space-y-4 pt-4'),
  detailItemWrapperClassName: classnames('space-y-2'),
};

export const formEditClassName = {
  divWrapperClassName: classnames('my-3'),
};

export const packagePageClassName = {
  pageWrapperClassName: classnames(
    main_background_colors,
    'flex flex-col items-center gap-y-4 px-3 py-4 sm:px-0'
  ),
  detailsPaymentClassName: classnames(
    'flex h-[35px] min-w-[143px] items-center justify-around gap-x-2 rounded-[100px] border border-solid border-[#BBBCD5] px-[6px] py-[3px] pr-[12px] md:min-w-[163px]'
  ),
  pageSectionClassName: classnames(
    main_background_colors,
    main_widget_border_colors,
    flexCol,
    'w-full md:w-5/6',
    'rounded-md border border-solid',
    'p-4 md:p-6 lg:p-8',
    'items-start justify-start gap-y-5 md:justify-center'
  ),
  sectionItemTitleClassName: classnames('flex items-center gap-x-2 md:mx-auto'),
  sectionItemLinkClassName: classnames(
    'mx-auto mt-4 flex items-center gap-x-2'
  ),
  sectionItemClassName: classnames('flex items-center gap-x-2'),
  sectionItemIconClassName: classnames(main_icons_colors, 'h-[14px] w-[16px]'),
  sectionItemLinkIconClassName: classnames(
    main_icons_colors,
    'size-[30px] cursor-pointer'
  ),
  sectionColumnItemClassName: classnames('flex flex-col items-start gap-y-2'),
  sectionRowItemClassName: classnames('flex flex-row items-start gap-x-2'),
  sectionItemLineClassName: classnames('border-b border-gray-300 py-4'),
  blockLinkClassName: classnames(
    text.subheadClassName,
    'flex items-center justify-center',
    'underline underline-offset-4'
  ),
  textLinkClassName: classnames(
    text.paragraphLargeClassName,
    'flex items-center justify-center',
    'underline underline-offset-4'
  ),
  badgeWrapperClassName: classnames(
    'flex h-8 min-w-20 items-center justify-around gap-x-1 rounded-[100px] border border-solid border-[#BBBCD5] px-2'
  ),
  badgeAvatarWrapperClassName: classnames(
    'mr-2 size-5 overflow-hidden rounded-full'
  ),
  badgeAvatarImgClassName: classnames('size-full object-cover'),
  badgeAvatarPlugClassName: classnames(
    'mr-2 flex size-5 items-center justify-center rounded-full bg-[#51E085] text-white'
  ),
};

export const anchors = {
  anchorsBlockWrapperClassName: classnames(
    main_background_colors,
    main_widget_border_colors,
    'w-full md:w-5/6',
    'rounded-md border border-solid',
    'p-4 md:p-6 lg:p-8',
    'grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4',
    'overflow-x-hidden'
  ),
  anchorLinkClassName: classnames(
    text.paragraphLargeClassName,
    'inline-block cursor-pointer hover:underline focus:outline-none'
  ),
};
