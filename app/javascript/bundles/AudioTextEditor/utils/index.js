export const isBetween = (current, start, end) => {
  return current > start && current <= end;
}
export const getUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIE = !!ua.match(/msie|trident\/7|edge/);
  const isWinPhone = ua.indexOf('windows phone') !== -1;
  const isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);
  return { isIE, isWinPhone, isIOS }
}

export const isIE = () => getUserAgent().isIE;
export const isIOS = () => getUserAgent().isIOS;

