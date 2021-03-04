import {GridCell} from "./components/com_grid.js";
import {loop_start, loop_stop} from "./loop.js";
import {sys_aim} from "./systems/sys_aim.js";
import {sys_control_mob} from "./systems/sys_control_mob.js";
import {sys_control_spawn} from "./systems/sys_control_spawn.js";
import {sys_control_turret} from "./systems/sys_control_turret.js";
import {sys_draw2d} from "./systems/sys_draw2d.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_grid} from "./systems/sys_grid.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_shake} from "./systems/sys_shake.js";
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
    Context2D = this.Canvas.getContext("2d")!;

    Grid: Array<Array<GridCell>> = [];

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? loop_stop() : loop_start(this)
        );

        this.Canvas.width = this.ViewportWidth;
        this.Canvas.height = this.ViewportHeight;
    }

    FrameReset() {
        for (let name in this.InputDelta) {
            this.InputDelta[name] = 0;
        }
    }

    FrameUpdate(delta: number) {
        let now = performance.now();

        // AI.
        sys_control_turret(this, delta);
        sys_control_mob(this, delta);
        sys_control_spawn(this, delta);

        // Game logic.
        sys_lifespan(this, delta);
        sys_move(this, delta);
        sys_shake(this, delta);
        sys_aim(this, delta);

        // Commit.
        sys_transform2d(this, delta);
        sys_grid(this, delta);

        // Render.
        sys_draw2d(this, delta);
        sys_framerate(this, delta, performance.now() - now);
    }
}
