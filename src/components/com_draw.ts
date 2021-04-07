import {Entity, Game} from "../game.js";
import {Has} from "../world.js";

export type Draw = DrawCircle | DrawRect;

export const enum DrawKind {
    Circle,
    Rect,
}

export interface DrawCircle {
    Kind: DrawKind.Circle;
    Radius: number;
    Color: string;
}

export function draw_circle(radius: number, color: string) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Circle,
            Radius: radius,
            Color: color,
        };
    };
}

export interface DrawRect {
    Kind: DrawKind.Rect;
    Width: number;
    Height: number;
    Color: string;
}

export function draw_rect(width: number, height: number, color: string) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Draw;
        game.World.Draw[entity] = {
            Kind: DrawKind.Rect,
            Width: width,
            Height: height,
            Color: color,
        };
    };
}
