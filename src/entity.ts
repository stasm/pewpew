import {Entity, Game} from "./game.js";
import {Has} from "./world.js";

export type Mixin = (game: Game, entity: Entity) => void;
export type Blueprint = Array<Mixin>;

export function instantiate(game: Game, blueprint: Blueprint) {
    game.FrameStats.EntityCreate++;

    let entity = game.World.CreateEntity();
    for (let mixin of blueprint) {
        mixin(game, entity);
    }
    return entity;
}

export function destroy(game: Game, entity: Entity) {
    if (game.World.Signature[entity] & Has.Hierarchy) {
        for (let child of game.World.Hierarchy[entity].Children) {
            destroy(game, child);
        }
    }

    if (game.World.Signature[entity] !== 0) {
        game.FrameStats.EntityDestroy++;
        game.World.DestroyEntity(entity);
    }
}
