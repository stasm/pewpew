import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlMob;

export function sys_control_mob(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlMob[entity];
}
