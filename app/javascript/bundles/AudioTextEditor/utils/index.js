export const isBetween = (current, start, end) => {
  return current >= start && current <= end;
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
export const newUuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
