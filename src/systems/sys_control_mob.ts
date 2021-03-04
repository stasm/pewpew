import {float} from "../../common/random.js";
import {MobKind} from "../components/com_control_mob.js";
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
    switch (control.Kind) {
        case MobKind.Light:
            break;
        case MobKind.Heavy: {
            break;
        }
    }

    let health = game.World.Health[entity];
    if (health.Amount <= 0) {
        game.World.Signature[entity] &= ~(Has.ControlMob | Has.Grid | Has.Collide | Has.Move);

        let transform = game.World.Transform2D[entity];
        transform.Rotation = float(0, Math.PI * 2);
        transform.Dirty = true;

        let draw = game.World.Draw[entity];
        draw.Color = "silver";
    }
}
