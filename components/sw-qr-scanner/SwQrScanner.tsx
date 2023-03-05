import { BrowserQRCodeReader } from '@zxing/browser';
import classNames from 'classnames';
import type { ChangeEventHandler } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Info, ImageSquare, Camera, CheckCircle, XCircle } from 'phosphor-react';
import type { Result } from '@zxing/library';
import SwModal, { ModalContext, useExcludeModal } from '../sw-modal';
import type { SwModalProps } from '../sw-modal';
import ActivityIndicator from '../activity-indicator';
import SelectModal from '../select-modal';
import { openGrantCameraPermissionDocument } from './configs';
import BackgroundIcon from '../background-icon';
import { useToken } from '../theme/internal';
import QrReader from './QrReader';
import Icon from '../icon';
import SwSubHeader from '../sw-sub-header';
import type { ButtonProps } from '../button';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { NoFormStyle } from '../form/context';
import { NoCompactStyle } from '../space/Compact';

interface VideoDeviceInfo extends Pick<MediaDeviceInfo, 'deviceId' | 'groupId' | 'label'> {
  key: string;
}

export interface ScannerResult {
  text: string;
  raw: Uint8Array;
}

export interface SwQrScannerProps
  extends Pick<
    SwModalProps,
    | 'className'
    | 'prefixCls'
    | 'getContainer'
    | 'width'
    | 'wrapClassName'
    | 'zIndex'
    | 'transitionName'
  > {
  id?: string;
  onSuccess: (value: ScannerResult) => void;
  onError: (value: string) => void;
  onClose?: () => void;
  rightIconProps?: ButtonProps;
  isError?: boolean;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  overlay?: React.ReactNode;
  ratio?: number;
}

const filterVideoMediaFunction = (devices: MediaDeviceInfo[]): MediaDeviceInfo[] =>
  devices.filter((device) => device.kind === 'videoinput' && device.label);

const convertFunction = (device: MediaDeviceInfo): VideoDeviceInfo => ({
  label: device.label,
  groupId: device.groupId,
  deviceId: device.deviceId,
  key: `${device.groupId}_${device.deviceId}`,
});

type CameraState = 'Waiting' | 'Allowed' | 'Blocked' | 'NotFound';

const CAMERA_ERROR = {
  name: {
    blocked: ['NotAllowedError'],
    notFound: ['NotFoundError'],
  },
  message: {
    blocked: [
      'Permission denied',
      'The request is not allowed by the user agent or the platform in the current context.',
    ],
    dismissed: ['Permission dismissed'],
  },
};

const MODAL_ID = 'qr-scanner-modal';
const SELECT_CAMERA_PREFIX = 'select-camera-';
const VIDEO_ID = 'qr-scanner';
const Z_INDEX = 1002;

