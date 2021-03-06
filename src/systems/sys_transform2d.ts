import {from_translation, invert, multiply, rotate, scale} from "../../common/mat2d.js";
import {Transform2D} from "../components/com_transform2d.js";
import {Entity, Game} from "../game.js";
import {Has, World} from "../world.js";

const QUERY = Has.Transform2D;

export function sys_transform2d(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            game.FrameStats.EntityCount++;

            let transform = game.World.Transform2D[i];
            if (transform.Dirty) {
                update_transform(game.World, i, transform);
            }
        }
    }
}

function update_transform(world: World, entity: Entity, transform: Transform2D) {
    transform.Dirty = false;

    from_translation(transform.WorldSpace, transform.Translation);
    rotate(transform.WorldSpace, transform.WorldSpace, transform.Rotation);
    scale(transform.WorldSpace, transform.WorldSpace, transform.Scale);

    if (world.Signature[entity] & Has.Hierarchy) {
        let hierarchy = world.Hierarchy[entity];
        if (hierarchy.Parent !== undefined) {
            let parent_transform = world.Transform2D[hierarchy.Parent];
            multiply(transform.WorldSpace, parent_transform.WorldSpace, transform.WorldSpace);
        }
        for (let child of hierarchy.Children) {
            let child_transform = world.Transform2D[child];
            update_transform(world, child, child_transform);
        }
    }

    invert(transform.SelfSpace, transform.WorldSpace);
}
