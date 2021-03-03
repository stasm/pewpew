import {loop_start, loop_stop} from "./loop.js";
import {sys_draw2d} from "./systems/sys_draw2d.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();

    ViewportWidth = 1000;
    ViewportHeight = 1000;

    InputState: Record<string, number> = {};
    InputDelta: Record<string, number> = {};

    Canvas = document.querySelector("canvas")!;
    Context2D: CanvasRenderingContext2D;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        this.Canvas = document.querySelector("canvas")!;
        this.Canvas.width = this.ViewportWidth;
        this.Canvas.height = this.ViewportHeight;
        this.Context2D = this.Canvas.getContext("2d")!;
    }

    FrameReset() {
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameUpdate(delta: number) {
        let now = performance.now();
        sys_move(this, delta);
        sys_transform2d(this, delta);
        sys_draw2d(this, delta);
        sys_framerate(this, delta, performance.now() - now);
    }
}
