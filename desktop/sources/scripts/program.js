"use strict";

function Program(w,h)
{
  this.size = {h:40,v:30}
  this.w = w;
  this.h = h;
  this.s = "";
  this.r = ""; // Record

  this.locks = [];
  this.progs = [];
  this.glyphs = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","."];

  this.reset = function()
  {
    this.r = ""
    this.s = "";
    let y = 0;
    while(y < this.h){
      let x = 0;
      while(x < this.w){
        this.s += "."
        x += 1
      }
      y += 1;
    }
  }

  this.add = function(x,y,glyph)
  {
    if(x < 0 || x > pico.program.w-1 || y < 0 || y > pico.program.h-1 || !glyph){ return; }

    let index = this.index_at(x,y);

    this.s = this.s.substr(0, index)+glyph+this.s.substr(index+glyph.length);
  }

  this.remove = function(x,y)
  {
    this.add(x,y,".")
  }

  this.run = function()
  {
    this.unlock();
    this.progs = [] 

    // Find Programs
    let y = 0;
    while(y < this.h){
      let x = 0;
      while(x < this.w){
        let g = this.glyph_at(x,y)
        if(this.is_prog(g)){
          this.progs.push(new window[`program_${g.toUpperCase()}`](x,y))
        }
        x += 1
      }
      y += 1;
    }

    // Operate
    for(let id in this.progs){
      let p = this.progs[id]
      if(this.is_locked(p.x,p.y)){ continue; }
      p.run()
    }

    this.record();

    this.s = this.s.substr(0,this.w*this.h)
  }

  this.clear = function()
  {
    this.r = "";
  }

  this.is_prog = function(g)
  {
    return this.glyphs.indexOf(g) >= 9 && this.glyphs.indexOf(g) <= 35 && window[`program_${g.toUpperCase()}`]
  }

  this.glyph_at = function(x,y,req = null)
  {
    return this.s.charAt(this.index_at(x,y))
  }

  this.glyph_like_at = function(x,y,target)
  {
    return this.s.charAt(this.index_at(x,y)) == target ? true : null
  }

  this.index_at = function(x,y)
  {
    return x + (this.w * y);
  }

  // Locks

  this.is_locked = function(x,y)
  {
    return this.locks.indexOf(`${x}:${y}`) > -1;
  }

  this.unlock = function()
  {
    this.locks = [];
  }

  this.lock = function(x,y)
  {
    this.locks.push(`${x}:${y}`);
  }

  // Tools

  this.output = function()
  {
    let origin = this.s.replace(/[^0-9a-z]/gi,".")
    let lines = origin.match(/.{1,39}/g)
    let s = ""
    for(let id in lines){
      s += lines[id]+'\n'
    }
    return s
  }

  this.record = function()
  {
    let g = this.s.substr(-1,1)
    let last_g = this.r.substr(-1,1)
    if(g == "." && last_g == "."){ return; }
    this.r += g;

    // Trim
    if(this.r.length >= pico.program.size.h){
      this.r = this.r.substr(-pico.program.size.h+1,pico.program.size.h)
    }
  }

  this.debug = function()
  {
    let s = "";
    for(let id in this.glyphs){
      let g = this.glyphs[id];
      if(window[`program_${g.toUpperCase()}`]){
        let program = new window[`program_${g.toUpperCase()}`]();
        s += `${g}: ${program.docs()}\n`;
      }
      else{
        s += `${g}: Missing\n`;
      }
    }
    console.log(s)
  }
}