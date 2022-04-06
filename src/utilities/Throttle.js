class Throttle {
  constructor() {
    this.timer = null
    this.delay = 500
  }

  setTimer (fn) {
    if (!!this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.timer = setTimeout(() => {
      fn && fn()
    }, this.delay);
  }
}

export default Throttle