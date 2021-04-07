import {GridCell} from "../components/com_grid.js";
import {Entity, Game} from "../game.js";
import {element} from "../toolkit/random.js";
import {Has, World} from "../world.js";

const QUERY = Has.Aim | Has.ControlTurret | Has.Grid;

export function sys_control_turret(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let aim = game.World.Aim[entity];
    let grid = game.World.Grid[entity];

    if (!grid.Cell) {
        return;
    }

    let mobs = find_nearest_mobs(game.World, grid.Cell);
    if (mobs) {
        let mob = element(mobs);
        aim.Target = mob;
    } else {
        aim.Target = undefined;
    }
}

function find_nearest_mobs(world: World, cell: GridCell): Array<Entity> | null {
    let queue = [cell];
    let visited: Set<GridCell> = new Set(queue);

    while (queue.length > 0) {
        let current = queue.shift()!;

        let mobs: Array<Entity> = [];
        for (let occupant of current.Occupants) {
            if (world.Signature[occupant] & Has.ControlMob) {
                mobs.push(occupant);
            }
        }

        if (mobs.length > 0) {
            return mobs;
        }

        for (let neighbor of current.Neighbors) {
            if (neighbor && !visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
            }
        }
    }

    return null;
}
