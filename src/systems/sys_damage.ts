import {destroy} from "../entity.js";
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
        setTimeout(() => destroy(game.World, entity));
    }

    for (let collision of collide.Collisions) {
        let other = collision.EntityId;
        if (game.World.Signature[other] & Has.Health) {
            let health = game.World.Health[other];
            health.Amount -= damage.Amount;
        } else {
            setTimeout(() => destroy(game.World, collision.EntityId));
        }
    }
}
