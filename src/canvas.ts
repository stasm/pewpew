export interface MinimalRenderingContext2D {
    fillStyle: string | CanvasGradient | CanvasPattern;
    lineWidth: number;

    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    resetTransform(): void;

    fillRect(x: number, y: number, width: number, height: number): void;
    strokeRect(x: number, y: number, width: number, height: number): void;
    beginPath(): void;
    lineTo(x: number, y: number): void;
    arc(x: number, y: number, radius: number, angle_start: number, angle_end: number): void;
    fill(): void;
    stroke(): void;
}
