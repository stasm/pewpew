export class FakeRenderingContext2D {
    fillStyle: string | CanvasGradient | CanvasPattern = "black";
    lineWidth: number = 1;

    setTransform(a: number, b: number, c: number, d: number, e: number, f: number) {}
    resetTransform() {}

    fillRect(x: number, y: number, width: number, height: number) {}
    strokeRect(x: number, y: number, width: number, height: number) {}
    beginPath() {}
    arc(x: number, y: number, radius: number, angle_start: number, angle_end: number) {}
    fill() {}
    lineTo(x: number, y: number) {}
    stroke() {}
}
