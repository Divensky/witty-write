/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce(f: (...args: any[]) => any, DELAY: number = 300) {
  let timeoutID: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      f.apply(this, args);
    }, DELAY);
  };
}
