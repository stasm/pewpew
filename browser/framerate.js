let update_span = document.getElementById("update");
let delta_span = document.getElementById("delta");
let fps_span = document.getElementById("fps");
export function update_framerate(delta, update) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJhbWVyYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEQsSUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNsRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTlDLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsTUFBYztJQUMxRCxJQUFJLFdBQVcsRUFBRTtRQUNiLFdBQVcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvQztJQUNELElBQUksVUFBVSxFQUFFO1FBQ1osVUFBVSxDQUFDLFdBQVcsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFDRCxJQUFJLFFBQVEsRUFBRTtRQUNWLFFBQVEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDaEQ7QUFDTCxDQUFDIn0=