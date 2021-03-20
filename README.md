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

You can choose between running with a no-op `RenderingContext2D` class implemented in either pure JS (`game_noop_canvas`) or as a native Node module (`game_fake_canvas`). The pure-JS version is likely to optimize the no-op draw calls away. In my measurements it's ca. 35% faster than the native module version.

    $ node node/game_noop_canvas.rollup.js
    $ node node/game_fake_canvas.rollup.js

----

This project is based on [Goodluck](https://github.com/piesku/goodluck), a hackable template for creating small and fast browser games.
