import { BrowserQRCodeReader } from '@zxing/browser';
import { UseSelectQrImageHook, SelectQrImageHookProps } from 'antd/es/sw-qr-scanner/types';
import jsQR from 'jsqr';
import { ChangeEventHandler, useCallback, useState } from 'react';

const useSelectQrImage: UseSelectQrImageHook = ({ type, onResult }: SelectQrImageHookProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setLoading(true);
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const codeReader = new BrowserQRCodeReader();
        const reader = new FileReader();
        reader.onload = () => {
          if (type === 'jsqr') {
            const imgUrl = reader.result as string;
            const img = document.createElement('img');

            img.onload = null;
            img.src = imgUrl;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const width = img.naturalWidth;
              const height = img.naturalHeight;
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d')!;
              ctx.drawImage(img, 0, 0, width, height);
              const imageData = ctx.getImageData(0, 0, width, height);
              const qr = jsQR(imageData.data, imageData.width, imageData.height);
              if (qr) {
                onResult(qr, null);
              } else {
                onResult(null, new Error('Invalid QR code, please try again'));
              }

              setLoading(false);
            };
          } else if (type === 'zxing') {
            codeReader
              .decodeFromImageUrl(reader.result as string)
              .then((value) => {
                onResult(value, null);
              })
              .catch((error: Error) => {
                if (error.name === 'NotFoundException' || !error.message) {
                  error.message = 'Invalid QR code, please try again';
                }
                onResult(null, error);
              })
              .finally(() => {
                setLoading(false);
              });
          }
        };
        reader.readAsDataURL(file);
      } else {
        setLoading(false);
      }
    },
    [onResult, type],
  );

  return {
    imageLoading: loading,
    onFileChange: onChangeFile,
  };
};

export default useSelectQrImage;
