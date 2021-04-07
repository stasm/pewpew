import {Entity, Game} from "../game.js";
import {scale} from "../toolkit/vec2.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Shake;

export function sys_shake(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let shake = game.World.Shake[entity];

    if (shake.Duration > 0) {
        shake.Duration -= delta;

        let transform = game.World.Transform2D[entity];
        transform.Translation = [Math.random() * 2 - 1, Math.random() * 2 - 1];
        scale(transform.Translation, transform.Translation, shake.Magnitude);
        transform.Dirty = true;

        if (shake.Duration <= 0) {
            shake.Duration = 0;
            transform.Translation[0] = 0;
            transform.Translation[1] = 0;
        }
    }
}
