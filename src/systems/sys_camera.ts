import {Entity, Game} from "../game.js";
import {invert} from "../toolkit/mat2d.js";
import {Has} from "../world.js";

const QUERY = Has.Camera | Has.Transform2D;

export function sys_camera(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i);

            // Support only one camera.
            return;
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game.World.Transform2D[entity];
    let camera = game.World.Camera[entity];

    invert(camera.View, transform.WorldSpace);
    game.Camera = camera;
}
