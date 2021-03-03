import {float, set_seed} from "../../common/random.js";
import {draw_rect} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {instantiate} from "../entity.js";
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
        Using: [draw_rect(40, 40, "red"), move(20)],
    });

    instantiate(game, {
        Translation: [
            float(game.ViewportWidth * 0.1, game.ViewportWidth * 0.9),
            game.ViewportHeight / 2,
        ],
        Rotation: Math.PI / 2,
        Using: [draw_rect(20, 20, "red"), move(40)],
    });
}
