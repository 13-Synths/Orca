'use strict'

function FnBase (pico, x, y) {
  this.x = x
  this.y = y
  this.name = '<missing name>'
  this.glyph = '.'
  this.info = 'Missing docs.'
  this.ports = []
  this.docs = 'Hello!'

  this.id = function () {
    return this.x + (this.y * pico.h)
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

  this.is_free = function (x, y) {
    if (this.x + x >= pico.w) { return false }
    if (this.x + x <= -1) { return false }
    if (this.y + y >= pico.h) { return false }
    if (this.y + y <= -1) { return false }

    const target = pico.glyphAt(this.x + x, this.y + y)
    return target === '.' || target === 'b' ? true : target
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
    const ns = this.neighbors('b')
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
    return `${this.name}: ${this.info}`
  }
}

module.exports = FnBase
