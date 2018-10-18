'use strict'

const FnBase = require('./_base')

function FnY (pico, x, y, passive) {
  FnBase.call(this, pico, x, y, 'y', passive)

  this.type = 'math'
  this.name = 'type'
  this.info = 'Compares the type(num/alpha/special) of westward and eastward fns, and return 1 or 0 southward.'
  this.ports.push({ x: -1, y: 0, input: true })
  this.ports.push({ x: 1, y: 0, input: true })
  this.ports.push({ x: 0, y: 1, output: true })

  this.haste = function () {
    pico.lock(this.x, this.y + 1)
    pico.lock(this.x + 1, this.y)
    pico.lock(this.x - 1, this.y)
  }

  this.operation = function () {
    const w = this.west()
    const e = this.east()
    if (!w && !this.east()) {
      pico.add(this.x, this.y + 1, '1')
    } else if ((w && !e) || (e && !w)) {
      pico.add(this.x, this.y + 1, '0')
    } else if ((w && !e) || (e && !w)) {
      pico.add(this.x, this.y + 1, '0')
    } else if (isNum(w.glyph) === isNum(e.glyph)) {
      pico.add(this.x, this.y + 1, '1')
    } else {
      pico.add(this.x, this.y + 1, '0')
    }
  }

  function isNum (c) {
    return pico.lib.num[c]
  }
}

module.exports = FnY
