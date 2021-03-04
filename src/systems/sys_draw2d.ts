import {multiply} from "../../common/mat2d.js";
import {DrawCircle, DrawKind, DrawRect} from "../components/com_draw.js";
import {Game} from "../game.js";
import {Has} from "../world.js";

const QUERY = Has.Transform2D | Has.Draw;

export function sys_draw2d(game: Game, delta: number) {
    game.Context2D.resetTransform();
    game.Context2D.fillStyle = "#e6e6e6";
    game.Context2D.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);

    if (!game.Camera) {
        return;
    }

    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            let transform = game.World.Transform2D[i];
            multiply(transform.CameraSpace, game.Camera.View, transform.WorldSpace);

            game.Context2D.setTransform(
                transform.CameraSpace[0],
                transform.CameraSpace[1],
                transform.CameraSpace[2],
                transform.CameraSpace[3],
                transform.CameraSpace[4],
                transform.CameraSpace[5]
            );

            let draw = game.World.Draw[i];
            switch (draw.Kind) {
                case DrawKind.Rect:
                    draw_rect(game, draw);
                    break;
                case DrawKind.Circle:
                    draw_circle(game, draw);
                    break;
            }
        }
    }
}

function draw_rect(game: Game, draw: DrawRect) {
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
}

function draw_circle(game: Game, draw: DrawCircle) {
    game.Context2D.lineWidth = 2;
    game.Context2D.fillStyle = draw.Color;

    game.Context2D.beginPath();
    game.Context2D.arc(0, 0, draw.Radius, 0, 2 * Math.PI);
    game.Context2D.fill();
    game.Context2D.lineTo(0, 0);
    game.Context2D.stroke();
}
