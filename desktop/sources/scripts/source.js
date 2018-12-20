'use strict'

function Source (terminal) {
  const Orca = require('../../core/orca')
  const fs = require('fs')
  const { dialog, app } = require('electron').remote

  this.path = null

  this.new = function () {
    console.log('New')

    this.path = null

    terminal.orca = new Orca(terminal)
    terminal.resize()
    terminal.history.reset()
  }

  this.open = function () {
    console.log('Open')
    let paths = dialog.showOpenDialog(app.win, { properties: ['openFile'], filters: [{ name: 'Orca Machines', extensions: ['orca'] }] })
    if (!paths) { console.log('Nothing to load') }
    this.path = paths[0]
    this.read(paths[0])
  }

  this.save = function (as = false) {
    console.log('Save')
    if (this.path && !as) {
      this.write(this.path)
    } else {
      dialog.showSaveDialog((path) => {
        if (path === undefined) { return }
        if (path.indexOf('.orca') < 0) { path += '.orca' }
        terminal.source.write(path)
        terminal.source.path = path
      })
    }
  }

  this.revert = function () {
    console.log('Revert')
    this.read(this.path)
  }

  // I/O

  this.write = function (path) {
    fs.writeFile(path, this.generate(), (err) => {
      if (err) { alert('An error ocurred updating the file' + err.message); console.log(err) }
    })
  }

  this.read = function (path) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) throw err
      terminal.load(this.parse(data))
      terminal.history.record()
    })
  }

  // Converters

  this.generate = function (orca = terminal.orca) {
    return `${orca}`
  }

  this.parse = function (text) {
    const lines = text.split('\n')
    const w = lines[0].length
    const h = lines.length
    const s = lines.join('\n').trim()
    return new Orca(terminal).load(w, h, s)
  }

  // Etc

  this.name = function () {
    const parts = this.path.split('/')
    return parts[parts.length - 1].replace('.orca', '').trim()
  }

  this.toString = function () {
    return this.path ? this.name() : 'blank'
  }
}

module.exports = Source
