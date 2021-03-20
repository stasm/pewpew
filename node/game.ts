import {performance} from "perf_hooks";
import {Game} from "../src/game.js";
import {print_averages, reset_stats, Stats, update_stats} from "../src/stats.js";

export abstract class NodeGame extends Game {
    static RUN_TIME_S = 10;

    private Ticks = 0;

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
        let run_time_ms = NodeGame.RUN_TIME_S * 1000;
        let last = performance.now();

        while (last < run_time_ms) {
            let now = performance.now();
            let delta = (now - last) / 1000;
            this.FrameUpdate(delta);
            last = now;
            this.Ticks++;
        }

        print_averages(this.TotalStats);
        console.log("FPS:", this.Ticks / NodeGame.RUN_TIME_S);
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
