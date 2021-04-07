import {Entity, Game} from "../game.js";
import {Vec2} from "../toolkit/math.js";
import {Has} from "../world.js";

export interface Grid {
    Cell?: GridCell;
}

export function grid() {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Grid;
        game.World.Grid[entity] = {
            Cell: undefined,
        };
    };
}

export interface GridCell {
    Index: Vec2;
    Neighbors: Array<GridCell>;
    Occupants: Set<Entity>;
}
