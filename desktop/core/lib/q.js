'use strict'

const FnBase = require('./_base')

function FnQ (pico, x, y, passive) {
  FnBase.call(this, pico, x, y, passive)

  this.name = 'even'
  this.glyph = 'q'
  this.info = '[FIX]Adds 1 southward, transforms into O on bang.'
  this.ports = [{ x: 0, y: 0, bang: true }, { x: 0, y: 1, output: true }]

  this.operation = function () {
    if (this.bang()) {
      this.replace('o')
    }
    pico.add(this.x, this.y + 1, '1')
  }
}

module.exports = FnQ
