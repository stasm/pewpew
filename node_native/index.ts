import {FakeRenderingContext2D} from "fake-canvas";
import {performance} from "perf_hooks";
import {Game} from "../src/game.js";
import {scene_stage} from "../src/scenes/sce_stage.js";
import {print_averages, reset_stats, Stats, update_stats} from "../src/stats.js";

const RUN_TIME_S = 10;
const RUN_TIME_MS = RUN_TIME_S * 1000;

class NodeGame extends Game {
    private Ticks = 0;

    Context2D = new FakeRenderingContext2D();

    TotalStats: Stats = {
        Ticks: 0,
        UpdateTime: 0,
        EntityCount: 0,
        EntityCreate: 0,
        EntityDestroy: 0,
        SignatureChange: 0,
        DrawCall: 0,
    };

    Start() {
        let last = performance.now();

        while (last < RUN_TIME_MS) {
            let now = performance.now();
            let delta = (now - last) / 1000;
            game.FrameUpdate(delta);
            last = now;
            this.Ticks++;
        }

        print_averages(game.TotalStats);
        console.log("FPS:", this.Ticks / RUN_TIME_S);
    }

    FrameUpdate(delta: number) {
        reset_stats(this.FrameStats);
        let now = performance.now();

        super.FrameUpdate(delta);

        // Performance measurement and stats.
        this.FrameStats.UpdateTime = performance.now() - now;
        update_stats(this.TotalStats, this.FrameStats);
    }
}

export let game = new NodeGame();
scene_stage(game);
game.Start();
