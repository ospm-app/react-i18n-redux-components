import { memo, type ComponentType, type ReactNode, type JSX } from 'react';

import {
  text,
  section,
  uiKitIcons,
  uiKitSectionClassName,
} from 'styles/styles.ts';

import { CubeIcon } from 'svg/cube.tsx';
import { GearIcon } from 'svg/gear.tsx';
import { GroupIcon } from 'svg/group.tsx';
import { PhoneIcon } from 'svg/icon-phone.tsx';
import { LayersIcon } from 'svg/layers.tsx';
import { LikeIcon } from 'svg/like.tsx';
import { RocketIcon } from 'svg/rocket.tsx';
import { SlideshowIcon } from 'svg/slideshow.tsx';
import { ArrowRightIcon } from 'svg/arrow-right.tsx';
import { HamburgerIcon } from 'svg/hamburger.tsx';
import { LinkedInIcon } from 'svg/linkedin.tsx';
import { TelegramCircleIcon } from 'svg/telegram-circle.tsx';
import { RedditIcon } from 'svg/reddit.tsx';
import { CheckCircleIcon } from 'svg/check-circle.tsx';
import { FileIcon } from 'svg/file.tsx';
import { ServerIcon } from 'svg/server.tsx';
import { DiamondIcon } from 'svg/diamond.tsx';
import { LaptopIcon } from 'svg/laptop.tsx';
import { SearchIcon } from 'svg/search.tsx';
import { ArrowLeftIcon } from 'svg/arrow-left.tsx';
import { ArrowUpIcon } from 'svg/arrow-up.tsx';
import { ChevronLeftIcon } from 'svg/chevron-left.tsx';
import { ChevronRightIcon } from 'svg/chevron-right.tsx';
import { ClockCircleIcon } from 'svg/clock-circle.tsx';
import { CrossIcon } from 'svg/cross.tsx';
import { EnvelopeIcon } from 'svg/envelope.tsx';
import { FacebookCircleIcon } from 'svg/facebook-circle.tsx';
import { EyeIcon } from 'svg/icon-eye.tsx';
import { EyeSlashIcon } from 'svg/icon-eye-slash.tsx';
import { InfoIcon } from 'svg/info.tsx';
import { LogoutIcon } from 'svg/logout.tsx';
import { LoginOutlineIcon } from 'svg/login-outline.tsx';
import { MobileLoginIcon } from 'svg/mobile-login.tsx';
import { MobileSignupIcon } from 'svg/mobile-signup.tsx';
import { OfflineIcon } from 'svg/offline.tsx';
import { SpinnerIcon } from 'svg/spinner.tsx';
import { TwitterCircleIcon } from 'svg/twitter-circle.tsx';
import { PathIcon } from 'svg/path.tsx';
import { RoundPersonIcon } from 'svg/round-person.tsx';
import { RobotIcon } from 'svg/robot.tsx';
import { AtmIcon } from 'svg/atm.tsx';
import { BondIcon } from 'svg/bond.tsx';
import { ChartIcon } from 'svg/chart.tsx';
import { CollapseIcon } from 'svg/collapse.tsx';
import { CommentIcon } from 'svg/comment.tsx';
import { CopyIcon } from 'svg/copy.tsx';
import { DollarCircleIcon } from 'svg/dollar-circle.tsx';
import { FireIcon } from 'svg/fire.tsx';
import { FrameIcon } from 'svg/frame.tsx';
import { HandMoneyIcon } from 'svg/hand-money.tsx';
import { InventoryIcon } from 'svg/inventory.tsx';
import { InventoryUsdIcon } from 'svg/inventory-usd.tsx';
import { LinkIcon } from 'svg/link.tsx';
import { MoonIcon } from 'svg/moon.tsx';
import { ShieldIcon } from 'svg/shield.tsx';
import { SunIcon } from 'svg/sun.tsx';
import { SwapIcon } from 'svg/swap.tsx';
import { WaveIcon } from 'svg/wave.tsx';
import { MailSolidIcon } from 'svg/mail-solid.tsx';
import { useTranslation } from 'react-i18next';
import type { IntlMessageId } from '/app/const/intl/index.ts';

type IconWrapperType = {
  className: string;
  children: ReactNode;
};

function F_IconWrapper({ className, children }: IconWrapperType): JSX.Element {
  return (
    <div role='img' aria-hidden className={className}>
      {children}
    </div>
  );
}

const IconWrapper = memo(F_IconWrapper);

type Props = {
  iconsTitle: IntlMessageId;
  oldIconsTitle: IntlMessageId;
};

function F_Icons({ iconsTitle, oldIconsTitle }: Props): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={uiKitSectionClassName}>
      <div className={section.topSectionClassName}>
        <h3 className={text.h3ClassName}>{t(iconsTitle)}</h3>

        <hr className={section.horizontalDividerClassName} />
      </div>

      <div className={uiKitIcons.bigIconsWrapperClassName}>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <RocketIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <SlideshowIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <CubeIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <GroupIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <GearIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <LayersIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <LikeIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.bigIconClassName}>
          <PhoneIcon />
        </IconWrapper>
      </div>

      <div className={uiKitIcons.smallIconsWrapperClassName}>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ArrowRightIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <HamburgerIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <LinkedInIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <TelegramCircleIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <RedditIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <CheckCircleIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <FileIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ServerIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <DiamondIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <LaptopIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <SearchIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <LoginOutlineIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <PathIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <RoundPersonIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <RobotIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <EyeSlashIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <EyeIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ClockCircleIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <CrossIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <AtmIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <BondIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ChartIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <CollapseIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <CommentIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <CopyIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <DollarCircleIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <FireIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <FrameIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <HandMoneyIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <InventoryUsdIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <InventoryIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <LinkIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <MoonIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <SunIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ShieldIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <SwapIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <WaveIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <MailSolidIcon />
        </IconWrapper>
      </div>

      <div className={text.labelClassName}>{t(oldIconsTitle)}</div>

      <div className={uiKitIcons.smallIconsWrapperClassName}>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ArrowLeftIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ArrowUpIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ChevronLeftIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <ChevronRightIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <EnvelopeIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <FacebookCircleIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <InfoIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <LogoutIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <MobileLoginIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <MobileSignupIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <OfflineIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <SpinnerIcon />
        </IconWrapper>
        <IconWrapper className={uiKitIcons.smallIconClassName}>
          <TwitterCircleIcon />
        </IconWrapper>
      </div>
    </div>
  );
}

export const Icons: ComponentType<Props> = memo<Props>(F_Icons);
