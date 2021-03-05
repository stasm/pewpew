import {Rad, Vec2} from "../common/math.js";
import {transform2d} from "./components/com_transform2d.js";
import {Entity, Game} from "./game.js";
import {Has} from "./world.js";

type Mixin = (game: Game, entity: Entity) => void;
export interface Blueprint2D {
    Translation?: Vec2;
    Rotation?: Rad;
    Scale?: Vec2;
    Using?: Array<Mixin>;
    Children?: Array<Blueprint2D>;
}

export function instantiate(
    game: Game,
    {Translation, Rotation, Scale, Using = [], Children = []}: Blueprint2D
) {
    game.FrameStats.EntityCreate++;
    let entity = game.World.CreateEntity();
    transform2d(Translation, Rotation, Scale)(game, entity);
    for (let mixin of Using) {
        mixin(game, entity);
    }
    let entity_transform = game.World.Transform2D[entity];
    for (let subtree of Children) {
        let child = instantiate(game, subtree);
        let child_transform = game.World.Transform2D[child];
        child_transform.Parent = entity;
        entity_transform.Children.push(child);
    }
    return entity;
}

export function destroy(game: Game, entity: Entity) {
    if (game.World.Signature[entity] & Has.Transform2D) {
        for (let child of game.World.Transform2D[entity].Children) {
            destroy(game, child);
        }
    }

    if (game.World.Signature[entity] !== 0) {
        game.FrameStats.EntityDestroy++;
        game.World.DestroyEntity(entity);
    }
}
