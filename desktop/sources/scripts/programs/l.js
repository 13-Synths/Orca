function program_L(x,y)
{
  Program_Default.call(this,x,y);

  this.name = "left"
  this.glyph = "l";

  this.operation = function()
  {
    if(this.is_free(-1,0)){ return; }
    this.move(-1,0);
  }
}