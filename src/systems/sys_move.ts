import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Move;

export function sys_move(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game.World.Transform2D[entity];
    let move = game.World.Move[entity];

    if (move.Direction) {
        transform.Translation[0] += move.Direction[0] * move.Speed * delta;
        transform.Translation[1] += move.Direction[1] * move.Speed * delta;
        transform.Dirty = true;

        move.Direction = null;
    }

    if (move.Rotation) {
        transform.Rotation += move.Rotation * delta;
        transform.Dirty = true;
        move.Rotation = 0;
    }
}
