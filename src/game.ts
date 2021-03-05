import {Camera} from "./components/com_camera.js";
import {GridCell} from "./components/com_grid.js";
import {sys_aim} from "./systems/sys_aim.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_mob} from "./systems/sys_control_mob.js";
import {sys_control_spawn} from "./systems/sys_control_spawn.js";
import {sys_control_turret} from "./systems/sys_control_turret.js";
import {sys_damage} from "./systems/sys_damage.js";
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

    Canvas = document.querySelector("canvas")!;
    Context2D = this.Canvas.getContext("2d")!;

    Grid: Array<Array<GridCell>> = [];
    Camera?: Camera;

    FrameStats: Stats = {
        Ticks: 0,
        EntityCount: 0,
        EntityCreate: 0,
        EntityDestroy: 0,
        SignatureChange: 0,
    };
    TotalStats: Stats = {
        Ticks: 0,
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
        sys_control_spawn(this, delta);

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
        sys_framerate(this, delta, performance.now() - now);
    }

    FrameReset() {
        this.TotalStats.Ticks++;
        this.TotalStats.EntityCount += this.FrameStats.EntityCount;
        this.TotalStats.EntityCreate += this.FrameStats.EntityCreate;
        this.TotalStats.EntityDestroy += this.FrameStats.EntityDestroy;
        this.TotalStats.SignatureChange += this.FrameStats.SignatureChange;

        this.FrameStats.EntityCount = 0;
        this.FrameStats.EntityCreate = 0;
        this.FrameStats.EntityDestroy = 0;
        this.FrameStats.SignatureChange = 0;

        console.log({
            Ticks: this.TotalStats.Ticks,
            EntityCount: this.TotalStats.EntityCount / this.TotalStats.Ticks,
            EntityCreate: this.TotalStats.EntityCreate / this.TotalStats.Ticks,
            EntityDestroy: this.TotalStats.EntityDestroy / this.TotalStats.Ticks,
            SignatureChange: this.TotalStats.SignatureChange / this.TotalStats.Ticks,
        });
    }
}

interface Stats {
    Ticks: number;
    EntityCount: number;
    EntityCreate: number;
    EntityDestroy: number;
    SignatureChange: number;
}
