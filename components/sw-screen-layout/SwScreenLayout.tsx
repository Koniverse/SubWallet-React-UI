import classNames from 'classnames';
import React, { useMemo } from 'react';
import SwSubHeader from '../sw-sub-header';
import SwHeader from '../sw-header';
import type { SwTabBarItem } from '../sw-tab-bar';
import SwTabBar from '../sw-tab-bar';
import type { ButtonProps } from '../button';
import type { SwSubHeaderBackground } from '../sw-sub-header';
import type { SwHeaderBackground, SwHeaderLeftContent } from '../sw-header';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface SwScreenLayoutProps {
  // General
  children: React.ReactNode | React.ReactNode[];
  prefixCls?: string;
  className?: string;

  // Header
  showHeader?: boolean;
  showLeftButton?: boolean;
  headerLeft?: SwHeaderLeftContent;
  headerBackground?: SwHeaderBackground;
  headerOnClickLeft?: () => void;
  headerPaddingVertical?: boolean;
  headerCenter?: boolean;
  headerContent?: React.ReactNode | React.ReactNode[];
  headerIcons?: ButtonProps[];

  // Sub header
  title?: string | React.ReactNode;
  showSubHeader?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  subHeaderCenter?: boolean;
  subHeaderIcons?: ButtonProps[];
  subHeaderPaddingVertical?: boolean;
  subHeaderBackground?: SwSubHeaderBackground;

  // Tab bar
  tabBarItems: SwTabBarItem[];
  selectedTabBarItem: string;
  showTabBar?: boolean;
}

const SwScreenLayout: React.FC<SwScreenLayoutProps> = (props) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    children,
    // Header,
    showHeader,
    headerBackground,
    headerLeft,
    showLeftButton,
    headerOnClickLeft,
    headerContent,
    headerIcons,
    headerPaddingVertical,
    headerCenter,

    // Sub header
    showSubHeader,
    title,
    showBackButton,
    subHeaderIcons,
    subHeaderCenter,
    subHeaderPaddingVertical,
    subHeaderBackground,
    onBack,
    // Tab bar
    tabBarItems,
    selectedTabBarItem,
    showTabBar,
  } = props;

  const prefixCls = getPrefixCls('sw-screen-layout', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const classNameExtend = useMemo(
    (): string => classNames(hashId, className, `${prefixCls}-container`),
    [hashId, className, prefixCls],
  );

  return wrapSSR(
    <div className={classNames(classNameExtend)}>
      <div className={classNames(`${prefixCls}-header`)}>
        {showHeader && (
          <SwHeader
            showLeftButton={showLeftButton}
            center={headerCenter}
            rightButtons={headerIcons}
            background={headerBackground}
            paddingVertical={headerPaddingVertical}
            onClickLeft={headerOnClickLeft}
            left={headerLeft}
          >
            {headerContent}
          </SwHeader>
        )}
        {showSubHeader && (
          <SwSubHeader
            title={title}
            showBackButton={showBackButton}
            onBack={onBack}
            center={subHeaderCenter}
            rightButtons={subHeaderIcons}
            background={subHeaderBackground}
            paddingVertical={subHeaderPaddingVertical}
          />
        )}
      </div>
      <div className={classNames(`${prefixCls}-body`)}>{children}</div>
      {showTabBar && (
        <SwTabBar
          className={classNames(`${prefixCls}-footer`)}
          items={tabBarItems}
          selected={selectedTabBarItem}
        />
      )}
    </div>,
  );
};

export default SwScreenLayout;
