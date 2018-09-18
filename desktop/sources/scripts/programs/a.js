"use strict";

function program_A(x,y)
{
  Program_Default.call(this,x,y);

  this.name = "add"
  this.glyph = "a";
  this.ports = [{x:-1,y:0},{x:1,y:0},{x:0,y:1,output:true}];

  this.operation = function()
  {
    if(!this.left() || !this.right()){
      pico.program.remove(this.x,this.y+1);
      return;
    }

    let left = !this.left() ? "0" : this.left().glyph 
    let right = !this.right() ? "0" : this.right().glyph

    let index = (this.convert(left) + this.convert(right)) % pico.program.glyphs.length
    let output = pico.program.glyphs[index]

    pico.program.add(this.x,this.y+1,output);
  }

  this.convert = function(glyph)
  {
    return pico.program.glyphs.indexOf(glyph)
  }
}