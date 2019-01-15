# ORCΛ

<img src='https://raw.githubusercontent.com/hundredrabbits/Orca/master/resources/logo.png' width="600"/>

**Each letter of the alphabet is an operation**, lowercase letters operate on bang(`*`), uppercase letters operate each frame. Have a look at some project created with [#ORCΛ](https://twitter.com/hashtag/ORCΛ), or some [example files](https://github.com/hundredrabbits/Orca/tree/master/examples).

## Install & Run

You can download [builds for OSX, Windows and Linux](https://hundredrabbits.itch.io/orca), or if you wish to build it yourself, follow these steps:

```
git clone https://github.com/hundredrabbits/Orca.git
cd Orca/desktop/
npm install
npm start
```

<img src='https://raw.githubusercontent.com/hundredrabbits/Orca/master/resources/preview.jpg' width="600"/>

## Quickstart

You can follow the [guide](GUIDE.md) to get started and play your first sounds. You can see the [design notes](DESIGN.md) for specs and upcoming features.

## Operators

- `A` **add**(a, b): Outputs the sum of inputs.
- `B` **bool**(val): Bangs if input is not null.
- `C` **clock**('rate, mod): Outputs a constant value based on the runtime frame.
- `D` **delay**('rate, mod): Bangs on a fraction of the runtime frame.
- `E` **east**: Moves eastward, or bangs.
- `F` **if**(a, b): Bangs if both inputs are equal.
- `G` **generator**('x, 'y, 'len): Writes distant operators with offset.
- `H` **halt**: Stops southward operators from operating.
- `I` **increment**(min, max): Increments southward operator.
- `J` **jumper**(val): Outputs the northward operator.
- `K` **kill**: Kills southward operator.
- `L` **loop**('len): Loops a number of eastward operators.
- `M` **modulo**(val, mod): Outputs the modulo of input.
- `N` **north**: Moves Northward, or bangs.
- `O` **offset**('x, 'y, val): Reads a distant operator with offset.
- `P` **push**('len, 'key, val): Writes an eastward operator with offset.
- `Q` **query**('x, 'y, 'len): Reads distant operators with offset.
- `R` **random**(min, max): Outputs a random value.
- `S` **south**: Moves southward, or bangs.
- `T` **track**('len, 'key, val): Reads an eastward operator with offset.
- `U` **uturn**('n, 'e, 's, 'w): Reverses movement of inputs.
- `V` **variable**('write, read): Reads and write globally available variables.
- `W` **west**: Moves westward, or bangs.
- `X` **teleport**('x, 'y, val): Writes a distant operator with offset.
- `Y` **jymper**(val): Outputs the westward operator.
- `Z` **zoom**: Moves eastwardly, respawns west on collision.
- `*` **bang**: Bangs neighboring operators.
- `#` **comment**: Comments a line, or characters until the next hash.
- `:` **midi**('channel, 'octave, 'note, velocity, length): Sends Midi a midi note.
- `;` **udp**('len): Sends a string via UDP to localhost.
- `=` **osc**('len): Sends a configured OSC message.

## Controls

### Terminal Controls

- `enter` toggle insert/write.
- `space` toggle play/pause.
- `>` increase BPM.
- `<` decrease BPM.
- `shift+arrowKey` Expand cursor.
- `ctrl+arrowKey` Leap cursor.
- `alt+arrowKey` Move selection.

### Edit

- `ctrl+c` copy selection.
- `ctrl+x` cut selection.
- `ctrl+v` paste selection.
- `ctrl+z` undo.
- `ctrl+shift+z` redo.

### Grid Controls

- `]` increase grid size vertically.
- `[` decrease grid size vertically.
- `}` increase grid size horizontally.
- `{` decrease grid size horizontally.
- `ctrl/meta+]` increase program size vertically.
- `ctrl/meta+[` decrease program size vertically.
- `ctrl/meta+}` increase program size horizontally.
- `ctrl/meta+{` decrease program size horizontally.

### Window

- `ctrl+=` Zoom In.
- `ctrl+-` Zoom Out.
- `ctrl+0` Zoom Reset.
- `tab` Toggle interface.
- `backquote` Toggle background.

## Special Operators

### Midi Output

The midi operator `:` takes up to 5 inputs('channel, 'octave, 'note, velocity, length). For example, `:25C`, is a **C note, on the 5th octave, through the 3rd MIDI channel**, `:04c`, is a **C# note, on the 4th octave, through the 1st MIDI channel**. See it in action with [midi.orca](https://github.com/hundredrabbits/Orca/blob/master/examples/_midi.orca).

#### Velocity*

Velocity is a value from `1`(8/127) to `g`(127/127). For example, `:34C8.`, is a **C note, on the 4th octave, through the 4th MIDI channel with a velocity of 63/127(50%)**, `:34CG.`, is a **C note, on the 4th octave, through the 4th MIDI channel with a velocity of 127/127(100%)**. 

#### Note Length*

Note length is a value from `1`(1/16) to `g`(16/16), which is a ratio of a full bar, *f* being `16/16`(a full bar), *8* being `1/2`(half), *4* being `1/4`(quarter).. and *1* being `1/16`. For example, `:27D.F`, is a **D note, on the 7th octave, through the 3rd MIDI channel lasting for a full bar**. 

### UDP Output

The [UDP](https://nodejs.org/api/dgram.html#dgram_socket_send_msg_offset_length_port_address_callback) operator `;`, takes one haste input that is a string length and locks the eastwardly ports. It sends the message on bang to the port `49160` on `localhost` by default, and can be configured in [udpConfig.js](https://github.com/hundredrabbits/Orca/blob/master/desktop/core/bridge/udpConfig.js).  
You can use the [udpListener.js](https://github.com/hundredrabbits/Orca/blob/master/examples/UDP/udpListener.js) to test UDP messages. See it in action with [udp.orca](https://github.com/hundredrabbits/Orca/blob/master/examples/UDP/_udp.orca).

### OSC Output

The [OSC](https://github.com/MylesBorins/node-osc) operator `=` takes one haste input that is a string length and locks the eastwardly ports. It sends the message on bang to the port `12000` on `localhost` by default and can be configured in [oscConfig.js](https://github.com/hundredrabbits/Orca/blob/master/desktop/core/bridge/oscConfig.js). The OSC operator supports integers, float, strings and combined patterns and can send to multiple servers. See [Orca's OSC Guide](https://github.com/hundredrabbits/Orca/blob/master/GUIDE.md#orca-s-osc-guide) 
You can use the [oscListener.js](https://github.com/hundredrabbits/Orca/blob/master/examples/OSC/oscListener.js) to test OSC messages. See it in action with [osc.orca](https://github.com/hundredrabbits/Orca/blob/master/examples/OSC/_osc.orca).

<img src='https://raw.githubusercontent.com/hundredrabbits/Orca/master/resources/preview.hardware.jpg' width="600"/>

## Base36 Table

Orca operates on a base of 36 increments. Operators using numeric values will typically also operate on letters and convert them into values as per the following table. For instance `pD` will bang every *24th frame*.

| 0     | 1     | 2     | 3     | 4     | 5     | 6     | 7     | 8     | 9     | A     | B      | 
| :-:   | :-:   | :-:   | :-:   | :-:   | :-:   | :-:   | :-:   | :-:   | :-:   | :-:   | :-:    | 
| 0     | 1     | 2     | 3     | 4     | 5     | 6     | 7     | 8     | 9     | 10    | 11     |
| **C** | **D** | **E** | **F** | **G** | **H** | **I** | **J** | **K** | **L** | **M** | **N**  |
| 12    | 13    | 14    | 15    | 16    | 17    | 18    | 19    | 20    | 21    | 22    | 23     | 
| **O** | **P** | **Q** | **R** | **S** | **T** | **U** | **V** | **W** | **X** | **Y** | **Z**  | 
| 24    | 25    | 26    | 27    | 28    | 29    | 30    | 31    | 32    | 33    | 34    | 35     |

## Extras

- This application supports the [Ecosystem Theme](https://github.com/hundredrabbits/Themes).
- Support this project through [Patreon](https://patreon.com/100).
- See the [License](LICENSE.md) file for license rights and limitations (MIT).
- Pull Requests are welcome!
