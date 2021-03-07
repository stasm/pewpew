import {Game} from "../src/game.js";
import {scene_stage} from "../src/scenes/sce_stage.js";
import {print_averages, reset_stats, Stats, update_stats} from "../src/stats.js";
import {update_framerate} from "./framerate.js";

class BrowserGame extends Game {
    private AnimationRequestId = 0;
    private StatsIntervalId = 0;

    Canvas = document.querySelector("canvas")!;
    Context2D = this.Canvas.getContext("2d")!;

    TotalStats: Stats = {
        Ticks: 0,
        UpdateTime: 0,
        EntityCount: 0,
        EntityCreate: 0,
        EntityDestroy: 0,
        SignatureChange: 0,
        DrawCall: 0,
    };

    constructor() {
        super();
        this.Canvas.width = this.ViewportWidth;
        this.Canvas.height = this.ViewportHeight;
    }

    Start() {
        let tick = (now: number) => {
            let delta = (now - last) / 1000;
            game.FrameUpdate(delta);
            last = now;
            this.AnimationRequestId = requestAnimationFrame(tick);
        };

        let last = performance.now();
        tick(last);

        this.StatsIntervalId = window.setInterval(() => print_averages(game.TotalStats), 1000);
    }

    Stop() {
        cancelAnimationFrame(this.AnimationRequestId);
        clearInterval(this.StatsIntervalId);
    }

    FrameUpdate(delta: number) {
        reset_stats(this.FrameStats);
        let now = performance.now();

        super.FrameUpdate(delta);

        // Performance measurement and stats.
        this.FrameStats.UpdateTime = performance.now() - now;
        update_stats(this.TotalStats, this.FrameStats);
        update_framerate(delta, this.FrameStats.UpdateTime);
    }
}

export let game = new BrowserGame();
scene_stage(game);
game.Start();
