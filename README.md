# PewPew

## Set-Up

    $ git clone https://github.com/stasm/pewpew.git
    $ cd pewpew
    $ npm install

## Run In The Browser

1. `npm start`
2. Open http://localhost:1234

## Run In Node

Build the targets runnable in Node.js:

    $ make -C node

You can choose to run the simulation using one of the three versions:

- `node node/game_node_canvas.rollup.js` uses the `canvas` package and renders to a rendering context implemented in Cairo.
- `node node/game_fake_canvas.rollup.js` uses the `fake-canvas` package and renders to a no-op rendering context implemented as a native Node.js module in C++.
- `node node/game_noop_canvas.rollup.js` renders to the `NoopRenderingContext2D` instance implemented in pure JS. This variant is likely to optimize the no-op draw calls away. In my measurements it's ca. 35% faster than the no-op native module version.

----

This project is based on [Goodluck](https://github.com/piesku/goodluck), a hackable template for creating small and fast browser games.
