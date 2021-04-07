import {Entity, Game} from "../game.js";
import {create} from "../toolkit/mat2d.js";
import {Mat2D} from "../toolkit/math.js";
import {Has} from "../world.js";

export interface Camera {
    EntityId: Entity;
    View: Mat2D;
}

export function camera() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Camera;
        game.World.Camera[entity] = {
            EntityId: entity,
            View: create(),
        };
    };
}
