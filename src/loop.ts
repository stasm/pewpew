import {Game} from "./game.js";

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

    stats_interval_id = setInterval(() => {
        console.log({
            Ticks: game.TotalStats.Ticks,
            UpdateTime: game.TotalStats.UpdateTime / game.TotalStats.Ticks,
            EntityCount: game.TotalStats.EntityCount / game.TotalStats.Ticks,
            EntityCreate: game.TotalStats.EntityCreate / game.TotalStats.Ticks,
            EntityDestroy: game.TotalStats.EntityDestroy / game.TotalStats.Ticks,
            SignatureChange: game.TotalStats.SignatureChange / game.TotalStats.Ticks,
        });
    }, 1000);
}

export function loop_stop() {
    cancelAnimationFrame(animation_request_id);
    clearInterval(stats_interval_id);
}
