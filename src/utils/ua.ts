const ua = window.navigator.userAgent.toLowerCase()
const __ua = window.navigator.userAgent;

export const ios = (() => {
  return /iphone|ipad|ipod/.test(ua)
})()

export const android = (() => {
  return /android/.test(ua)
})()

export const qqnews = (() => {
  return /qqnews/.test(ua)
})()

export const weixin = (() => {
  return /micromessenger/.test(ua)
})()

export const tvideo = (() => {
  return /qqlivebrowser/.test(ua)
})()

export const qq = (() => {
  return /qq\//.test(ua)
})()

export const mobile = (() => {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
})

export const pc = (() => {
  let res = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  return !res;
})()