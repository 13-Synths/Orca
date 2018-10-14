'use strict'

const FnBase = require('./_base')

function FnX (pico, x, y) {
  FnBase.call(this, pico, x, y)

  this.name = 'split'
  this.glyph = 'x'
  this.info = 'Bangs eastward when westward fn is 0, and southward when fn is 1.'
  this.ports = [{ x: -1, y: 0 }, { x: 0, y: 1, output: true }, { x: 1, y: 0, output: true }]

  this.operation = function () {
    if (this.west('0')) {
      this.fire(1, 0)
    }
    if (this.west('1')) {
      this.fire(0, 1)
    }
  }

  this.fire = function (x, y) {
    pico.add(this.x + x, this.y + y, 'b')
    pico.lock(this.x + x, this.y + y)
  }
}

module.exports = FnX
