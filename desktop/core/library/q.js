'use strict'

const Fn = require('../fn')

function FnQ (orca, x, y, passive) {
  Fn.call(this, orca, x, y, 'q', passive)

  this.name = 'count'
  this.info = 'Counts the number of fns present eastwardly.'

  this.ports.haste.len = { x: -1, y: 0 }
  this.ports.output = { x: 0, y: 1 }

  this.haste = function () {
    this.len = clamp(this.listen(this.ports.haste.len, true), 1, 16)

    for (let x = 1; x <= this.len; x++) {
      orca.lock(this.x + x, this.y)
    }
  }

  this.run = function () {
    let val = 0
    for (let x = 1; x <= this.len; x++) {
      if (orca.glyphAt(this.x + x, this.y) !== '.') { val++ }
    }
    this.output(`${orca.keyOf(val)}`)
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

module.exports = FnQ
