import {get_rotation, get_translation} from "../../common/mat2d.js";
import {Vec2} from "../../common/math.js";
import {transform2d} from "../components/com_transform2d.js";
import {instantiate} from "../entity.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.ControlSpawn;

export function sys_control_spawn(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let control = game.World.ControlSpawn[entity];

    control.SinceLast += delta;
    if (control.SinceLast > control.Frequency) {
        control.SinceLast = 0;

        let transform = game.World.Transform2D[entity];

        let world_position: Vec2 = [0, 0];
        get_translation(world_position, transform.WorldSpace);

        let world_rotation = get_rotation(transform.WorldSpace);

        instantiate(game, [
            ...control.Creator(game),
            transform2d(world_position, world_rotation + (Math.random() - 0.5) * control.Scatter),
        ]);
    }
}
