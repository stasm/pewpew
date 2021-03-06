import {Entity, Game} from "../game.js";
import {Vec2} from "../toolkit/math.js";
import {Has} from "../world.js";

export interface Collide {
    readonly EntityId: Entity;
    /** The radius of the collider in world units. */
    Radius: number;
    /** The world position of the center. */
    Center: Vec2;
    /** Other colliders colliding with this collider during this tick. */
    Collisions: Array<Entity>;
}

export function collide(radius: number) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Collide;
        game.World.Collide[entity] = {
            EntityId: entity,
            Radius: radius,
            Center: [0, 0],
            Collisions: [],
        };
    };
}
