import {Entity, Game} from "../game.js";
import {create} from "../toolkit/mat2d.js";
import {Mat2D, Rad, Vec2} from "../toolkit/math.js";
import {Has} from "../world.js";

export interface Transform2D {
    /** Absolute matrix relative to the world. */
    WorldSpace: Mat2D;
    /** World to self matrix. */
    SelfSpace: Mat2D;
    /** Transformation matrix relative to the camera. */
    CameraSpace: Mat2D;
    /** Local translation relative to the parent. */
    Translation: Vec2;
    /** Local rotation relative to the parent. */
    Rotation: Rad;
    /** Local scale relative to the parent. */
    Scale: Vec2;
    Parent?: Entity;
    Dirty: boolean;
}

export function transform2d(translation: Vec2 = [0, 0], rotation: Rad = 0, scale: Vec2 = [1, 1]) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Transform2D;
        game.World.Transform2D[entity] = {
            WorldSpace: create(),
            SelfSpace: create(),
            CameraSpace: create(),
            Translation: translation,
            Rotation: rotation,
            Scale: scale,
            Dirty: true,
        };
    };
}
