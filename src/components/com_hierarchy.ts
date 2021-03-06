import {Blueprint, instantiate} from "../entity.js";
import {Entity, Game} from "../game.js";
import {Has, World} from "../world.js";

export interface Hierarchy {
    Parent?: Entity;
    Children: Array<Entity>;
}

export function hierarchy(...blueprints: Array<Blueprint>) {
    return (game: Game, entity: Entity) => {
        let child_entities = [];
        for (let blueprint of blueprints) {
            let child = instantiate(game, blueprint);
            child_entities.push(child);

            if (game.World.Signature[child] & Has.Hierarchy) {
                game.World.Hierarchy[child].Parent = entity;
            }
        }
        game.World.Signature[entity] |= Has.Hierarchy;
        game.World.Hierarchy[entity] = {
            Children: child_entities,
        };
    };
}

/**
 * Yield entities matching a component mask. The query is tested against the
 * parent and all its descendants.
 *
 * @param world World object which stores the component data.
 * @param parent Parent entity to traverse.
 * @param mask Component mask to look for.
 */
export function* query_all(world: World, parent: Entity, mask: Has): IterableIterator<Entity> {
    if (world.Signature[parent] & mask) {
        yield parent;
    }
    for (let child of world.Hierarchy[parent].Children) {
        yield* query_all(world, child, mask);
    }
}
