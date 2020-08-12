import Vue from 'vue'


Vue.prototype.$fixedNum = (num: number, limit = 2) => {
  if (typeof num !== 'number') return num;
  return num.toFixed(limit)
}


Vue.prototype.$setgoindex = () => {
  console.log(window.history)
  if (window.history.length <= 1) {
    if (location.href.indexOf('?') === -1) {
      window.location.href = location.href + '?goindex=true'
    } else if (location.href.indexOf('?') !== -1 && location.href.indexOf('goindex') === -1) {
      window.location.href = location.href + '&goindex=true'
    }
  }
}