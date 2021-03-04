import {get_translation} from "../../common/mat2d.js";
import {Vec2} from "../../common/math.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Grid | Has.Transform2D;

export function sys_grid(game: Game, delta: number) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            game.Grid[y][x].Occupants.clear();
        }
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let transform = game.World.Transform2D[entity];
    let grid = game.World.Grid[entity];

    let world_position: Vec2 = [0, 0];
    get_translation(world_position, transform.World);

    let cell_width = game.ViewportWidth / 10;
    let cell_height = game.ViewportHeight / 10;

    let x = Math.floor(world_position[0] / cell_width);
    let y = Math.floor(world_position[1] / cell_height);
    let cell = game.Grid[y]?.[x];

    if (cell) {
        grid.Cell = cell;
        cell.Occupants.add(entity);
    } else {
        grid.Cell = undefined;
    }
}
