import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export interface Health {
    Amount: number;
}

export function health(amount: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Health;
        game.World.Health[entity] = {
            Amount: amount,
        };
    };
}
