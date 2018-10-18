'use strict'

const FnBase = require('./_base')

function FnM (pico, x, y) {
  FnBase.call(this, pico, x, y)

  this.type = 'math'
  this.name = 'modulo'
  this.glyph = 'm'
  this.info = 'Creates the result of the modulo operation of east and west fns, southward.'
  this.ports = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1, output: true }]

  this.haste = function () {
    pico.lock(this.x, this.y + 1)
    pico.lock(this.x + 1, this.y)
    pico.lock(this.x - 1, this.y)
  }

  this.operation = function () {
    const w = this.west()
    const e = this.east()
    const west = !w ? '0' : w.glyph
    const east = !e ? '0' : e.glyph

    const val = pico.allowed.indexOf(west)
    const mod = pico.allowed.indexOf(east) !== 0 ? pico.allowed.indexOf(east) : '1'

    pico.add(this.x, this.y + 1, `${parseInt(val) % parseInt(mod)}`)
  }
}

module.exports = FnM
