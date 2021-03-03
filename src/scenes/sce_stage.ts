import {float, set_seed} from "../../common/random.js";
import {control_mob, MobKind} from "../components/com_control_mob.js";
import {control_spawn} from "../components/com_control_spawn.js";
import {draw_circle, draw_rect} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {Blueprint2D, instantiate} from "../entity.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    set_seed(Date.now());

    game.World = new World();

    instantiate(game, {
        Translation: [
            float(game.ViewportHeight * 0.1, game.ViewportWidth * 0.9),
            game.ViewportHeight / 2,
        ],
        Rotation: Math.PI / 2,
        Using: [draw_rect(40, 40, "red"), move(20), control_mob(MobKind.Heavy)],
    });

    instantiate(game, {
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Rotation: Math.PI / 2,
        Using: [control_spawn(mob_light_blueprint, 1)],
    });
}

function mob_light_blueprint(game: Game): Blueprint2D {
    return {
        Translation: [
            float(game.ViewportWidth * 0.1, game.ViewportWidth * 0.9),
            game.ViewportHeight / 2,
        ],
        Rotation: Math.PI / 2,
        Using: [draw_circle(10, "red"), move(40), control_mob(MobKind.Light)],
    };
}
