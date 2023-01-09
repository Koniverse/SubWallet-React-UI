import * as React from 'react';
import classNames from 'classnames';
import PinInput from 'react-pin-input';
import useStyle from './style';
import { ConfigContext } from '../config-provider';

export interface PinCodeProps {
  initialValue?: string;
  pinCodeLength: number;
  onChange?: (value: string, index: number) => void;
  onComplete?: (value: string, index: number) => void;
}

const PinCode: React.FC<PinCodeProps> = ({
  pinCodeLength = 6,
  initialValue = '',
  onChange,
  onComplete,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('pin-code');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <PinInput
      className={classes}
      length={pinCodeLength}
      initialValue={initialValue}
      secret
      type="numeric"
      inputMode="number"
      inputStyle={{ backgroundColor: '#1F1F1F', color: '#FFF' }}
      autoSelect
      regexCriteria={/^[\w #&+./@-]*$/}
      onChange={onChange}
      onComplete={onComplete}
    />,
  );
};

export default PinCode;
