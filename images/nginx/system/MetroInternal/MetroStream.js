class MetroStream {
  constructor ( initiator ) {
    this.content = null
    this.deferred = []
    this.alive = true

    try {
      initiator(this.post.bind(this), this.kill.bind(this))
    } catch (e) {
      this.kill()
    }
  }

  /* Stream Actions */

  post (data) {
    if (this.alive) {
      this.content = data
      this.deferred.every((def) => {

        let safeContent = Object.assign({}, this.content)

        if (def.type === 'void') {
          def.fn(safeContent)
        } else if (def.type === 'void wait') {
          // Gotta figure this out...
          await (new Promise((res, rej) => def.fn(safeContent, res, rej) ))
        } else if (def.type === 'transform') {
          this.content = Object.assign({}, this.content, def.fn(safeContent))
        } else if (def.type === 'replace') {
          this.content = def.fn(safeContent)
        } else if (def.type === 'filter') {
          if (!def.fn(safeContent)) return false
        }

        return true
      })
    }
  }

  kill (data) {
    this.content = null
    this.deferred = []
    this.alive = false
  }

  /* Stream API */

  do (fn) {
    this.deferred.push({
      type: 'void',
      fn
    })
    return this
  }

  wait (fn) {
    this.deferred.push({
      type: 'void wait',
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

  replace (fn) {
    this.deferred.push({
      type: 'replace',
      fn
    })
    return this
  }

  filter (fn) {
    this.deferred.push({
      type: 'filter',
      fn
    })
    return this
  }
}

module.exports = MetroStream
