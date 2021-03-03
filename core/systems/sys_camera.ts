import {copy, get_translation, invert, multiply, perspective} from "../../common/mat4.js";
import {CameraDisplay, CameraFramebuffer, CameraKind} from "../components/com_camera.js";
import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform | Has.Camera;

export function sys_camera(game: Game, delta: number) {
    if (game.ViewportWidth != window.innerWidth || game.ViewportHeight != window.innerHeight) {
        game.ViewportWidth = game.Canvas.width = window.innerWidth;
        game.ViewportHeight = game.Canvas.height = window.innerHeight;
        game.ViewportResized = true;
    }

    game.Cameras = [];
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            let camera = game.World.Camera[i];

            if (camera.Kind === CameraKind.Display) {
                update_display(game, i, camera);
                game.Cameras.push(camera);
            }

            if (camera.Kind === CameraKind.Framebuffer) {
                update_framebuffer(game, i, camera);
                game.Cameras.push(camera);
            }
        }
    }
}

function update_display(game: Game, entity: Entity, camera: CameraDisplay) {
    if (game.ViewportResized) {
        let aspect = game.ViewportWidth / game.ViewportHeight;
        if (aspect > 1) {
            // Landscape orientation.
            perspective(camera.Projection, camera.FovY, aspect, camera.Near, camera.Far);
            invert(camera.Unprojection, camera.Projection);
        } else {
            // Portrait orientation.
            perspective(camera.Projection, camera.FovY / aspect, aspect, camera.Near, camera.Far);
            invert(camera.Unprojection, camera.Projection);
        }
    }

    let transform = game.World.Transform[entity];
    copy(camera.View, transform.Self);
    multiply(camera.Pv, camera.Projection, camera.View);
    get_translation(camera.Position, transform.World);
}

function update_framebuffer(game: Game, entity: Entity, camera: CameraFramebuffer) {
    let transform = game.World.Transform[entity];
    multiply(camera.Pv, camera.Projection, transform.Self);
    get_translation(camera.Position, transform.World);
}
