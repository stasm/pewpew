import {Game} from "./game.js";
import {print_stats} from "./stats.js";

let animation_request_id = 0;
let stats_interval_id = 0;

export function loop_start(game: Game) {
    let last = performance.now();

    let tick = (now: number) => {
        let delta = (now - last) / 1000;
        game.FrameUpdate(delta);
        last = now;
        animation_request_id = requestAnimationFrame(tick);
    };

    loop_stop();
    tick(last);

    stats_interval_id = setInterval(() => print_stats(game.TotalStats), 1000);
}

export function loop_stop() {
    cancelAnimationFrame(animation_request_id);
    clearInterval(stats_interval_id);
}
