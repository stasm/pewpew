import {MobKind} from "../components/com_control_mob.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.ControlMob | Has.Health;

export function sys_control_mob(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let control = game.World.ControlMob[entity];
    let transform = game.World.Transform2D[entity];

    switch (control.Kind) {
        case MobKind.Light: {
            if (Math.random() < 0.1) {
                transform.Rotation += (Math.random() - 0.5) * 0.1;
                transform.Dirty = true;
            }
            break;
        }
        case MobKind.Heavy: {
            break;
        }
    }

    let health = game.World.Health[entity];
    if (health.Amount <= 0) {
        game.World.Signature[entity] &= ~(Has.ControlMob | Has.Grid | Has.Collide | Has.Move);

        transform.Rotation = Math.random() * Math.PI * 2;
        transform.Dirty = true;

        let draw = game.World.Draw[entity];
        draw.Color = "silver";
    }
}
