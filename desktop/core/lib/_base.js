'use strict'

function FnBase (pico, x, y, glyph = '.', isPassive = false) {
  this.x = x
  this.y = y
  this.isPassive = isPassive
  this.name = 'unknown'
  this.glyph = isPassive ? glyph.toUpperCase() : glyph
  this.info = '--'
  this.ports = { input: {}, haste: {}, bang: null }
  this.docs = 'Hello!'

  if (!isPassive) {
    this.ports.bang = true
  }

  this.id = function () {
    return this.x + (this.y * pico.h)
  }

  this.listen = function (port, toValue = false) {
    const g = pico.glyphAt(this.x + port.x, this.y + port.y)
    return toValue ? pico.toValue(g) : g
  }

  this.output = function (g) {
    pico.add(this.x + this.ports.output.x, this.y + this.ports.output.y, g)
  }

  // Lock Ports
  this.locks = function () {
    for (const id in this.ports.haste) {
      const port = this.ports.haste[id]
      pico.lock(this.x + port.x, this.y + port.y)
    }
    for (const id in this.ports.input) {
      const port = this.ports.input[id]
      pico.lock(this.x + port.x, this.y + port.y)
    }
    if (this.ports.output) {
      pico.lock(this.x, this.y + 1)
    }
  }

  this.haste = function () {

  }

  this.run = function () {
    this.operation()
  }

  this.operation = function () {

  }

  this.remove = function () {
    this.replace('.')
  }

  this.replace = function (g) {
    pico.add(this.x, this.y, g)
  }

  this.lock = function () {
    pico.lock(this.x, this.y)
  }

  this.move = function (x, y, g) {
    pico.lock(this.x + x, this.y + y)
    pico.remove(this.x, this.y)
    pico.add((this.x + x) % pico.w, (this.y + y) % pico.h, this.glyph)
  }

  this.isFree = function (x, y) {
    if (this.x + x >= pico.w) { return false }
    if (this.x + x <= -1) { return false }
    if (this.y + y >= pico.h) { return false }
    if (this.y + y <= -1) { return false }

    const target = pico.glyphAt(this.x + x, this.y + y)
    return target === '.' || target === '*' ? true : target
  }

  this.toValue = function (g = '0') {
    return g ? clamp(pico.valueOf(g), 0, pico.allowed.length) : 0
  }

  this.toChar = function (index = 0) {
    return index && pico.allowed[index] ? pico.allowed[index] : '0'
  }

  this.neighbor_by = function (x, y) {
    return pico.glyphAt(this.x + x, this.y + y) !== '.' ? { x: this.x + x, y: this.y + y, glyph: pico.glyphAt(this.x + x, this.y + y) } : null
  }

  this.neighbors = function (g) {
    return [this.north(g), this.east(g), this.south(g), this.west(g)].filter(function (e) { return e })
  }

  this.free_neighbors = function () {
    const a = []
    if (pico.glyphAt(this.x + 1, this.y) === '.') { a.push({ x: this.x + 1, y: this.y }) }
    if (pico.glyphAt(this.x - 1, this.y) === '.') { a.push({ x: this.x - 1, y: this.y }) }
    if (pico.glyphAt(this.x, this.y + 1) === '.') { a.push({ x: this.x, y: this.y + 1 }) }
    if (pico.glyphAt(this.x, this.y - 1) === '.') { a.push({ x: this.x, y: this.y - 1 }) }
    return a
  }

  this.bang = function () {
    const ns = this.neighbors('*')
    for (const id in ns) {
      const n = ns[id]
      return { x: n.x, y: n.y }
    }
    return false
  }

  this.west = function (target = null) {
    const g = pico.glyphAt(this.x - 1, this.y)

    return g !== '.' && (g === target || !target) ? { x: this.x - 1, y: this.y, glyph: g } : null
  }

  this.east = function (target) {
    const g = pico.glyphAt(this.x + 1, this.y)
    return g !== '.' && (g === target || !target) ? { x: this.x + 1, y: this.y, glyph: g } : null
  }

  this.north = function (target) {
    const g = pico.glyphAt(this.x, this.y - 1)
    return g !== '.' && (g === target || !target) ? { x: this.x, y: this.y - 1, glyph: g } : null
  }

  this.south = function (target) {
    const g = pico.glyphAt(this.x, this.y + 1)
    return g !== '.' && (g === target || !target) ? { x: this.x, y: this.y + 1, glyph: g } : null
  }

  this.docs = function () {
    let html = ''
    let ports = ''

    if (Object.keys(this.ports.haste).length > 0) {
      for (const name in this.ports.haste) {
        ports += `'${name}, `
      }
    }

    for (const name in this.ports.input) {
      ports += `${name}, `
    }

    return `\`${this.glyph.toUpperCase()}\` **${this.name}**${ports !== '' ? '(' + ports.substr(0, ports.length - 2) + ')' : ''}: ${this.info}`
  }

  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

module.exports = FnBase
