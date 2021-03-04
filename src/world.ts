import {ControlMob} from "./components/com_control_mob.js";
import {ControlSpawn} from "./components/com_control_spawn.js";
import {ControlTurret} from "./components/com_control_turret.js";
import {Draw} from "./components/com_draw.js";
import {Grid} from "./components/com_grid.js";
import {Lifespan} from "./components/com_lifespan.js";
import {Move} from "./components/com_move.js";
import {Shake} from "./components/com_shake.js";
import {Transform2D} from "./components/com_transform2d.js";
import {Entity} from "./game.js";

const enum Component {
    ControlMob,
    ControlSpawn,
    ControlTurret,
    Draw,
    Lifespan,
    Grid,
    Move,
    Shake,
    Transform2D,
}

export const enum Has {
    ControlMob = 1 << Component.ControlMob,
    ControlSpawn = 1 << Component.ControlSpawn,
    ControlTurret = 1 << Component.ControlTurret,
    Draw = 1 << Component.Draw,
    Lifespan = 1 << Component.Lifespan,
    Grid = 1 << Component.Grid,
    Move = 1 << Component.Move,
    Shake = 1 << Component.Shake,
    Transform2D = 1 << Component.Transform2D,
}

export class World {
    Signature: Array<number> = [];
    Graveyard: Array<Entity> = [];

    // Component data
    ControlMob: Array<ControlMob> = [];
    ControlSpawn: Array<ControlSpawn> = [];
    ControlTurret: Array<ControlTurret> = [];
    Draw: Array<Draw> = [];
    Lifespan: Array<Lifespan> = [];
    Grid: Array<Grid> = [];
    Move: Array<Move> = [];
    Shake: Array<Shake> = [];
    Transform2D: Array<Transform2D> = [];

    CreateEntity() {
        if (this.Graveyard.length > 0) {
            return this.Graveyard.pop()!;
        }

        if (DEBUG && this.Signature.length > 10000) {
            throw new Error("No more entities available.");
        }

        // Push a new signature and return its index.
        return this.Signature.push(0) - 1;
    }

    DestroyEntity(entity: Entity) {
        this.Signature[entity] = 0;

        if (DEBUG && this.Graveyard.includes(entity)) {
            throw new Error("Entity already in graveyard.");
        }

        this.Graveyard.push(entity);
    }
}
