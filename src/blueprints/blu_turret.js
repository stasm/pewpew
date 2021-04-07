import { aim } from "../components/com_aim.js";
import { collide } from "../components/com_collide.js";
import { control_always } from "../components/com_control_always.js";
import { spawn } from "../components/com_control_spawn.js";
import { control_turret } from "../components/com_control_turret.js";
import { damage } from "../components/com_damage.js";
import { draw_circle, draw_rect } from "../components/com_draw.js";
import { grid } from "../components/com_grid.js";
import { lifespan } from "../components/com_lifespan.js";
import { move } from "../components/com_move.js";
import { transform2d } from "../components/com_transform2d.js";
import { TURRET_SHOOT_FREQUENCY } from "../config.js";
export function turret_blueprint(game) {
    return [
        transform2d(),
        draw_circle(10, "gold"),
        grid(),
        control_turret(),
        aim(),
        spawn(bullet_blueprint, TURRET_SHOOT_FREQUENCY, 0.1),
    ];
}
function bullet_blueprint(game) {
    return [
        transform2d(),
        draw_rect(3, 3, "black"),
        move(100),
        control_always(true, 0),
        lifespan(10),
        collide(5),
        damage(1),
        grid(),
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1X3R1cnJldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsdV90dXJyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDbkUsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUMvQyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDN0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBSXBELE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxJQUFVO0lBQ3ZDLE9BQU87UUFDSCxXQUFXLEVBQUU7UUFDYixXQUFXLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQztRQUN2QixJQUFJLEVBQUU7UUFDTixjQUFjLEVBQUU7UUFDaEIsR0FBRyxFQUFFO1FBQ0wsS0FBSyxDQUFDLGdCQUFnQixFQUFFLHNCQUFzQixFQUFFLEdBQUcsQ0FBQztLQUN2RCxDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsSUFBVTtJQUNoQyxPQUFPO1FBQ0gsV0FBVyxFQUFFO1FBQ2IsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDVCxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsRUFBRSxDQUFDO1FBQ1osT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDVCxJQUFJLEVBQUU7S0FDVCxDQUFDO0FBQ04sQ0FBQyJ9