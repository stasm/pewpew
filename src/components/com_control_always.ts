import {Entity, Game} from "../game.js";
import {Rad} from "../toolkit/math.js";
import {Has} from "../world.js";

export interface ControlAlways {
    Forward: boolean;
    Rotation: Rad;
}

export function control_always(forward: boolean, rotation: Rad) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlAlways;
        game.World.ControlAlways[entity] = {
            Forward: forward,
            Rotation: rotation,
        };
    };
}
