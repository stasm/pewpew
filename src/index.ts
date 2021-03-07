import {Game} from "./game.js";
import {loop_start} from "./loop.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();
// @ts-ignore
window.game = game;

scene_stage(game);
loop_start(game);
