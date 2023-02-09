const DOCUMENT_URL = {
  camera_permission: 'https://subwallet.app/',
};

export const openGrantCameraPermissionDocument = () => {
  window.open(DOCUMENT_URL.camera_permission, '_blank');
};

export const changeCameraDocumentURL = (url: string) => {
  DOCUMENT_URL.camera_permission = url;
};
