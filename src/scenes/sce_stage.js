import { mob_drone_blueprint, mob_heavy_blueprint, mob_light_blueprint, } from "../blueprints/blu_mobs.js";
import { turret_blueprint } from "../blueprints/blu_turret.js";
import { camera } from "../components/com_camera.js";
import { children } from "../components/com_children.js";
import { spawn } from "../components/com_control_spawn.js";
import { shake } from "../components/com_shake.js";
import { transform2d } from "../components/com_transform2d.js";
import { MOB_DRONE_SPAWN_FREQUENCY, MOB_HEAVY_SPAWN_FREQUENCY, MOB_LIGHT_SPAWN_FREQUENCY, TURRET_COUNT, } from "../config.js";
import { instantiate } from "../entity.js";
import { sys_grid } from "../systems/sys_grid.js";
import { sys_transform2d } from "../systems/sys_transform2d.js";
import { set_seed } from "../toolkit/random.js";
import { World } from "../world.js";
export function scene_stage(game) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
                    (_a = 
                    // Top: middle, left, right.
                    game.Grid[y - 1]) === null || _a === void 0 ? void 0 : _a[x + 0],
                    (_b = game.Grid[y - 1]) === null || _b === void 0 ? void 0 : _b[x - 1],
                    (_c = game.Grid[y - 1]) === null || _c === void 0 ? void 0 : _c[x + 1],
                    (_d = 
                    // Middle: left, right,
                    game.Grid[y + 0]) === null || _d === void 0 ? void 0 : _d[x - 1],
                    (_e = game.Grid[y + 0]) === null || _e === void 0 ? void 0 : _e[x + 1],
                    (_f = 
                    // Bottom: middle, left, right.
                    game.Grid[y + 1]) === null || _f === void 0 ? void 0 : _f[x + 0],
                    (_g = game.Grid[y + 1]) === null || _g === void 0 ? void 0 : _g[x - 1],
                    (_h = game.Grid[y + 1]) === null || _h === void 0 ? void 0 : _h[x + 1],
                ];
            }
        }
    }
    instantiate(game, [transform2d(), camera(), shake(0, 0)]);
    for (let i = 1; i < TURRET_COUNT + 1; i++) {
        instantiate(game, [
            ...turret_blueprint(game),
            transform2d([(game.ViewportWidth * i) / (TURRET_COUNT + 1), game.ViewportHeight * 0.9], -Math.PI / 2),
        ]);
    }
    instantiate(game, [
        transform2d([game.ViewportWidth / 2, game.ViewportHeight / 10], Math.PI / 2, [1, 5]),
        children([
            transform2d(),
            spawn(mob_light_blueprint, MOB_LIGHT_SPAWN_FREQUENCY, 0.3),
            shake(Infinity, 100),
        ], [
            transform2d(),
            spawn(mob_drone_blueprint, MOB_DRONE_SPAWN_FREQUENCY, 1),
            shake(Infinity, 100),
        ], [
            transform2d(),
            spawn(mob_heavy_blueprint, MOB_HEAVY_SPAWN_FREQUENCY, 0.5),
            shake(Infinity, 100),
        ]),
    ]);
    // Commit.
    sys_transform2d(game, 0);
    sys_grid(game, 0);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NlX3N0YWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2NlX3N0YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLG1CQUFtQixHQUN0QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDdkQsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pELE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDN0QsT0FBTyxFQUNILHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIseUJBQXlCLEVBQ3pCLFlBQVksR0FDZixNQUFNLGNBQWMsQ0FBQztBQUN0QixPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDOUQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFbEMsTUFBTSxVQUFVLFdBQVcsQ0FBQyxJQUFVOztJQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFckIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXpCO1FBQ0ksZ0NBQWdDO1FBRWhDLHVCQUF1QjtRQUN2QixLQUFLLElBQUksQ0FBQyxH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