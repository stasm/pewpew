import {Vec2} from "./math.js";

export function set(out: Vec2, x: number, y: number) {
    out[0] = x;
    out[1] = y;
    return out;
}

export function copy(out: Vec2, a: Vec2) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}

export function add(out: Vec2, a: Vec2, b: Vec2) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

export function subtract(out: Vec2, a: Vec2, b: Vec2) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

export function scale(out: Vec2, a: Vec2, b: number) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}

export function negate(out: Vec2, a: Vec2) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}

export function normalize(out: Vec2, a: Vec2) {
    let x = a[0];
    let y = a[1];
    let len = x * x + y * y;

    if (len > 0) {
        len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
}

export function dot(a: Vec2, b: Vec2) {
    return a[0] * b[0] + a[1] * b[1];
}

export function length(a: Vec2) {
    return Math.hypot(a[0], a[1]);
}

export function distance(a: Vec2, b: Vec2) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return Math.hypot(x, y);
}

export function distance_squared(a: Vec2, b: Vec2) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return x * x + y * y;
}

export function manhattan(a: Vec2, b: Vec2) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export function lerp(out: Vec2, a: Vec2, b: Vec2, t: number) {
    let ax = a[0];
    let ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}
