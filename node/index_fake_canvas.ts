import {FakeRenderingContext2D} from "fake-canvas";
import {scene_stage} from "../src/scenes/sce_stage.js";
import {NodeGame} from "./game.js";

class FakeCanvasGame extends NodeGame {
    Context2D = new FakeRenderingContext2D();
}

let game = new FakeCanvasGame();
scene_stage(game);
game.Start();
