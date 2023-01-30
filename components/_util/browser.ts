// eslint-disable-next-line import/prefer-default-export

export type BrowserType =
  | 'Unknown'
  | 'Opera'
  | 'Firefox'
  | 'Safari'
  | 'IE'
  | 'Edge'
  | 'EdgeChromium'
  | 'Chrome'
  | 'Blink'
  | 'Brave';
export const detectBrowser = (): BrowserType => {
  // Opera 8.0+
  // @ts-ignore
  const isOpera =
    (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

  // Firefox 1.0+
  // @ts-ignore
  const isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  // @ts-ignore
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function (p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(!window.safari || (typeof safari !== 'undefined' && window.safari.pushNotification));

  // Internet Explorer 6-11
  // @ts-ignore
  const isIE = /* @cc_on!@ */ false || !!document.documentMode;

  // Edge 20+
  // @ts-ignore
  const isEdge = !isIE && !!window.StyleMedia;

  // Chrome 1 - 79
  // @ts-ignore
  const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  // Edge (based on chromium) detection
  const isEdgeChromium = isChrome && navigator.userAgent.indexOf('Edg') !== -1;

  // Blink engine detection
  const isBlink = (isChrome || isOpera) && !!window.CSS;

  // Brave
  // @ts-ignore
  const isBrave = window.navigator.brave && window.navigator.brave.isBrave.name === 'isBrave';

  if (isBrave) {
    return 'Brave';
  }

  if (isBlink) {
    return 'Blink';
  }

  if (isEdgeChromium) {
    return 'EdgeChromium';
  }

  if (isChrome) {
    return 'Chrome';
  }

  if (isEdge) {
    return 'Edge';
  }

  if (isIE) {
    return 'IE';
  }

  if (isSafari) {
    return 'Safari';
  }

  if (isFirefox) {
    return 'Firefox';
  }

  if (isOpera) {
    return 'Opera';
  }

  return 'Unknown';
};
