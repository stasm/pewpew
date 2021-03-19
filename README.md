# PewPew

## Set-Up

    $ git clone https://github.com/stasm/pewpew.git
    $ cd pewpew
    $ npm install

## Run In The Browser

1. `npm start`
2. Open http://localhost:1234

## Run In Node

You can choose between running with a no-op `RenderingContext2D` class implemented in either pure JS or as a native Node module (written in C++). Keep in mind that the pure-JS version is likely to optimize the no-op draw calls away. In my measurements it's ca. 35% faster than the native module version.

### Pure JS

    $ make -C node_js
    $ node node_js/game.rollup.js

### Native Module

    $ make -C node_native
    $ node node_native/game.rollup.js

----

This project is based on [Goodluck](https://github.com/piesku/goodluck), a hackable template for creating small and fast browser games.