const SwQrScanner: React.FC<SwQrScannerProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    onError,
    onSuccess,
    rightIconProps,
    onClose,
    isError,
    title = 'Scan QR code',
    description,
    overlay,
    footer,
    ratio = 390 / 600,
    id: mainId = MODAL_ID,
    zIndex: mainZIndex = Z_INDEX,
    wrapClassName,
    transitionName = 'fade',
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const { inactiveModal, checkActive } = React.useContext(ModalContext);
  const [, token] = useToken();

  const open = checkActive(mainId);

  useExcludeModal(mainId);

  const prefixCls = getPrefixCls('sw-qr-scanner', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const selectCameraModalId = useMemo(() => `${SELECT_CAMERA_PREFIX}${mainId}`, [mainId]);

  const classNameExtended = useMemo(
    (): string => classNames(hashId, className, `${prefixCls}-container`),
    [hashId, className, prefixCls],
  );
  const wrapClassNameExtended = useMemo(
    () => classNames(wrapClassName, prefixCls, hashId, `${prefixCls}-container`),
    [wrapClassName, prefixCls, hashId],
  );

  const fileRef = useRef<HTMLInputElement>(null);
  const [cameraState, setCameraState] = useState<CameraState>('Waiting');
  const [devices, setDevices] = useState<VideoDeviceInfo[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [loadingCamera, setLoadingCamera] = useState<boolean>(true);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loadingGrantPermission, setLoadingGrantPermission] = useState<boolean>(false);

  const device = useMemo((): VideoDeviceInfo | undefined => {
    if (!selected) {
      return devices[0];
    }

    if (!devices.length) {
      return undefined;
    }

    const exists = devices.find((item) => selected === item.key);

    if (exists) {
      return exists;
    }

    return devices[0];
  }, [devices, selected]);

  const constraints = useMemo(
    (): MediaTrackConstraints | null =>
      device
        ? {
            facingMode: 'user',
            aspectRatio: ratio,
            deviceId: device?.deviceId,
            groupId: device?.groupId,
          }
        : null,
    [device],
  );

  const _onClose = useCallback(() => {
    inactiveModal(mainId);
    onClose?.();
  }, [mainId, inactiveModal, onClose]);

  const onOpenFile = useCallback(() => {
    fileRef.current?.click();
  }, []);

  const onScan = useCallback(
    (result: Result | undefined | null, error: Error | undefined | null) => {
      if (result) {
        onSuccess({
          raw: result.getRawBytes(),
          text: result.getText(),
        });
      }

      if (error && error.message) {
        onError(error.message);
      }
    },
    [onSuccess, onError],
  );

  const customInput = useMemo(
    (): React.ReactNode => (
      <Button
        icon={<Icon type='phosphor' phosphorIcon={Camera} weight='fill' />}
        schema='secondary'
      />
    ),
    [],
  );

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setLoadingImage(true);
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const codeReader = new BrowserQRCodeReader();
        const reader = new FileReader();
        reader.onload = () => {
          codeReader
            .decodeFromImageUrl(reader.result as string)
            .then((value) => {
              onScan(value, null);
            })
            .catch((error: Error) => {
              if (error.name === 'NotFoundException') {
                error.message = 'Invalid QR code, please try again';
              }
              onScan(null, error);
            })
            .finally(() => {
              setLoadingImage(false);
            });
        };
        reader.readAsDataURL(file);
      } else {
        setLoadingImage(false);
      }
    },
    [onScan],
  );

  const onGrantPermission = useCallback((): void => {
    if (loadingGrantPermission) {
      return;
    }

    setLoadingGrantPermission(true);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraState('Allowed');

        stream.getTracks().forEach((track) => {
          track.stop();
        });
      })
      .catch((e: Error) => {
        if (CAMERA_ERROR.message.blocked.some((message) => e.message.includes(message))) {
          openGrantCameraPermissionDocument();
        }

        if (CAMERA_ERROR.name.blocked.includes(e.name)) {
          setCameraState('Blocked');
        }

        if (CAMERA_ERROR.name.blocked.includes(e.name)) {
          setCameraState('Blocked');
        }
      })
      .finally(() => {
        setLoadingGrantPermission(false);
      });
  }, [loadingGrantPermission]);

  const renderCameraItem = useCallback(
    (_item: VideoDeviceInfo, _selected: boolean) => (
      <div className={classNames(`${prefixCls}-camera-item`)}>
        <BackgroundIcon
          type='phosphor'
          phosphorIcon={Camera}
          weight='fill'
          size='sm'
          backgroundColor={token['gray-3']}
          shape='circle'
        />
        <div className={classNames(`${prefixCls}-camera-label`)}>{_item.label}</div>
        {_selected && (
          <div className={classNames(`${prefixCls}-camera-selected`)}>
            <Icon type='phosphor' phosphorIcon={CheckCircle} size='sm' weight='fill' />
          </div>
        )}
      </div>
    ),
    [prefixCls],
  );

  useEffect(() => {
    setSelected((prevState) => {
      if (!prevState) {
        return devices[0]?.key || '';
      }

      if (!devices.length) {
        return '';
      }

      const exists = devices.find((item) => prevState === item.key);

      if (exists) {
        return exists.key;
      }

      return devices[0]?.key || '';
    });
  }, [devices]);

  useEffect(() => {
    let amount = true;
    let checking = false;
    let interval: NodeJS.Timer;
    const updateDeviceList = () => {
      if (!checking && amount) {
        checking = true;
        navigator.mediaDevices.enumerateDevices().then((_devices) => {
          if (amount) {
            const filtered = filterVideoMediaFunction(_devices);
            if (filtered.length) {
              setDevices(filtered.map(convertFunction));
              clearInterval(interval);
            }
          }
          checking = false;
        });
      }
    };

    if (cameraState === 'Blocked') {
      inactiveModal(MODAL_ID);
    } else if (cameraState === 'Allowed') {
      interval = setInterval(() => {
        updateDeviceList();
      }, 1000);
    }

    return () => {
      amount = false;
    };
  }, [cameraState, inactiveModal]);

  useEffect(() => {
    let amount = true;
    let checking = false;

    setLoadingCamera(true);

    const checkPermission = async () => {
      if (checking) {
        return;
      }

      try {
        checking = true;
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (amount) {
          setCameraState('Allowed');
        }

        stream.getTracks().forEach((track) => {
          track.stop();
        });
      } catch (err) {
        const e = err as Error;
        if (amount) {
          if (CAMERA_ERROR.message.dismissed.some((message) => e.message.includes(message))) {
            // Block re-check
          }

          if (CAMERA_ERROR.name.blocked.includes(e.name)) {
            setCameraState('Blocked');
          }

          if (CAMERA_ERROR.name.notFound.includes(e.name)) {
            setCameraState('NotFound');
          }

          setLoadingCamera(false);
        }
      }

      checking = false;
    };

    if (open) {
      checkPermission().then();
    }

    return () => {
      amount = false;
    };
  }, [open]);

  return wrapSSR(
    <NoCompactStyle>
      <NoFormStyle status override>
        <SwModal
          {...restProps}
          wrapClassName={wrapClassNameExtended}
          id={mainId}
          className={classNames(hashId, className, prefixCls)}
          zIndex={mainZIndex}
          closable={false}
          destroyOnClose
          transitionName={transitionName}
        >
          <div className={classNames(`${prefixCls}-scanner`)}>
            {cameraState === 'Allowed' && constraints && (
              <QrReader
                className='qr-scanner-container'
                constraints={constraints}
                onResult={onScan}
                scanDelay={150}
                videoId={VIDEO_ID}
                videoContainerStyle={{ paddingTop: `${100 / ratio}%` }}
                setLoading={setLoadingCamera}
              />
            )}
          </div>
          <div className={classNameExtended}>
            <div className={classNames(`${prefixCls}-top-part`)}>
              <SwSubHeader
                center
                showBackButton
                paddingVertical
                onBack={_onClose}
                background='transparent'
                title={title}
                rightButtons={
                  rightIconProps
                    ? [rightIconProps]
                    : [{ icon: <Icon type='phosphor' phosphorIcon={Info} /> }]
                }
              />
              {description && (
                <div className={classNames(`${prefixCls}-description`)}>{description}</div>
              )}
            </div>
            <div
              className={classNames(`${prefixCls}-center-part`, {
                [`${prefixCls}-scan-error`]:
                  cameraState === 'Blocked' || cameraState === 'NotFound' || isError,
              })}
            >
              <div className={classNames(`${prefixCls}-left-part`)}>
                <div className={classNames(`${prefixCls}-top-left-conner`)} />
                <div className={classNames(`${prefixCls}-bottom-left-conner`)} />
              </div>
              <div className={classNames(`${prefixCls}-center-filter`)}>
                <div className={classNames(`${prefixCls}-center-overlay`)}>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    loadingCamera ? (
                      <div className={classNames(`${prefixCls}-loading-container`)}>
                        <ActivityIndicator size={token.controlHeightLG} />
                      </div>
                    ) : cameraState === 'Blocked' || cameraState === 'NotFound' ? (
                      <div className={classNames(`${prefixCls}-camera-block-container`)}>
                        <div className={classNames(`${prefixCls}-camera-block-content`)}>
                          <Icon
                            className={classNames(`${prefixCls}-camera-block-icon`)}
                            type='phosphor'
                            phosphorIcon={XCircle}
                            weight='fill'
                            customSize={`${token.sizeXL}px`}
                          />
                          <div className={classNames(`${prefixCls}-camera-block-text`)}>
                            {cameraState === 'Blocked' ? 'No camera access' : 'Can’t find camera'}
                          </div>
                        </div>
                      </div>
                    ) : (
                      overlay
                    )
                  }
                </div>
              </div>
              <div className={classNames(`${prefixCls}-right-part`)}>
                <div className={classNames(`${prefixCls}-top-right-conner`)} />
                <div className={classNames(`${prefixCls}-bottom-right-conner`)} />
              </div>
            </div>
            <div className={classNames(`${prefixCls}-bottom-part`)}>
              <div className={classNames(`${prefixCls}-footer`)}>
                {cameraState === 'Blocked' || cameraState === 'NotFound'
                  ? cameraState === 'Blocked' && (
                      <Button
                        onClick={onGrantPermission}
                        icon={<Icon type='phosphor' phosphorIcon={Info} weight='fill' />}
                        block
                        loading={loadingGrantPermission}
                      >
                        Grant camera access
                      </Button>
                    )
                  : footer || (
                      <>
                        <input
                          className={classNames(`${prefixCls}-hidden-input`)}
                          type='file'
                          onChange={onChangeFile}
                          accept='image/*'
                          ref={fileRef}
                        />
                        <Button
                          onClick={onOpenFile}
                          icon={<Icon type='phosphor' phosphorIcon={ImageSquare} weight='fill' />}
                          loading={loadingImage}
                          schema='secondary'
                        >
                          Upload from photos
                        </Button>
                        <SelectModal
                          items={devices}
                          itemKey='key'
                          selected={selected}
                          maskClosable
                          renderItem={renderCameraItem}
                          onSelect={setSelected}
                          id={selectCameraModalId}
                          zIndex={mainZIndex + 1}
                          customInput={customInput}
                          title='Select camera'
                          className={classNames(hashId, `${prefixCls}-camera-items-container`)}
                          getContainer={props.getContainer}
                          destroyOnClose
                        />
                      </>
                    )}
              </div>
            </div>
          </div>
        </SwModal>
      </NoFormStyle>
    </NoCompactStyle>,
  );
};

export default SwQrScanner;
