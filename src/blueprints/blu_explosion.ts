import {Vec2} from "../../common/math.js";
import {children} from "../components/com_children.js";
import {control_always} from "../components/com_control_always.js";
import {spawn} from "../components/com_control_spawn.js";
import {draw_rect} from "../components/com_draw.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {shake} from "../components/com_shake.js";
import {transform2d} from "../components/com_transform2d.js";
import {Blueprint} from "../entity.js";
import {Game} from "../game.js";

export function explosion_blueprint(game: Game, translation: Vec2): Blueprint {
    return [
        transform2d(translation, Math.random() * Math.PI * 2),
        lifespan(0.1),
        children([transform2d(), shake(Infinity, 1), spawn(rivet_blueprint, 0, Math.PI)]),
    ];
}

function rivet_blueprint(game: Game): Blueprint {
    return [
        transform2d(),
        move(50),
        control_always(true, 0),
        lifespan(2),
        children([
            transform2d(),
            move(0),
            control_always(false, 5),
            children(
                [transform2d([3, 0]), draw_rect(5, 9, "silver")],
                [transform2d([-3, 0], Math.PI / 2), draw_rect(5, 9, "silver")]
            ),
        ]),
    ];
}
