import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export const enum MobKind {
    Light,
    Heavy,
}

export interface ControlMob {
    Kind: MobKind;
}

export function control_mob(kind: MobKind) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlMob;
        game.World.ControlMob[entity] = {
            Kind: kind,
        };
    };
}
