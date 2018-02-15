function Pico()
{
  this.el = document.createElement("app");

  this.program = new Program(64,48);
  this.grid = new Grid();

  this.install = function()
  {
    this.grid.install(this.el);
    this.program.reset();
    document.body.appendChild(this.el)
  }

  this.start = function()
  {
    this.program.add(4,2,"i");
    this.program.add(4,3,"1");
    this.program.add(4,4,"t");
    this.program.add(4,6,"g");
    this.program.add(5,8,"o");

    setInterval(() => { this.run(); }, 200)
  }

  this.f = 0;

  this.run = function()
  {
    this.program.run();
    this.grid.update();
    this.f += 1;
  }
}