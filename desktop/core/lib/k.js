'use strict'

const FnBase = require('./_base')

function FnK (pico, x, y, isPassive) {
  FnBase.call(this, pico, x, y, 'k', isPassive)

  this.name = 'kill'
  this.info = 'Kills southward fn.'

  this.run = function () {
    pico.remove(this.x, this.y + 1)
  }
}

module.exports = FnK
