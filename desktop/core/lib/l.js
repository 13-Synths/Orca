'use strict'

const Fn = require('../fn')

function FnL (pico, x, y, passive) {
  Fn.call(this, pico, x, y, 'l', passive)

  this.name = 'loop'
  this.info = 'Loops a number of eastward fns.'

  this.ports.haste.len = { x: -1, y: 0 }

  this.haste = function () {
    this.len = this.listen(this.ports.haste.len, true)

    for (let x = 1; x <= this.len; x++) {
      pico.lock(this.x + x, this.y)
    }
  }

  this.run = function () {
    if (!this.len || this.len < 1) { return }

    const a = []
    for (let x = 1; x <= this.len; x++) {
      a.push(pico.glyphAt(this.x + x, this.y))
    }
    a.push(a.shift())

    for (const id in a) {
      const x = parseInt(id) + 1
      pico.add(this.x + x, this.y, a[id])
    }
  }
}

module.exports = FnL
