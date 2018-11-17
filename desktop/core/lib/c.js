'use strict'

const FnBase = require('./_base')

function FnC (pico, x, y, isPassive) {
  FnBase.call(this, pico, x, y, 'c', isPassive)

  this.name = 'clock'
  this.info = 'Adds a constant value southward.'

  this.ports.input.min = { x: 1, y: 0 }
  this.ports.input.max = { x: 2, y: 0 }
  this.ports.output = true

  this.operation = function () {
    const min = this.listen(this.ports.input.min, true)
    const max = this.listen(this.ports.input.max, true)
    const key = (pico.f % max) + min
    const res = pico.allowed[key] ? pico.allowed[key] : 0
    this.output(`${res}`)
  }
}

module.exports = FnC
