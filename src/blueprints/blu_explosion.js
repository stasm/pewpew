import { children } from "../components/com_children.js";
import { control_always } from "../components/com_control_always.js";
import { spawn } from "../components/com_control_spawn.js";
import { draw_rect } from "../components/com_draw.js";
import { lifespan } from "../components/com_lifespan.js";
import { move } from "../components/com_move.js";
import { shake } from "../components/com_shake.js";
import { transform2d } from "../components/com_transform2d.js";
export function explosion_blueprint(game, translation) {
    return [
        transform2d(translation, Math.random() * Math.PI * 2),
        lifespan(0.1),
        children([transform2d(), shake(Infinity, 1), spawn(rivet_blueprint, 0, Math.PI)]),
    ];
}
function rivet_blueprint(game) {
    return [
        transform2d(),
        move(50),
        control_always(true, 0),
        lifespan(2),
        children([
            transform2d(),
            move(0),
            control_always(false, 5),
            children([transform2d([3, 0]), draw_rect(5, 9, "silver")], [transform2d([-3, 0], Math.PI / 2), draw_rect(5, 9, "silver")]),
        ]),
    ];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmx1X2V4cGxvc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJsdV9leHBsb3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDekQsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDL0MsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUs3RCxNQUFNLFVBQVUsbUJBQW1CLENBQUMsSUFBVSxFQUFFLFdBQWlCO0lBQzdELE9BQU87UUFDSCxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyRCxRQUFRLENBQUMsR0FBRyxDQUFDO1FBQ2IsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNwRixDQUFDO0FBQ04sQ0FBQztBQUVELFNBQVMsZUFBZSxDQUFDLElBQVU7SUFDL0IsT0FBTztRQUNILFdBQVcsRUFBRTtRQUNiLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDUixjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN2QixRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ1gsUUFBUSxDQUFDO1lBQ0wsV0FBVyxFQUFFO1lBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3hCLFFBQVEsQ0FDSixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQ2hELENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUNqRTtTQUNKLENBQUM7S0FDTCxDQUFDO0FBQ04sQ0FBQyJ9