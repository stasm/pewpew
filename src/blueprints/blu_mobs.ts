import {children} from "../components/com_children.js";
import {collide} from "../components/com_collide.js";
import {control_always} from "../components/com_control_always.js";
import {control_mob, MobKind} from "../components/com_control_mob.js";
import {draw_circle, draw_rect} from "../components/com_draw.js";
import {grid} from "../components/com_grid.js";
import {health} from "../components/com_health.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {transform2d} from "../components/com_transform2d.js";
import {
    MOB_DRONE_LIFESPAN,
    MOB_DRONE_SPEED,
    MOB_HEAVY_LIFESPAN,
    MOB_HEAVY_SPEED,
    MOB_LIGHT_LIFESPAN,
    MOB_LIGHT_SPEED,
} from "../config.js";
import {Blueprint} from "../entity.js";
import {Game} from "../game.js";

export function mob_light_blueprint(game: Game): Blueprint {
    return [
        transform2d(),
        draw_circle(10, "red"),
        move(MOB_LIGHT_SPEED),
        control_mob(MobKind.Light),
        control_always(true, 0),
        lifespan(MOB_LIGHT_LIFESPAN),
        grid(),
        collide(10),
        health(1),
    ];
}

export function mob_drone_blueprint(game: Game): Blueprint {
    return [
        transform2d(),
        move(MOB_DRONE_SPEED),
        control_mob(MobKind.Drone),
        control_always(true, 0),
        lifespan(MOB_DRONE_LIFESPAN),
        grid(),
        collide(20),
        health(3),
        draw_rect(10, 7, "orange"),
        children(
            [transform2d([7, 7]), draw_circle(5, "orange"), move(0), control_always(false, -30)],
            [transform2d([7, -7]), draw_circle(5, "orange"), move(0), control_always(false, 30)],
            [transform2d([-7, 7]), draw_circle(5, "orange"), move(0), control_always(false, -30)],
            [transform2d([-7, -7]), draw_circle(5, "orange"), move(0), control_always(false, 30)]
        ),
    ];
}

export function mob_heavy_blueprint(game: Game): Blueprint {
    return [
        transform2d(),
        draw_circle(20, "dodgerblue"),
        move(MOB_HEAVY_SPEED),
        control_mob(MobKind.Heavy),
        control_always(true, 0),
        lifespan(MOB_HEAVY_LIFESPAN),
        grid(),
        collide(20),
        health(5),
        children([
            transform2d(),
            move(0),
            control_always(false, 1),
            children(
                [transform2d([25, 0]), draw_rect(3, 10, "black")],
                [transform2d([0, 25]), draw_rect(10, 3, "black")],
                [transform2d([-25, 0]), draw_rect(3, 10, "black")],
                [transform2d([0, -25]), draw_rect(10, 3, "black")]
            ),
        ]),
    ];
}
