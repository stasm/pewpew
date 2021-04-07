import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlAlways | Has.Move | Has.Transform2D;

export function sys_control_always(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlAlways[entity];
    let move = game.World.Move[entity];
    let transform = game.World.Transform2D[entity];

    if (control.Forward) {
        move.Direction = [transform.WorldSpace[0], transform.WorldSpace[1]];
    }

    if (control.Rotation) {
        move.Rotation = control.Rotation;
    }
}
