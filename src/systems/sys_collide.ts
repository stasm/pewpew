import {get_translation} from "../../common/mat2d.js";
import {distance_squared} from "../../common/vec2.js";
import {Collide} from "../components/com_collide.js";
import {GridCell} from "../components/com_grid.js";
import {Game} from "../game.js";
import {Has, World} from "../world.js";

const QUERY = Has.Transform2D | Has.Collide;

export function sys_collide(game: Game, delta: number) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            check_collisions_in_cell(game.World, game.Grid[y][x]);
        }
    }
}

function check_collisions_in_cell(world: World, cell: GridCell) {
    // Collect all colliders in this cell.
    let all_colliders: Collide[] = [];
    for (let occupant of cell.Occupants) {
        if ((world.Signature[occupant] & QUERY) === QUERY) {
            let transform = world.Transform2D[occupant];
            let collider = world.Collide[occupant];

            // Prepare the collider for this tick.
            collider.Collisions = [];
            get_translation(collider.Center, transform.World);
            all_colliders.push(collider);
        }
    }

    for (let i = 0; i < all_colliders.length; i++) {
        check_collisions_between(all_colliders[i], all_colliders, i + 1);
    }
}

function check_collisions_between(collider: Collide, colliders: Collide[], offset: number) {
    for (let i = offset; i < colliders.length; i++) {
        let other = colliders[i];
        if (other !== collider && intersect(collider, other)) {
            collider.Collisions.push(other.EntityId);
            other.Collisions.push(collider.EntityId);
        }
    }
}

function intersect(a: Collide, b: Collide) {
    return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
}
