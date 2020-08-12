const App = {
  logEvent(opts) {
    console.log(opts);
  }
}

App.install = (Vue, options) => {
  Vue.prototype.$app = {
    logEvent: App.logEvent
  }
}

export default App;