import {Vec2} from "../../common/math.js";
import {Entity, Game} from "../game.js";
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
    Position: Vec2;
    Neighbors: Array<GridCell>;
    Occupants: Set<Entity>;
}
