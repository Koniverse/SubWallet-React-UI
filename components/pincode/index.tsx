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
  isError?: boolean;
  errorText?: string;
}

const PinCode: React.FC<PinCodeProps> = ({
  pinCodeLength = 6,
  initialValue = '',
  onChange,
  onComplete,
  isError,
  errorText,
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('pin-code');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const classes = classNames(prefixCls, hashId);

  return wrapSSR(
    <div className={classes}>
      <PinInput
        className={`${prefixCls}-wrapper`}
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
      />
      {isError && (
        <div className={`${prefixCls}-error-wrapper`}>
          <span className={`${prefixCls}-error-text`}>{errorText}</span>
        </div>
      )}
    </div>,
  );
};

export default PinCode;
