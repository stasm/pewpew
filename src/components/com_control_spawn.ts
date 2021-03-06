import {Blueprint} from "../entity.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

interface Creator {
    (game: Game): Blueprint;
}

export interface ControlSpawn {
    Creator: Creator;
    Frequency: number;
    Scatter: number;
    SinceLast: number;
}

/**
 * Spawn blueprints at random intervals with the average interval of `frequency`.
 *
 * @param creator The function returning the blueprint to spawn.
 * @param frequency The average frequency of spawning.
 * @param scatter The amount of directional scattering of spawning, in Rad.
 */
export function control_spawn(creator: Creator, frequency: number, scatter: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.ControlSpawn;
        game.World.ControlSpawn[entity] = {
            Creator: creator,
            Frequency: frequency,
            Scatter: scatter * 2,
            SinceLast: 0,
        };
    };
}
