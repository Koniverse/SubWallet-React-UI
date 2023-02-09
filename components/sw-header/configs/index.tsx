import React from 'react';
import Logo from '../../logo';
import MenuBar from '../icons/MenuBar';

export interface SwHeaderConfigProps {
  default: React.ReactNode;
  logo: React.ReactNode;
}

export const SwHeaderConfig: SwHeaderConfigProps = {
  default: <MenuBar />,
  logo: <Logo size={24} isShowSubLogo={false} shape="circle" subLogoShape="circle" />,
};

export const changeHeaderLogo = (ele: React.ReactNode) => {
  SwHeaderConfig.logo = ele;
};

export const changeHeaderDefault = (ele: React.ReactNode) => {
  SwHeaderConfig.default = ele;
};
