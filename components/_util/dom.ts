// eslint-disable-next-line import/prefer-default-export
export const waitForElement = (selector: string, callback: (element: Element) => any) => {
  let count = 0;
  const interval = setInterval(() => {
    try {
      const element = document.querySelector(selector);

      if (element) {
        clearInterval(interval);
        callback(element);
      } else {
        count++;

        if (count >= 10) {
          clearInterval(interval);
        }
      }
    } catch (e) {
      clearInterval(interval);
    }
  }, 100);
};
