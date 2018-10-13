"use strict"

const blessed  = require('blessed');

function Terminal(pico)
{  
  this.pico = pico

  this._screen = blessed.screen();
  this._grid = blessed.box({ top: 1, left: 2, height: '100%-3', width: pico.w, keys: true, mouse: true, style: { fg: '#efefef' } });
  this._output = blessed.box({ bottom: 4, left: 2, height: 1, width: '100%-2', style: { fg: '#fff' } });
  this._inspector = blessed.box({ bottom: 2, left: 2, height: 1, width: '100%-4', style: { fg: '#efefef' } });
  this._log = blessed.box({ bottom: 3, left: 2, height: 1, width: '100%-4', style: { fg: '#efefef' } });

  this.is_paused = false

  this.cursor = {
    x: 0, y: 0,
    move: function (x, y) {
      this.x = clamp(this.x+x, 0, pico.w - 1)
      this.y = clamp(this.y-y, 0, pico.h - 1)
    },
    insert: function (g) {
      if(!pico.is_allowed(g)){ console.log(`#${g} not allowed`); return; }
      pico.add(this.x, this.y, g)
    },
    inspect: function () {
      const g = pico.glyph_at(this.x, this.y)
      return pico.docs[g] ? pico.docs[g] : '>' 
    }
  }

  this.install = function()
  {
    this._screen.append(this._grid);
    this._screen.append(this._output);
    this._screen.append(this._inspector);
    this._screen.append(this._log);
  }

  this.start = function(path)
  {
    this.pico.start()
    this._screen.key(['escape', 'C-c'], (ch, key) => (process.exit(0)));    
    this._screen.key(['up'], (ch, key) => { this.cursor.move(0,1); this.update(); }); 
    this._screen.key(['down'], (ch, key) => { this.cursor.move(0,-1); this.update(); }); 
    this._screen.key(['right'], (ch, key) => { this.cursor.move(1,0); this.update(); }); 
    this._screen.key(['left'], (ch, key) => { this.cursor.move(-1,0); this.update(); }); 

    this._screen.on('keypress', (key)=>{ 
      if(!key){ return; }
      const g = key.substr(0,1)
      if(!this.pico.is_allowed(g)){ console.log(`#${g} not allowed`); return; }
      this.cursor.insert(g)
    });

    if(path){
      this.load(path)
    }

    this.update()
    setInterval(() => { this.run() }, 200)
  }

  this.run = function()
  {
    if (this.is_paused && !force) { return }

    this.pico.run()
    this.f += 1
    this.update()
  }

  this.pause = function () {
    this.is_paused = !this.is_paused
  }

  this.load = function(path)
  {
    const terminal = this
    var fs = require('fs')
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) throw err;
      const w = data.split("\n")[0].length
      const h = data.split("\n").length
      terminal.log(`Loaded: ${path} ${w}x${h}`)
      pico.load(w,h,data)
      terminal.update()
    });
  }

  this.log = function(msg)
  {
    this._log.setContent(msg)
    this.update()
  }

  this.add_cursor = function(s)
  {
    const index = this.pico.index_at(this.cursor.x, this.cursor.y)
    return s.substr(0, index) + "@" + s.substr(index + 1)
  }

  this.update = function(sight)
  {
    const s = this.pico.s

    this._grid.setContent(`${this.add_cursor(s)}`)
    this._inspector.setContent(`${this.cursor.inspect()}`)
    this._screen.render();
  }

  // Events

  this.on_submit = function(text)
  {
    this.query(text);
    this._icon.setContent(":");
    this._input.clearValue();
    this._input.focus();
    this._screen.render();
  }
  function clamp (v, min, max) { return v < min ? min : v > max ? max : v }
}

module.exports = Terminal
