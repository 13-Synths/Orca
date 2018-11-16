'use strict'

const FnBase = require('./_base')

function FnE (pico, x, y, passive) {
  FnBase.call(this, pico, x, y, 'e', passive)

  this.name = 'east'
  this.info = 'Moves eastward, or bangs.'

  this.haste = function () {
    if (this.isFree(1, 0) !== true) { this.replace('*'); this.lock(); return }
    this.move(1, 0)
  }
}

module.exports = FnE
