export interface Stats {
    Ticks: number;
    UpdateTime: number;
    EntityCount: number;
    EntityCreate: number;
    EntityDestroy: number;
    SignatureChange: number;
}

export function update_stats(total: Stats, frame: Stats) {
    total.Ticks++;

    total.UpdateTime += frame.UpdateTime;
    total.EntityCount += frame.EntityCount;
    total.EntityCreate += frame.EntityCreate;
    total.EntityDestroy += frame.EntityDestroy;
    total.SignatureChange += frame.SignatureChange;

    frame.UpdateTime = 0;
    frame.EntityCount = 0;
    frame.EntityCreate = 0;
    frame.EntityDestroy = 0;
    frame.SignatureChange = 0;
}
