import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface ControlTurret {
    // TODO Maybe remove component data?
}

export function control_turret() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlTurret;
        game.World.ControlTurret[entity] = {};
    };
}
