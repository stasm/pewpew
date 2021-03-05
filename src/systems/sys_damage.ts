import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Collide | Has.Damage;

export function sys_damage(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let collide = game.World.Collide[entity];
    let damage = game.World.Damage[entity];

    if (collide.Collisions.length > 0) {
        game.Morgue.push(entity);

        let other = collide.Collisions[0];
        if (game.World.Signature[other] & Has.Health) {
            let health = game.World.Health[other];
            health.Amount -= damage.Amount;
        } else {
            game.Morgue.push(entity);
        }
    }
}
