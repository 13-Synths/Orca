'use strict'

function Fn (pico, x, y, glyph = '.', passive = false) {
  this.name = 'unknown'
  this.x = x
  this.y = y
  this.passive = passive
  this.draw = true
  this.glyph = passive ? glyph.toUpperCase() : glyph
  this.info = '--'
  this.ports = { input: {}, haste: {}, bang: !passive }

  // Actions

  this.listen = function (port, toValue = false) {
    const g = pico.glyphAt(this.x + port.x, this.y + port.y)
    return toValue ? pico.valueOf(g) : g
  }

  this.output = function (g) {
    pico.add(this.x + this.ports.output.x, this.y + this.ports.output.y, g)
  }

  // Phases

  this.permissions = function () {
    for (const id in this.ports.haste) {
      const port = this.ports.haste[id]
      pico.lock(this.x + port.x, this.y + port.y)
    }
    for (const id in this.ports.input) {
      const port = this.ports.input[id]
      pico.lock(this.x + port.x, this.y + port.y)
    }
    if (this.ports.output && !this.ports.output.unlock) {
      pico.lock(this.x + this.ports.output.x, this.y + this.ports.output.y)
    }
  }

  this.haste = function () {
  }

  this.run = function () {
  }

  // Helpers

  this.lock = function () {
    pico.lock(this.x, this.y)
  }

  this.replace = function (g) {
    pico.add(this.x, this.y, g)
  }

  this.remove = function () {
    this.replace('.')
  }

  this.explode = function () {
    this.replace('*')
    this.lock()
  }

  this.move = function (x, y, g) {
    const offset = { x: this.x + x, y: this.y + y }
    if (!pico.inBounds(offset.x, offset.y)) { this.explode(); return }
    if (pico.glyphAt(offset.x, offset.y) !== '.') { this.explode(); return }
    this.remove()
    this.x += x
    this.y += y
    this.replace(this.glyph)
  }

  this.bang = function () {
    if (pico.glyphAt(this.x + 1, this.y) === '*') { return { x: 1, y: 0 } }
    if (pico.glyphAt(this.x - 1, this.y) === '*') { return { x: -1, y: 0 } }
    if (pico.glyphAt(this.x, this.y + 1) === '*') { return { x: 0, y: 1 } }
    if (pico.glyphAt(this.x, this.y - 1) === '*') { return { x: 0, y: -1 } }
    return false
  }

  // Docs

  this._ports = function () {
    let ports = ''
    if (Object.keys(this.ports.haste).length > 0) {
      for (const name in this.ports.haste) {
        ports += `'${name}, `
      }
    }
    if (Object.keys(this.ports.input).length > 0) {
      for (const name in this.ports.input) {
        ports += `${name}, `
      }
    }
    return ports !== '' ? '(' + ports.substr(0, ports.length - 2) + ')' : ''
  }

  this.docs = function () {
    let html = ''
    const ports = this._ports()

    return `\`${this.glyph.toUpperCase()}\` **${this.name}**${ports}: ${this.info}`
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

module.exports = Fn
