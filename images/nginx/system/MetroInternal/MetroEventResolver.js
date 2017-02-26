class MetroEventResolver {
  constructor ( fn ) {
    this.content = null
    this.deferred = []
    this.alive = true

    try {
      fn(this.update.bind(this), this.cancel.bind(this))
    } catch (e) {
      this.cancel()
    }
  }

  update (data) {
    if (this.alive) {
      this.content = data
      this.deferred.forEach((fn) => {
        fn(this.content)
      })
    }
  }

  cancel (data) {
    this.content = null
    this.deferred = []
    this.alive = false
  }

  do (fn) {
    this.deferred.push(fn)
    return this
  }
}

module.exports = MetroEventResolver
