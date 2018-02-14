function program_S(x,y)
{
  Program_Default.call(this,x,y);

  this.name = "shift"
  this.glyph = "s";

  this.operation = function()
  {
    var n = this.neighbor();

    if(n && n.glyph == "r"){
      pico.program.add(n.x,n.y,"d");
    }
    if(n && n.glyph == "d"){
      pico.program.add(n.x,n.y,"l");
    }
    if(n && n.glyph == "l"){
      pico.program.add(n.x,n.y,"u");
    }
    if(n && n.glyph == "u"){
      pico.program.add(n.x,n.y,"r");
    }
  }
}