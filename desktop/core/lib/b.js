'use strict'

const FnBase = require('./_base')

function FnB (pico, x, y, passive) {
  FnBase.call(this, pico, x, y, 'b', passive)
}

module.exports = FnB
