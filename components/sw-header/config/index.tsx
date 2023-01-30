import React from 'react';
import { ListPlus } from 'phosphor-react';
import Logo from '../../logo';
import Icon from '../../icon';

export interface SwHeaderConfigProps {
  default: React.ReactNode;
  logo: React.ReactNode;
}

export const SwHeaderConfig: SwHeaderConfigProps = {
  default: <Icon type="phosphor" phosphorIcon={ListPlus} size="sm" />,
  logo: <Logo size={24} isShowSubLogo={false} shape="circle" subLogoShape="circle" />,
};

export const changeHeaderLogo = (ele: React.ReactNode) => {
  SwHeaderConfig.logo = ele;
};

export const changeHeaderDefault = (ele: React.ReactNode) => {
  SwHeaderConfig.default = ele;
};
