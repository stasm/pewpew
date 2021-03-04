import {float, set_seed} from "../../common/random.js";
import {aim} from "../components/com_aim.js";
import {control_mob, MobKind} from "../components/com_control_mob.js";
import {control_spawn} from "../components/com_control_spawn.js";
import {control_turret} from "../components/com_control_turret.js";
import {draw_circle, draw_rect} from "../components/com_draw.js";
import {grid} from "../components/com_grid.js";
import {lifespan} from "../components/com_lifespan.js";
import {move} from "../components/com_move.js";
import {shake} from "../components/com_shake.js";
import {Blueprint2D, instantiate} from "../entity.js";
import {Game} from "../game.js";
import {sys_grid} from "../systems/sys_grid.js";
import {sys_transform2d} from "../systems/sys_transform2d.js";
import {World} from "../world.js";

export function scene_stage(game: Game) {
    set_seed(Date.now());

    game.World = new World();

    {
        // Create a 10x10 grid of cells.
        let cell_width = game.ViewportWidth / 10;
        let cell_height = game.ViewportHeight / 10;

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

    instantiate(game, {
        Translation: [game.ViewportWidth / 2, game.ViewportHeight * 0.9],
        ...turret_blueprint(game),
    });

    instantiate(game, {
        Translation: [
            float(game.ViewportHeight * 0.1, game.ViewportWidth * 0.9),
            game.ViewportHeight / 2,
        ],
        Rotation: Math.PI / 2,
        Using: [draw_rect(40, 40, "red"), move(20), control_mob(MobKind.Heavy)],
    });

    instantiate(game, {
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Rotation: Math.PI / 2,
        Children: [
            {
                Using: [control_spawn(mob_light_blueprint, 1), shake(Infinity, 100)],
            },
        ],
    });

    // Commit.
    sys_transform2d(game, 0);
    sys_grid(game, 0);
}

function mob_light_blueprint(game: Game): Blueprint2D {
    return {
        Translation: [
            float(game.ViewportWidth * 0.1, game.ViewportWidth * 0.9),
            game.ViewportHeight / 2,
        ],
        Rotation: Math.PI / 2,
        Using: [draw_circle(10, "red"), move(40), control_mob(MobKind.Light), lifespan(5), grid()],
    };
}

function turret_blueprint(game: Game): Blueprint2D {
    return {
        Rotation: -Math.PI / 2,
        Using: [
            draw_circle(10, "yellow"),
            grid(),
            control_turret(),
            aim(),
            control_spawn(bullet_blueprint, 1),
        ],
    };
}

function bullet_blueprint(game: Game): Blueprint2D {
    return {
        Using: [draw_rect(5, 5, "black"), move(100), lifespan(10)],
    };
}
