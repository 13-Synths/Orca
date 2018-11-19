'use strict'

const Fn = require('../fn')

function FnR (pico, x, y, passive) {
  Fn.call(this, pico, x, y, 'r', passive)

  this.name = 'random'
  this.info = 'Outputs a random value.'

  this.ports.input.min = { x: 1, y: 0 }
  this.ports.input.max = { x: 2, y: 0 }
  this.ports.output = { x: 0, y: 1 }

  this.run = function () {
    const min = this.listen(this.ports.input.min, true)
    const max = this.listen(this.ports.input.max, true)
    const key = parseInt((Math.random() * (max - min)) + min)
    const res = pico.allowed[key] ? pico.allowed[key] : 0
    this.output(`${res}`)
  }
}

module.exports = FnR
