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
    let health = game.World.Health[entity];
    let transform = game.World.Transform2D[entity];

    if (health.Amount <= 0) {
        game.World.Signature[entity] &= ~(Has.Health | Has.Grid | Has.Collide | Has.Move);

        transform.Rotation = Math.random() * Math.PI * 2;
        transform.Dirty = true;

        let draw = game.World.Draw[entity];
        draw.Color = "silver";
    }

    switch (control.Kind) {
        case MobKind.Light: {
            if (Math.random() < 0.1) {
                transform.Rotation += (Math.random() - 0.5) * 0.1;
                transform.Dirty = true;
            }
            if (health.Amount <= 0 && game.Camera) {
                let shake = game.World.Shake[game.Camera.EntityId];
                if (shake.Duration < 0.1) {
                    shake.Duration = 0.2;
                    shake.Magnitude = 2;
                }
            }
            break;
        }
        case MobKind.Heavy: {
            if (health.Amount <= 0 && game.Camera) {
                let shake = game.World.Shake[game.Camera.EntityId];
                shake.Duration = 0.5;
                shake.Magnitude = 10;
            }
            break;
        }
    }
}
