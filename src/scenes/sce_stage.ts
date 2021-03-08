import {set_seed} from "../../common/random.js";
import {
    mob_drone_blueprint,
    mob_heavy_blueprint,
    mob_light_blueprint,
} from "../blueprints/blu_mobs.js";
import {turret_blueprint} from "../blueprints/blu_turret.js";
import {camera} from "../components/com_camera.js";
import {children} from "../components/com_children.js";
import {spawn} from "../components/com_control_spawn.js";
import {shake} from "../components/com_shake.js";
import {transform2d} from "../components/com_transform2d.js";
import {
    MOB_DRONE_SPAWN_FREQUENCY,
    MOB_HEAVY_SPAWN_FREQUENCY,
    MOB_LIGHT_SPAWN_FREQUENCY,
    TURRET_COUNT,
} from "../config.js";
import {instantiate} from "../entity.js";
import {Game} from "../game.js";
import {sys_grid} from "../systems/sys_grid.js";
import {sys_transform2d} from "../systems/sys_transform2d.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    set_seed(Date.now());

    game.World = new World();

    {
        // Create a 10x10 grid of cells.

        // 1. Create the cells.
        for (let y = 0; y < 10; y++) {
            game.Grid[y] = [];
            for (let x = 0; x < 10; x++) {
                game.Grid[y][x] = {
                    Index: [x, y],
                    Occupants: new Set(),
                    Neighbors: [],
                };
            }
        }

        // 2. Link neghboring cells.
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                game.Grid[y][x].Neighbors = [
                    // Top: middle, left, right.
                    game.Grid[y - 1]?.[x + 0],
                    game.Grid[y - 1]?.[x - 1],
                    game.Grid[y - 1]?.[x + 1],

                    // Middle: left, right,
                    game.Grid[y + 0]?.[x - 1],
                    game.Grid[y + 0]?.[x + 1],

                    // Bottom: middle, left, right.
                    game.Grid[y + 1]?.[x + 0],
                    game.Grid[y + 1]?.[x - 1],
                    game.Grid[y + 1]?.[x + 1],
                ];
            }
        }
    }

    instantiate(game, [transform2d(), camera(), shake(0, 0)]);

    for (let i = 1; i < TURRET_COUNT + 1; i++) {
        instantiate(game, [
            ...turret_blueprint(game),
            transform2d(
                [(game.ViewportWidth * i) / (TURRET_COUNT + 1), game.ViewportHeight * 0.9],
                -Math.PI / 2
            ),
        ]);
    }

    instantiate(game, [
        transform2d([game.ViewportWidth / 2, game.ViewportHeight / 10], Math.PI / 2, [1, 5]),
        children(
            [
                transform2d(),
                spawn(mob_light_blueprint, MOB_LIGHT_SPAWN_FREQUENCY, 0.3),
                shake(Infinity, 100),
            ],
            [
                transform2d(),
                spawn(mob_drone_blueprint, MOB_DRONE_SPAWN_FREQUENCY, 1),
                shake(Infinity, 100),
            ],
            [
                transform2d(),
                spawn(mob_heavy_blueprint, MOB_HEAVY_SPAWN_FREQUENCY, 0.5),
                shake(Infinity, 100),
            ]
        ),
    ]);

    // Commit.
    sys_transform2d(game, 0);
    sys_grid(game, 0);
}
