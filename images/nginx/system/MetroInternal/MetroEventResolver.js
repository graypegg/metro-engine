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
      this.deferred.forEach((def) => {
        if (def.type === 'void') {
          def.fn(this.content)
        } else if (def.type === 'transform') {
          this.content = Object.assign({}, this.content, def.fn(this.content))
        }
      })
    }
  }

  cancel (data) {
    this.content = null
    this.deferred = []
    this.alive = false
  }

  do (fn) {
    this.deferred.push({
      type: 'void',
      fn
    })
    return this
  }

  transform (fn) {
    this.deferred.push({
      type: 'transform',
      fn
    })
    return this
  }
}

module.exports = MetroEventResolver
