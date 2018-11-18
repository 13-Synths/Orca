# Pico

[Not much is known](http://wiki.xxiivv.com/Pico) about the machine, but it seems to be reacting to our presence.

<img src='https://raw.githubusercontent.com/hundredrabbits/Pico/master/PREVIEW.jpg' width="600"/>

## Functions

### alpha functions

- `A` **add**(a, b): Outputs the sum of inputs.
- `B` **banger**(val): Bangs if input is `1`, `N`, `S`, `W` or `E`.
- `C` **clock**(min, max): Outputs a constant value based on the runtime frame.
- `D` **unknown**: --
- `E` **east**: Moves eastward, or bangs.
- `F` **if**(a, b): Outputs `1` if inputs are equal, otherwise `0`.
- `G` **generator**: Outputs `S` on bang.
- `H` **halt**: Stops southward fn from operating.
- `I` **increment**(min, max, mod): Increments southward fn.
- `J` **jump**(val): Outputs the northward fn.
- `K` **kill**: Kills southward fn.
- `L` **loop**('len): Loop a number of eastward fns.
- `M` **modulo**(val, mod): Outputs the modulo of inputs.
- `N` **north**: Moves Northward, or bangs.
- `O` **offset**('x, 'y, val): Reads a distant fn with offset.
- `P` **push**: Pushes direction fns away.
- `Q` **count**('len): Count the number of fns present eastwardly.
- `R` **random**(min, max): Outputs a random value.
- `S` **south**: Moves southward, or bangs.
- `U` **track**('len, 'key, val): Outputs character at eastward position with offset.
- `U` **unknown**: --
- `V` **beam**: Bangs the nearest southward fn.
- `W` **west**: Moves westward, or bangs.
- `X` **unknown**: --
- `Y` **type**(a, b): Compares the type(num/alpha/special) of inputs, and return `1` or `0`.
- `Z` **unknown**: --

### special functions

- `.` **null**: void
- `*` **bang**: Bangs!
- `:` **midi**(channel, octave, note): Sends Midi
- `;` **comment**: Block Comment

## Midi Output

The midi special function is `:000`, it requires 3 inputs(channel, octave, note). For example, `:25C`, is a **C note, on the 5th octave, through the 3rd MIDI channel**, `:04c`, is a **C# note, on the 4th octave, through the 1st MIDI channel**.

## Install

```
cd desktop
npm install
npm start
```

## Ports Specs

```
Haste < Function > Input(s)
           v
        Output
```

- **Haste port** values are collected before runtime.
- **Inputs** are collected at normal runtime.
- **Outputs**.

## Extras

- This application supports the [Ecosystem Theme](https://github.com/hundredrabbits/Themes).
- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
- Pull Requests are welcome!
