let update_span = document.getElementById("update");
let delta_span = document.getElementById("delta");
let fps_span = document.getElementById("fps");

export function update_framerate(delta: number, update: number) {
    if (update_span) {
        update_span.textContent = update.toFixed(1);
    }
    if (delta_span) {
        delta_span.textContent = (delta * 1000).toFixed(1);
    }
    if (fps_span) {
        fps_span.textContent = (1 / delta).toFixed();
    }
}
