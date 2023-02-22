import classNames from 'classnames';
import React, { useMemo } from 'react';
import Button from '../button';
import SwSubHeader from '../sw-sub-header';
import SwHeader from '../sw-header';
import type { SwTabBarItem } from '../sw-tab-bar';
import SwTabBar from '../sw-tab-bar';
import type { ButtonProps } from '../button';
import type { SwHeaderBackground, SwHeaderLeftContent } from '../sw-header';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface SwScreenLayoutProps {
  // General
  children: React.ReactNode | React.ReactNode[];
  prefixCls?: string;
  className?: string;
  withDivider?: boolean;

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
  subHeaderBackground?: SwHeaderBackground;

  // Footer
  footer?: React.ReactNode;
  leftFooterButton?: ButtonProps;
  rightFooterButton?: ButtonProps;

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
    withDivider,
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

    // Footer
    footer,
    leftFooterButton,
    rightFooterButton,

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
      <div
        className={classNames(`${prefixCls}-header`, {
          [`${prefixCls}-header-with-divider`]: withDivider && (showHeader || showSubHeader),
        })}
      >
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
      {(showTabBar || leftFooterButton || rightFooterButton || footer) && (
        <div className={classNames(`${prefixCls}-footer`)}>
          {(leftFooterButton || rightFooterButton) && (
            <div
              className={classNames(`${prefixCls}-footer-button-container`, {
                [`${prefixCls}-footer-button-container-alone`]: !(footer || showTabBar),
              })}
            >
              {leftFooterButton && (
                <Button
                  className={`${prefixCls}-footer-left-button`}
                  block
                  schema='secondary'
                  {...leftFooterButton}
                >
                  {leftFooterButton.children || 'Default button'}
                </Button>
              )}

              {rightFooterButton && (
                <Button className={`${prefixCls}-footer-right-button`} block {...rightFooterButton}>
                  {rightFooterButton.children || 'Default button'}
                </Button>
              )}
            </div>
          )}
          {!!footer && !showTabBar && (
            <div className={classNames(`${prefixCls}-footer-content`)}>{footer}</div>
          )}
          {showTabBar && (
            <SwTabBar
              className={classNames(`${prefixCls}-footer`)}
              items={tabBarItems}
              selected={selectedTabBarItem}
            />
          )}
        </div>
      )}
    </div>,
  );
};

export default SwScreenLayout;
