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
    transform.Translation[0] += transform.WorldSpace[0] * move.Speed * delta;
    transform.Translation[1] += transform.WorldSpace[1] * move.Speed * delta;
    transform.Dirty = true;
}
