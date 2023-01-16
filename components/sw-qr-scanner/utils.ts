export const isMediaDevicesSupported = () => {
  const _isMediaDevicesSupported = typeof navigator !== 'undefined' && !!navigator.mediaDevices;

  if (!_isMediaDevicesSupported) {
    console.warn(
      `[QrReader]: MediaDevices API has no support for your browser. You can fix this by running "npm i webrtc-adapter"`,
    );
  }

  return _isMediaDevicesSupported;
};

export const isValidType = (value: any, name: string, type: string) => {
  // eslint-disable-next-line valid-typeof
  const isValid = typeof value === type;

  if (!isValid) {
    console.warn(`[QrReader]: Expected "${name}" to be a of type "${type}".`);
  }

  return isValid;
};
