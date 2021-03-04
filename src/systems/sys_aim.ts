import {get_translation} from "../../common/mat2d.js";
import {Vec2} from "../../common/math.js";
import {subtract} from "../../common/vec2.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Aim;

export function sys_aim(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

// entity must be top-level; target doesn't.
function update(game: Game, entity: Entity) {
    let aim = game.World.Aim[entity];

    if (aim.Target) {
        let transform = game.World.Transform2D[entity];
        let target_transform = game.World.Transform2D[aim.Target];

        let target_position: Vec2 = [0, 0];
        get_translation(target_position, target_transform.World);

        let diff: Vec2 = [0, 0];
        subtract(diff, target_position, transform.Translation);

        transform.Rotation = Math.atan2(diff[1], diff[0]);
        transform.Dirty = true;
    }
}
