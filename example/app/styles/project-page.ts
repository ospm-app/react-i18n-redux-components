import classnames from 'classnames';
import { main_background_colors, main_widget_border_colors, main_icons_colors } from 'styles/colors.ts';
import { text, flexCol } from 'styles/styles.ts';

export const projectPageClassName = {
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
  sectionColumnItemClassName: classnames('flex flex-col items-start gap-y-3'),
  sectionRowItemClassName: classnames('flex flex-row flex-wrap items-start gap-x-2'),
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
  flexColToRowMd: classnames('flex flex-col gap-y-1 md:flex-row md:gap-x-2'),
  flexCenterGapSmall: classnames('flex items-center gap-x-1'),
};
