'use strict'

const FnBase = require('./_base')

function FnJ (pico, x, y, isPassive) {
  FnBase.call(this, pico, x, y, 'j', isPassive)

  this.name = 'jump'
  this.info = 'Outputs the northward fn.'

  this.ports.input.val = { x: 0, y: -1 }
  this.ports.output = { x: 0, y: 1 }

  this.haste = function () {
    pico.lock(this.x, this.y + 1)
  }

  this.run = function () {
    const val = this.listen(this.ports.input.val)
    this.output(val)
  }
}

module.exports = FnJ
