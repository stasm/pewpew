import {FakeCanvas} from "./canvas.js";
import {Camera} from "./components/com_camera.js";
import {GridCell} from "./components/com_grid.js";
import {destroy} from "./entity.js";
import {Stats, update_stats} from "./stats.js";
import {sys_aim} from "./systems/sys_aim.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_always} from "./systems/sys_control_always.js";
import {sys_control_mob} from "./systems/sys_control_mob.js";
import {sys_control_turret} from "./systems/sys_control_turret.js";
import {sys_damage} from "./systems/sys_damage.js";
import {sys_draw2d} from "./systems/sys_draw2d.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_grid} from "./systems/sys_grid.js";
import {sys_lifespan} from "./systems/sys_lifespan.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_shake} from "./systems/sys_shake.js";
import {sys_spawn} from "./systems/sys_spawn.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {World} from "./world.js";

export type Entity = number;

export class Game {
    World = new World();
    Morgue: Set<Entity> = new Set();

    ViewportWidth = 1000;
    ViewportHeight = 1000;

    Canvas = true ? document.querySelector("canvas")! : new FakeCanvas();
    Context2D = this.Canvas.getContext("2d")!;

    Grid: Array<Array<GridCell>> = [];
    Camera?: Camera;

    FrameStats: Stats = {
        Ticks: 0,
        UpdateTime: 0,
        EntityCount: 0,
        EntityCreate: 0,
        EntityDestroy: 0,
        SignatureChange: 0,
    };
    TotalStats: Stats = {
        Ticks: 0,
        UpdateTime: 0,
        EntityCount: 0,
        EntityCreate: 0,
        EntityDestroy: 0,
        SignatureChange: 0,
    };

    constructor() {
        this.Canvas.width = this.ViewportWidth;
        this.Canvas.height = this.ViewportHeight;
    }

    FrameUpdate(delta: number) {
        let now = performance.now();

        // AI.
        sys_control_turret(this, delta);
        sys_control_mob(this, delta);
        sys_spawn(this, delta);
        sys_control_always(this, delta);

        // Game logic.
        sys_lifespan(this, delta);
        sys_move(this, delta);
        sys_shake(this, delta);
        sys_aim(this, delta);

        // Commit.
        sys_transform2d(this, delta);
        sys_grid(this, delta);

        // Collisions.
        sys_collide(this, delta);
        sys_damage(this, delta);

        // Render.
        sys_camera(this, delta);
        sys_draw2d(this, delta);

        for (let entity of this.Morgue) {
            destroy(this, entity);
        }
        this.Morgue.clear();

        // Performance measurement and stats.
        this.FrameStats.UpdateTime = performance.now() - now;
        sys_framerate(this, delta, this.FrameStats.UpdateTime);
        update_stats(this.TotalStats, this.FrameStats);
    }
}
