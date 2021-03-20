import {Entity, Game} from "../game.js";
import {Rad, Vec2} from "../toolkit/math.js";
import {Has} from "../world.js";

export interface Move {
    /** Movement speed, in pixels per second. */
    Speed: number;
    /** Movement direction, in world space. */
    Direction: Vec2 | null;
    /** Rotation angle, in Rad. */
    Rotation: Rad;
}

export function move(Speed: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Move;
        game.World.Move[entity] = {
            Speed,
            Direction: null,
            Rotation: 0,
        };
    };
}
