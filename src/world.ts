import {Aim} from "./components/com_aim.js";
import {Camera} from "./components/com_camera.js";
import {Collide} from "./components/com_collide.js";
import {ControlMob} from "./components/com_control_mob.js";
import {ControlSpawn} from "./components/com_control_spawn.js";
import {ControlTurret} from "./components/com_control_turret.js";
import {Damage} from "./components/com_damage.js";
import {Draw} from "./components/com_draw.js";
import {Grid} from "./components/com_grid.js";
import {Health} from "./components/com_health.js";
import {Lifespan} from "./components/com_lifespan.js";
import {Move} from "./components/com_move.js";
import {Shake} from "./components/com_shake.js";
import {Transform2D} from "./components/com_transform2d.js";
import {Entity} from "./game.js";

const enum Component {
    Aim,
    Camera,
    Collide,
    ControlMob,
    ControlSpawn,
    ControlTurret,
    Damage,
    Draw,
    Lifespan,
    Grid,
    Health,
    Move,
    Shake,
    Transform2D,
}

export const enum Has {
    Aim = 1 << Component.Aim,
    Camera = 1 << Component.Camera,
    Collide = 1 << Component.Collide,
    ControlMob = 1 << Component.ControlMob,
    ControlSpawn = 1 << Component.ControlSpawn,
    ControlTurret = 1 << Component.ControlTurret,
    Damage = 1 << Component.Damage,
    Draw = 1 << Component.Draw,
    Lifespan = 1 << Component.Lifespan,
    Grid = 1 << Component.Grid,
    Health = 1 << Component.Health,
    Move = 1 << Component.Move,
    Shake = 1 << Component.Shake,
    Transform2D = 1 << Component.Transform2D,
}

export class World {
    Signature: Array<number> = [];
    Graveyard: Array<Entity> = [];

    // Component data
    Aim: Array<Aim> = [];
    Camera: Array<Camera> = [];
    Collide: Array<Collide> = [];
    ControlMob: Array<ControlMob> = [];
    ControlSpawn: Array<ControlSpawn> = [];
    ControlTurret: Array<ControlTurret> = [];
    Damage: Array<Damage> = [];
    Draw: Array<Draw> = [];
    Lifespan: Array<Lifespan> = [];
    Grid: Array<Grid> = [];
    Health: Array<Health> = [];
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
