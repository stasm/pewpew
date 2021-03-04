import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface Damage {
    Amount: number;
}

export function damage(amount: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Damage;
        game.World.Damage[entity] = {
            Amount: amount,
        };
    };
}
