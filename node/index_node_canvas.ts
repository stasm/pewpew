import {createCanvas} from "canvas";
import {scene_stage} from "../src/scenes/sce_stage.js";
import {NodeGame} from "./game.js";

class NodeCanvasGame extends NodeGame {
    Canvas = createCanvas(this.ViewportWidth, this.ViewportHeight);
    Context2D = this.Canvas.getContext("2d");
}

let game = new NodeCanvasGame();
scene_stage(game);
game.Start();
