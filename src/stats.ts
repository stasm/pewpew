export interface Stats {
    Ticks: number;
    UpdateTime: number;
    EntityCount: number;
    EntityCreate: number;
    EntityDestroy: number;
    SignatureChange: number;
    DrawCall: number;
}

export function reset_stats(frame: Stats) {
    frame.UpdateTime = 0;
    frame.EntityCount = 0;
    frame.EntityCreate = 0;
    frame.EntityDestroy = 0;
    frame.SignatureChange = 0;
    frame.DrawCall = 0;
}

export function update_stats(total: Stats, frame: Stats) {
    total.Ticks++;

    total.UpdateTime += frame.UpdateTime;
    total.EntityCount += frame.EntityCount;
    total.EntityCreate += frame.EntityCreate;
    total.EntityDestroy += frame.EntityDestroy;
    total.SignatureChange += frame.SignatureChange;
    total.DrawCall += frame.DrawCall;
}

export function print_averages(total: Stats) {
    console.log("Total ticks:", total.Ticks);
    console.log("Averages per frame:", {
        UpdateTime: total.UpdateTime / total.Ticks,
        EntityCount: total.EntityCount / total.Ticks,
        EntityCreate: total.EntityCreate / total.Ticks,
        EntityDestroy: total.EntityDestroy / total.Ticks,
        SignatureChange: total.SignatureChange / total.Ticks,
        DrawCall: total.DrawCall / total.Ticks,
    });
}
