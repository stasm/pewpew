import {set_seed} from "../../common/random.js";
import {aim} from "../components/com_aim.js";
import {camera} from "../components/com_camera.js";
import {collide} from "../components/com_collide.js";
import {control_mob, MobKind} from "../components/com_control_mob.js";
import {control_spawn} from "../components/com_control_spawn.js";
import {control_turret} from "../components/com_control_turret.js";
import {damage} from "../components/com_damage.js";
import {draw_circle, draw_rect} from "../components/com_draw.js";
import {grid} from "../components/com_grid.js";
import {health} from "../components/com_health.js";
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
        Using: [camera(), shake(0, 0)],
    });

    for (let i = 1; i < 10; i++) {
        instantiate(game, {
            Translation: [game.ViewportWidth * 0.1 * i, game.ViewportHeight * 0.9],
            ...turret_blueprint(game),
        });
    }

    instantiate(game, {
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 10],
        Rotation: Math.PI / 2,
        Scale: [1, 5],
        Children: [
            {
                Using: [control_spawn(mob_light_blueprint, 0.1, 0.3), shake(Infinity, 100)],
            },
            {
                Using: [control_spawn(mob_heavy_blueprint, 5, 0.5), shake(Infinity, 100)],
            },
        ],
    });

    // Commit.
    sys_transform2d(game, 0);
    sys_grid(game, 0);
}

function mob_light_blueprint(game: Game): Blueprint2D {
    return {
        Using: [
            draw_circle(10, "red"),
            move(40),
            control_mob(MobKind.Light),
            lifespan(20),
            grid(),
            collide(10),
            health(1),
        ],
    };
}

function mob_heavy_blueprint(game: Game): Blueprint2D {
    return {
        Using: [
            draw_circle(20, "dodgerblue"),
            move(20),
            control_mob(MobKind.Heavy),
            lifespan(40),
            grid(),
            collide(20),
            health(5),
        ],
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
            control_spawn(bullet_blueprint, 0.3, 0.1),
        ],
    };
}

function bullet_blueprint(game: Game): Blueprint2D {
    return {
        Using: [draw_rect(5, 5, "black"), move(100), lifespan(10), collide(5), damage(1), grid()],
    };
}
