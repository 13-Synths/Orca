'use strict'

const FnBase = require('./_base')

function FnV (pico, x, y, isPassive) {
  FnBase.call(this, pico, x, y, 'v', isPassive)

  this.name = 'beam'
  this.info = 'Bang the nearest southward fn.'

  this.ports.output = { x: 0, y: 1 }

  this.haste = function () {
    while (pico.inBounds(this.x + this.ports.output.x, this.y + this.ports.output.y)) {
      this.ports.output.y += 1
      if (this.listen(this.ports.output) !== '.' && this.listen(this.ports.output) !== '*') { break }
    }
    this.ports.output.y -= 1
  }

  this.operation = function () {
    this.output(`*`)
  }
}

module.exports = FnV
