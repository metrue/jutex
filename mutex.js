class Mutex {
  constructor() {
    this.queue = []

    this._locked = false
  }

  // eslint-disable-next-line
  async aquire(fn = (err, value) => {}, acc = {}) {
    if (typeof fn !== 'function') {
      throw new Error('param should be a function')
    }

    if (this._locked) {
      this.queue.push(fn)
    } else {
      this._release(fn, acc)
    }
  }

  async _release(fn, acc = {}) {
    this._locked = true
    const cur = await this._call(fn, acc)
    this._locked = false

    if (this.queue.length > 0) {
      await this.aquire(this.queue.shift(), cur)
    }
  }

  async _call(fn, acc) {
    let value
    let error
    try {
      value = await fn(acc.error, acc.value)
    } catch (e) {
      error = e
    }
    return { error, value }
  }
}

module.exports = Mutex
