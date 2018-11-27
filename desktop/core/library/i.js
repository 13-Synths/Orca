'use strict'

const Operator = require('../operator')

function OperatorI (orca, x, y, passive) {
  Operator.call(this, orca, x, y, 'i', passive)

  this.name = 'increment'
  this.info = 'Increments southward operator.'

  this.ports.input.min = { x: 1, y: 0 }
  this.ports.input.max = { x: 2, y: 0 }
  this.ports.output = { x: 0, y: 1 }

  this.run = function () {
    const min = this.listen(this.ports.input.min, true)
    const max = this.listen(this.ports.input.max, true)
    const mod = this.listen(this.ports.output, true)
    const key = mod + 1 >= (max || 10) ? min : mod + 1
    const res = orca.keyOf(key)
    this.output(`${res}`)
  }
}

module.exports = OperatorI
