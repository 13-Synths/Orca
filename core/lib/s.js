'use strict'

const FnMove = require('./_move')

function FnS (pico, x, y) {
  FnMove.call(this, pico, x, y)

  this.name = 'south'
  this.glyph = 's'
  this.info = 'Moves southward, or bangs.'

  this.operation = function () {
    if (this.is_free(0, 1) != true) { this.replace('b'); this.lock(); return }
    this.move(0, 1)
  }
}

module.exports = FnS
