'use strict'

const FnBase = require('./_base')

function FnBang (pico, x, y, passive) {
  FnBase.call(this, pico, x, y, '*', true)

  this.name = 'bang'
  this.info = 'Bangs!'

  this.haste = function () {
    this.remove()
  }
}

module.exports = FnBang
