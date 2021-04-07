import {aim} from "../components/com_aim.js";
import {collide} from "../components/com_collide.js";
import {control_always} from "../components/com_control_always.js";
import {spawn} from "../components/com_control_spawn.js";
import {control_turret} from "../components/com_control_turret.js";
import {damage} from "../components/com_damage.js";
import {draw_circle, draw_rect} from "../components/com_draw.js";
import {grid} from "../components/com_grid.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {transform2d} from "../components/com_transform2d.js";
import {TURRET_SHOOT_FREQUENCY} from "../config.js";
import {Blueprint} from "../entity.js";
import {Game} from "../game.js";

export function turret_blueprint(game: Game): Blueprint {
    return [
        transform2d(),
        draw_circle(10, "gold"),
        grid(),
        control_turret(),
        aim(),
        spawn(bullet_blueprint, TURRET_SHOOT_FREQUENCY, 0.1),
    ];
}

function bullet_blueprint(game: Game): Blueprint {
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
