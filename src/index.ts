import {Game} from "./game.js";
import {loop_start} from "./loop.js";
import {scene_stage} from "./scenes/sce_stage.js";

let game = new Game();
// @ts-ignore
window.game = game;

scene_stage(game);
loop_start(game);

setInterval(() => {
    console.log({
        Ticks: game.TotalStats.Ticks,
        EntityCount: game.TotalStats.EntityCount / game.TotalStats.Ticks,
        EntityCreate: game.TotalStats.EntityCreate / game.TotalStats.Ticks,
        EntityDestroy: game.TotalStats.EntityDestroy / game.TotalStats.Ticks,
        SignatureChange: game.TotalStats.SignatureChange / game.TotalStats.Ticks,
    });
}, 1000);
