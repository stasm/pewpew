'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function instantiate(game, blueprint) {
    game.FrameStats.EntityCreate++;
    let entity = game.World.CreateEntity();
    for (let mixin of blueprint) {
        mixin(game, entity);
    }
    return entity;
}
function destroy(game, entity) {
    if (game.World.Signature[entity] & 4 /* Children */) {
        for (let child of game.World.Children[entity].Children) {
            destroy(game, child);
        }
    }
    if (game.World.Signature[entity] !== 0) {
        game.FrameStats.EntityDestroy++;
        game.World.DestroyEntity(entity);
    }
}

function create() {
    return [1, 0, 0, 1, 0, 0];
}
function invert(out, a) {
    let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
    let atx = a[4], aty = a[5];
    let det = aa * ad - ab * ac;
    if (!det) {
        return null;
    }
    det = 1.0 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
}
function multiply(out, a, b) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
}
function from_translation(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
}
function rotate(out, a, rad) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
}
function scale(out, a, v) {
    let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
    let v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
}
function get_rotation(a) {
    return Math.atan2(a[1], a[0]);
}
function get_translation(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    return out;
}

function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}
function scale$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}
function distance_squared(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return x * x + y * y;
}

const QUERY = 32768 /* Transform2D */ | 1 /* Aim */;
function sys_aim(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) == QUERY) {
            update(game, i);
        }
    }
}
// entity must be top-level; target doesn't.
function update(game, entity) {
    let aim = game.World.Aim[entity];
    if (aim.Target) {
        let transform = game.World.Transform2D[entity];
        let target_transform = game.World.Transform2D[aim.Target];
        let target_position = [0, 0];
        get_translation(target_position, target_transform.WorldSpace);
        let diff = [0, 0];
        subtract(diff, target_position, transform.Translation);
        transform.Rotation = Math.atan2(diff[1], diff[0]);
        transform.Dirty = true;
    }
}

const QUERY$1 = 2 /* Camera */ | 32768 /* Transform2D */;
function sys_camera(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$1) == QUERY$1) {
            update$1(game, i);
            // Support only one camera.
            return;
        }
    }
}
function update$1(game, entity) {
    let transform = game.World.Transform2D[entity];
    let camera = game.World.Camera[entity];
    invert(camera.View, transform.WorldSpace);
    game.Camera = camera;
}

const QUERY$2 = 32768 /* Transform2D */ | 8 /* Collide */;
function sys_collide(game, delta) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            check_collisions_in_cell(game.World, game.Grid[y][x]);
        }
    }
}
function check_collisions_in_cell(world, cell) {
    // Collect all colliders in this cell.
    let all_colliders = [];
    for (let occupant of cell.Occupants) {
        if ((world.Signature[occupant] & QUERY$2) === QUERY$2) {
            let transform = world.Transform2D[occupant];
            let collider = world.Collide[occupant];
            // Prepare the collider for this tick.
            collider.Collisions = [];
            get_translation(collider.Center, transform.WorldSpace);
            all_colliders.push(collider);
        }
    }
    for (let i = 0; i < all_colliders.length; i++) {
        check_collisions_between(all_colliders[i], all_colliders, i + 1);
    }
}
function check_collisions_between(collider, colliders, offset) {
    for (let i = offset; i < colliders.length; i++) {
        let other = colliders[i];
        if (other !== collider && intersect(collider, other)) {
            collider.Collisions.push(other.EntityId);
            other.Collisions.push(collider.EntityId);
        }
    }
}
function intersect(a, b) {
    return distance_squared(a.Center, b.Center) < (a.Radius + b.Radius) ** 2;
}

const QUERY$3 = 16 /* ControlAlways */ | 4096 /* Move */ | 32768 /* Transform2D */;
function sys_control_always(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$3) == QUERY$3) {
            update$2(game, i);
        }
    }
}
function update$2(game, entity) {
    let control = game.World.ControlAlways[entity];
    let move = game.World.Move[entity];
    let transform = game.World.Transform2D[entity];
    if (control.Forward) {
        move.Direction = [transform.WorldSpace[0], transform.WorldSpace[1]];
    }
    if (control.Rotation) {
        move.Rotation = control.Rotation;
    }
}

function children(...blueprints) {
    return (game, entity) => {
        let child_entities = [];
        for (let blueprint of blueprints) {
            let child = instantiate(game, blueprint);
            child_entities.push(child);
        }
        game.World.Signature[entity] |= 4 /* Children */;
        game.World.Children[entity] = {
            Children: child_entities,
        };
    };
}
/**
 * Yield entities matching a component mask. The query is tested against the
 * parent and all its descendants.
 *
 * @param world World object which stores the component data.
 * @param parent Parent entity to traverse.
 * @param mask Component mask to look for.
 */
function* query_all(world, parent, mask) {
    if (world.Signature[parent] & mask) {
        yield parent;
    }
    if (world.Signature[parent] & 4 /* Children */) {
        for (let child of world.Children[parent].Children) {
            yield* query_all(world, child, mask);
        }
    }
}

function control_always(forward, rotation) {
    return (game, entity) => {
        game.World.Signature[entity] |= 16 /* ControlAlways */;
        game.World.ControlAlways[entity] = {
            Forward: forward,
            Rotation: rotation,
        };
    };
}

/**
 * Spawn blueprints at random intervals with the average interval of `frequency`.
 *
 * @param creator The function returning the blueprint to spawn.
 * @param frequency The average frequency of spawning.
 * @param scatter The amount of directional scattering of spawning, in Rad.
 */
function spawn(creator, frequency, scatter) {
    return (game, entity) => {
        game.World.Signature[entity] |= 16384 /* Spawn */;
        game.World.Spawn[entity] = {
            Creator: creator,
            Frequency: frequency,
            Scatter: scatter * 2,
            SinceLast: 0,
        };
    };
}

function draw_circle(radius, color) {
    return (game, entity) => {
        game.World.Signature[entity] |= 256 /* Draw */;
        game.World.Draw[entity] = {
            Kind: 0 /* Circle */,
            Radius: radius,
            Color: color,
        };
    };
}
function draw_rect(width, height, color) {
    return (game, entity) => {
        game.World.Signature[entity] |= 256 /* Draw */;
        game.World.Draw[entity] = {
            Kind: 1 /* Rect */,
            Width: width,
            Height: height,
            Color: color,
        };
    };
}

function lifespan(remaining) {
    return (game, entity) => {
        game.World.Signature[entity] |= 512 /* Lifespan */;
        game.World.Lifespan[entity] = {
            Remaining: remaining,
        };
    };
}

function move(Speed) {
    return (game, entity) => {
        game.World.Signature[entity] |= 4096 /* Move */;
        game.World.Move[entity] = {
            Speed,
            Direction: null,
            Rotation: 0,
        };
    };
}

/**
 * sys_shake modifies the transform of the entity. Add it to children only.
 */
function shake(duration, magnitude) {
    return (game, entity) => {
        game.World.Signature[entity] |= 8192 /* Shake */;
        game.World.Shake[entity] = {
            Duration: duration,
            Magnitude: magnitude,
        };
    };
}

function transform2d(translation = [0, 0], rotation = 0, scale = [1, 1]) {
    return (game, entity) => {
        game.World.Signature[entity] |= 32768 /* Transform2D */;
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

function explosion_blueprint(game, translation) {
    return [
        transform2d(translation, Math.random() * Math.PI * 2),
        lifespan(0.1),
        children([transform2d(), shake(Infinity, 1), spawn(rivet_blueprint, 0, Math.PI)]),
    ];
}
function rivet_blueprint(game) {
    return [
        transform2d(),
        move(50),
        control_always(true, 0),
        lifespan(2),
        children([
            transform2d(),
            move(0),
            control_always(false, 5),
            children([transform2d([3, 0]), draw_rect(5, 9, "silver")], [transform2d([-3, 0], Math.PI / 2), draw_rect(5, 9, "silver")]),
        ]),
    ];
}

const QUERY$4 = 32 /* ControlMob */ | 2048 /* Health */;
function sys_control_mob(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$4) === QUERY$4) {
            update$3(game, i);
        }
    }
}
function update$3(game, entity) {
    let control = game.World.ControlMob[entity];
    let health = game.World.Health[entity];
    let transform = game.World.Transform2D[entity];
    if (health.Amount <= 0) {
        game.FrameStats.SignatureChange++;
        game.World.Signature[entity] &= ~(2048 /* Health */ | 1024 /* Grid */ | 8 /* Collide */ | 4096 /* Move */);
        transform.Rotation = Math.random() * Math.PI * 2;
        transform.Dirty = true;
        let world_position = [0, 0];
        get_translation(world_position, transform.WorldSpace);
        game.Nursery.push(explosion_blueprint(game, world_position));
        for (let child of query_all(game.World, entity, 4096 /* Move */)) {
            game.World.Signature[child] &= ~4096 /* Move */;
        }
        for (let child of query_all(game.World, entity, 256 /* Draw */)) {
            let draw = game.World.Draw[child];
            draw.Color = "silver";
        }
    }
    switch (control.Kind) {
        case 1 /* Drone */:
        case 0 /* Light */: {
            if (Math.random() < 0.1) {
                transform.Rotation += (Math.random() - 0.5) * 0.1;
                transform.Dirty = true;
            }
            if (health.Amount <= 0 && game.Camera) {
                let shake = game.World.Shake[game.Camera.EntityId];
                if (shake.Duration < 0.1) {
                    shake.Duration = 0.2;
                    shake.Magnitude = 2;
                }
            }
            break;
        }
        case 2 /* Heavy */: {
            if (health.Amount <= 0 && game.Camera) {
                let shake = game.World.Shake[game.Camera.EntityId];
                shake.Duration = 0.5;
                shake.Magnitude = 10;
            }
            break;
        }
    }
}

let seed = 1;
function set_seed(new_seed) {
    seed = 198706 * new_seed;
}
function rand() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
}
function integer(min = 0, max = 1) {
    return ~~(rand() * (max - min + 1) + min);
}
function element(arr) {
    return arr[integer(0, arr.length - 1)];
}

const QUERY$5 = 1 /* Aim */ | 64 /* ControlTurret */ | 1024 /* Grid */;
function sys_control_turret(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$5) === QUERY$5) {
            update$4(game, i);
        }
    }
}
function update$4(game, entity) {
    let aim = game.World.Aim[entity];
    let grid = game.World.Grid[entity];
    if (!grid.Cell) {
        return;
    }
    let mobs = find_nearest_mobs(game.World, grid.Cell);
    if (mobs) {
        let mob = element(mobs);
        aim.Target = mob;
    }
    else {
        aim.Target = undefined;
    }
}
function find_nearest_mobs(world, cell) {
    let queue = [cell];
    let visited = new Set(queue);
    while (queue.length > 0) {
        let current = queue.shift();
        let mobs = [];
        for (let occupant of current.Occupants) {
            if (world.Signature[occupant] & 32 /* ControlMob */) {
                mobs.push(occupant);
            }
        }
        if (mobs.length > 0) {
            return mobs;
        }
        for (let neighbor of current.Neighbors) {
            if (neighbor && !visited.has(neighbor)) {
                queue.push(neighbor);
                visited.add(neighbor);
            }
        }
    }
    return null;
}

const QUERY$6 = 8 /* Collide */ | 128 /* Damage */;
function sys_damage(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$6) == QUERY$6) {
            update$5(game, i);
        }
    }
}
function update$5(game, entity) {
    let collide = game.World.Collide[entity];
    let damage = game.World.Damage[entity];
    if (collide.Collisions.length > 0) {
        game.Morgue.add(entity);
        let other = collide.Collisions[0];
        if (game.World.Signature[other] & 2048 /* Health */) {
            let health = game.World.Health[other];
            health.Amount -= damage.Amount;
        }
        else {
            game.Morgue.add(entity);
        }
    }
}

const QUERY$7 = 32768 /* Transform2D */ | 256 /* Draw */;
function sys_draw2d(game, delta) {
    game.Context2D.resetTransform();
    game.Context2D.fillStyle = "#e6e6e6";
    game.Context2D.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);
    if (!game.Camera) {
        return;
    }
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$7) == QUERY$7) {
            let transform = game.World.Transform2D[i];
            multiply(transform.CameraSpace, game.Camera.View, transform.WorldSpace);
            game.Context2D.setTransform(transform.CameraSpace[0], transform.CameraSpace[1], transform.CameraSpace[2], transform.CameraSpace[3], transform.CameraSpace[4], transform.CameraSpace[5]);
            let draw = game.World.Draw[i];
            switch (draw.Kind) {
                case 1 /* Rect */:
                    draw_rect$1(game, draw);
                    break;
                case 0 /* Circle */:
                    draw_circle$1(game, draw);
                    break;
            }
        }
    }
}
function draw_rect$1(game, draw) {
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
    game.FrameStats.DrawCall++;
    game.Context2D.strokeRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
    game.FrameStats.DrawCall++;
}
function draw_circle$1(game, draw) {
    game.Context2D.lineWidth = 2;
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.beginPath();
    game.Context2D.arc(0, 0, draw.Radius, 0, 2 * Math.PI);
    game.Context2D.fill();
    game.FrameStats.DrawCall++;
    game.Context2D.lineTo(0, 0);
    game.Context2D.stroke();
    game.FrameStats.DrawCall++;
}

const QUERY$8 = 1024 /* Grid */ | 32768 /* Transform2D */;
function sys_grid(game, delta) {
    for (let y = 0; y < 10; y++) {
        for (let x = 0; x < 10; x++) {
            game.Grid[y][x].Occupants.clear();
        }
    }
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$8) == QUERY$8) {
            update$6(game, i);
        }
    }
}
function update$6(game, entity, delta) {
    var _a;
    let transform = game.World.Transform2D[entity];
    let grid = game.World.Grid[entity];
    let world_position = [0, 0];
    get_translation(world_position, transform.WorldSpace);
    let cell_width = game.ViewportWidth / 10;
    let cell_height = game.ViewportHeight / 10;
    let x = Math.floor(world_position[0] / cell_width);
    let y = Math.floor(world_position[1] / cell_height);
    let cell = (_a = game.Grid[y]) === null || _a === void 0 ? void 0 : _a[x];
    if (cell) {
        grid.Cell = cell;
        cell.Occupants.add(entity);
    }
    else {
        grid.Cell = undefined;
    }
}

const QUERY$9 = 512 /* Lifespan */;
function sys_lifespan(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$9) == QUERY$9) {
            update$7(game, i, delta);
        }
    }
}
function update$7(game, entity, delta) {
    let lifespan = game.World.Lifespan[entity];
    lifespan.Remaining -= delta;
    if (lifespan.Remaining < 0) {
        game.Morgue.add(entity);
    }
}

const QUERY$a = 32768 /* Transform2D */ | 4096 /* Move */;
function sys_move(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$a) == QUERY$a) {
            update$8(game, i, delta);
        }
    }
}
function update$8(game, entity, delta) {
    let transform = game.World.Transform2D[entity];
    let move = game.World.Move[entity];
    if (move.Direction) {
        transform.Translation[0] += move.Direction[0] * move.Speed * delta;
        transform.Translation[1] += move.Direction[1] * move.Speed * delta;
        transform.Dirty = true;
        move.Direction = null;
    }
    if (move.Rotation) {
        transform.Rotation += move.Rotation * delta;
        transform.Dirty = true;
        move.Rotation = 0;
    }
}

const QUERY$b = 32768 /* Transform2D */ | 8192 /* Shake */;
function sys_shake(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$b) == QUERY$b) {
            update$9(game, i, delta);
        }
    }
}
function update$9(game, entity, delta) {
    let shake = game.World.Shake[entity];
    if (shake.Duration > 0) {
        shake.Duration -= delta;
        let transform = game.World.Transform2D[entity];
        transform.Translation = [Math.random() * 2 - 1, Math.random() * 2 - 1];
        scale$1(transform.Translation, transform.Translation, shake.Magnitude);
        transform.Dirty = true;
        if (shake.Duration <= 0) {
            shake.Duration = 0;
            transform.Translation[0] = 0;
            transform.Translation[1] = 0;
        }
    }
}

const QUERY$c = 32768 /* Transform2D */ | 16384 /* Spawn */;
function sys_spawn(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$c) == QUERY$c) {
            update$a(game, i, delta);
        }
    }
}
function update$a(game, entity, delta) {
    let control = game.World.Spawn[entity];
    control.SinceLast += delta;
    if (control.SinceLast > control.Frequency) {
        control.SinceLast = 0;
        let transform = game.World.Transform2D[entity];
        let world_position = [0, 0];
        get_translation(world_position, transform.WorldSpace);
        let world_rotation = get_rotation(transform.WorldSpace);
        game.Nursery.push([
            ...control.Creator(game),
            transform2d(world_position, world_rotation + (Math.random() - 0.5) * control.Scatter),
        ]);
    }
}

const QUERY$d = 32768 /* Transform2D */;
function sys_transform2d(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY$d) === QUERY$d) {
            game.FrameStats.EntityCount++;
            let transform = game.World.Transform2D[i];
            if (transform.Dirty) {
                update_transform(game.World, i, transform);
            }
        }
    }
}
function update_transform(world, entity, transform) {
    transform.Dirty = false;
    from_translation(transform.WorldSpace, transform.Translation);
    rotate(transform.WorldSpace, transform.WorldSpace, transform.Rotation);
    scale(transform.WorldSpace, transform.WorldSpace, transform.Scale);
    if (transform.Parent !== undefined) {
        let parent_transform = world.Transform2D[transform.Parent];
        multiply(transform.WorldSpace, parent_transform.WorldSpace, transform.WorldSpace);
    }
    invert(transform.SelfSpace, transform.WorldSpace);
    if (world.Signature[entity] & 4 /* Children */) {
        let hierarchy = world.Children[entity];
        for (let child of hierarchy.Children) {
            let child_transform = world.Transform2D[child];
            child_transform.Parent = entity;
            update_transform(world, child, child_transform);
        }
    }
}

class World {
    constructor() {
        this.Signature = [];
        this.Graveyard = [];
        // Component data
        this.Aim = [];
        this.Camera = [];
        this.Children = [];
        this.Collide = [];
        this.ControlAlways = [];
        this.ControlMob = [];
        this.Spawn = [];
        this.Damage = [];
        this.Draw = [];
        this.Lifespan = [];
        this.Grid = [];
        this.Health = [];
        this.Move = [];
        this.Shake = [];
        this.Transform2D = [];
    }
    CreateEntity() {
        if (this.Graveyard.length > 0) {
            return this.Graveyard.pop();
        }
        // Push a new signature and return its index.
        return this.Signature.push(0) - 1;
    }
    DestroyEntity(entity) {
        this.Signature[entity] = 0;
        this.Graveyard.push(entity);
    }
}

class Game {
    constructor() {
        this.World = new World();
        this.Nursery = [];
        this.Morgue = new Set();
        this.ViewportWidth = 1000;
        this.ViewportHeight = 1000;
        this.Grid = [];
        this.FrameStats = {
            Ticks: 0,
            UpdateTime: 0,
            EntityCount: 0,
            EntityCreate: 0,
            EntityDestroy: 0,
            SignatureChange: 0,
            DrawCall: 0,
        };
    }
    FrameUpdate(delta) {
        // AI.
        sys_control_turret(this);
        sys_control_mob(this);
        sys_spawn(this, delta);
        sys_control_always(this);
        // Game logic.
        sys_lifespan(this, delta);
        sys_move(this, delta);
        sys_shake(this, delta);
        sys_aim(this);
        // Commit.
        sys_transform2d(this);
        sys_grid(this);
        // Collisions.
        sys_collide(this);
        sys_damage(this);
        // Render.
        sys_camera(this);
        sys_draw2d(this);
        // Create new entities and destroy the existing ones at the end of the
        // frame. If this is done mid-frame, not all systems will run for a
        // given entity, depending on where it's created or destroyed.
        for (let blueprint of this.Nursery) {
            instantiate(this, blueprint);
        }
        for (let entity of this.Morgue) {
            destroy(this, entity);
        }
        this.Nursery = [];
        this.Morgue.clear();
    }
}

function collide(radius) {
    return (game, entity) => {
        game.World.Signature[entity] |= 8 /* Collide */;
        game.World.Collide[entity] = {
            EntityId: entity,
            Radius: radius,
            Center: [0, 0],
            Collisions: [],
        };
    };
}

function control_mob(kind) {
    return (game, entity) => {
        game.World.Signature[entity] |= 32 /* ControlMob */;
        game.World.ControlMob[entity] = {
            Kind: kind,
        };
    };
}

function grid() {
    return (game, entity) => {
        game.World.Signature[entity] |= 1024 /* Grid */;
        game.World.Grid[entity] = {
            Cell: undefined,
        };
    };
}

function health(amount) {
    return (game, entity) => {
        game.World.Signature[entity] |= 2048 /* Health */;
        game.World.Health[entity] = {
            Amount: amount,
        };
    };
}

const TURRET_COUNT = 15;
const TURRET_SHOOT_FREQUENCY = 0.3;
const MOB_LIGHT_SPAWN_FREQUENCY = 0;
const MOB_LIGHT_SPEED = 40;
const MOB_LIGHT_LIFESPAN = 15;
const MOB_DRONE_SPAWN_FREQUENCY = 0.3;
const MOB_DRONE_SPEED = 100;
const MOB_DRONE_LIFESPAN = 10;
const MOB_HEAVY_SPAWN_FREQUENCY = 1;
const MOB_HEAVY_SPEED = 20;
const MOB_HEAVY_LIFESPAN = 40;

function mob_light_blueprint(game) {
    return [
        transform2d(),
        draw_circle(10, "red"),
        move(MOB_LIGHT_SPEED),
        control_mob(0 /* Light */),
        control_always(true, 0),
        lifespan(MOB_LIGHT_LIFESPAN),
        grid(),
        collide(10),
        health(1),
    ];
}
function mob_drone_blueprint(game) {
    return [
        transform2d(),
        move(MOB_DRONE_SPEED),
        control_mob(1 /* Drone */),
        control_always(true, 0),
        lifespan(MOB_DRONE_LIFESPAN),
        grid(),
        collide(20),
        health(3),
        draw_rect(10, 7, "orange"),
        children([transform2d([7, 7]), draw_circle(5, "orange"), move(0), control_always(false, -30)], [transform2d([7, -7]), draw_circle(5, "orange"), move(0), control_always(false, 30)], [transform2d([-7, 7]), draw_circle(5, "orange"), move(0), control_always(false, -30)], [transform2d([-7, -7]), draw_circle(5, "orange"), move(0), control_always(false, 30)]),
    ];
}
function mob_heavy_blueprint(game) {
    return [
        transform2d(),
        draw_circle(20, "dodgerblue"),
        move(MOB_HEAVY_SPEED),
        control_mob(2 /* Heavy */),
        control_always(true, 0),
        lifespan(MOB_HEAVY_LIFESPAN),
        grid(),
        collide(20),
        health(5),
        children([
            transform2d(),
            move(0),
            control_always(false, 1),
            children([transform2d([25, 0]), draw_rect(3, 10, "black")], [transform2d([0, 25]), draw_rect(10, 3, "black")], [transform2d([-25, 0]), draw_rect(3, 10, "black")], [transform2d([0, -25]), draw_rect(10, 3, "black")]),
        ]),
    ];
}

function aim(target) {
    return (game, entity) => {
        game.World.Signature[entity] |= 1 /* Aim */;
        game.World.Aim[entity] = {
            Target: target,
        };
    };
}

function control_turret() {
    return (game, entity) => {
        game.World.Signature[entity] |= 64 /* ControlTurret */;
    };
}

function damage(amount) {
    return (game, entity) => {
        game.World.Signature[entity] |= 128 /* Damage */;
        game.World.Damage[entity] = {
            Amount: amount,
        };
    };
}

function turret_blueprint(game) {
    return [
        transform2d(),
        draw_circle(10, "gold"),
        grid(),
        control_turret(),
        aim(),
        spawn(bullet_blueprint, TURRET_SHOOT_FREQUENCY, 0.1),
    ];
}
function bullet_blueprint(game) {
    return [
        transform2d(),
        draw_rect(3, 3, "black"),
        move(100),
        control_always(true, 0),
        lifespan(10),
        collide(5),
        damage(1),
        grid(),
    ];
}

function camera() {
    return (game, entity) => {
        game.World.Signature[entity] |= 2 /* Camera */;
        game.World.Camera[entity] = {
            EntityId: entity,
            View: create(),
        };
    };
}

function scene_stage(game) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    set_seed(Date.now());
    game.World = new World();
    {
        // Create a 10x10 grid of cells.
        // 1. Create the cells.
        for (let y = 0; y < 10; y++) {
            game.Grid[y] = [];
            for (let x = 0; x < 10; x++) {
                game.Grid[y][x] = {
                    Index: [x, y],
                    Occupants: new Set(),
                    Neighbors: [],
                };
            }
        }
        // 2. Link neghboring cells.
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                game.Grid[y][x].Neighbors = [
                    (_a = 
                    // Top: middle, left, right.
                    game.Grid[y - 1]) === null || _a === void 0 ? void 0 : _a[x + 0],
                    (_b = game.Grid[y - 1]) === null || _b === void 0 ? void 0 : _b[x - 1],
                    (_c = game.Grid[y - 1]) === null || _c === void 0 ? void 0 : _c[x + 1],
                    (_d = 
                    // Middle: left, right,
                    game.Grid[y + 0]) === null || _d === void 0 ? void 0 : _d[x - 1],
                    (_e = game.Grid[y + 0]) === null || _e === void 0 ? void 0 : _e[x + 1],
                    (_f = 
                    // Bottom: middle, left, right.
                    game.Grid[y + 1]) === null || _f === void 0 ? void 0 : _f[x + 0],
                    (_g = game.Grid[y + 1]) === null || _g === void 0 ? void 0 : _g[x - 1],
                    (_h = game.Grid[y + 1]) === null || _h === void 0 ? void 0 : _h[x + 1],
                ];
            }
        }
    }
    instantiate(game, [transform2d(), camera(), shake(0, 0)]);
    for (let i = 1; i < TURRET_COUNT + 1; i++) {
        instantiate(game, [
            ...turret_blueprint(),
            transform2d([(game.ViewportWidth * i) / (TURRET_COUNT + 1), game.ViewportHeight * 0.9], -Math.PI / 2),
        ]);
    }
    instantiate(game, [
        transform2d([game.ViewportWidth / 2, game.ViewportHeight / 10], Math.PI / 2, [1, 5]),
        children([
            transform2d(),
            spawn(mob_light_blueprint, MOB_LIGHT_SPAWN_FREQUENCY, 0.3),
            shake(Infinity, 100),
        ], [
            transform2d(),
            spawn(mob_drone_blueprint, MOB_DRONE_SPAWN_FREQUENCY, 1),
            shake(Infinity, 100),
        ], [
            transform2d(),
            spawn(mob_heavy_blueprint, MOB_HEAVY_SPAWN_FREQUENCY, 0.5),
            shake(Infinity, 100),
        ]),
    ]);
    // Commit.
    sys_transform2d(game);
    sys_grid(game);
}

function reset_stats(frame) {
    frame.UpdateTime = 0;
    frame.EntityCount = 0;
    frame.EntityCreate = 0;
    frame.EntityDestroy = 0;
    frame.SignatureChange = 0;
    frame.DrawCall = 0;
}
function update_stats(total, frame) {
    total.Ticks++;
    total.UpdateTime += frame.UpdateTime;
    total.EntityCount += frame.EntityCount;
    total.EntityCreate += frame.EntityCreate;
    total.EntityDestroy += frame.EntityDestroy;
    total.SignatureChange += frame.SignatureChange;
    total.DrawCall += frame.DrawCall;
}
function print_averages(total) {
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

let update_span = document.getElementById("update");
let delta_span = document.getElementById("delta");
let fps_span = document.getElementById("fps");
function update_framerate(delta, update) {
    if (update_span) {
        update_span.textContent = update.toFixed(1);
    }
    if (delta_span) {
        delta_span.textContent = (delta * 1000).toFixed(1);
    }
    if (fps_span) {
        fps_span.textContent = (1 / delta).toFixed();
    }
}

class BrowserGame extends Game {
    constructor() {
        super();
        this.AnimationRequestId = 0;
        this.StatsIntervalId = 0;
        this.Canvas = document.querySelector("canvas");
        this.Context2D = this.Canvas.getContext("2d");
        this.TotalStats = {
            Ticks: 0,
            UpdateTime: 0,
            EntityCount: 0,
            EntityCreate: 0,
            EntityDestroy: 0,
            SignatureChange: 0,
            DrawCall: 0,
        };
        this.Canvas.width = this.ViewportWidth;
        this.Canvas.height = this.ViewportHeight;
    }
    Start() {
        let tick = (now) => {
            let delta = (now - last) / 1000;
            this.FrameUpdate(delta);
            last = now;
            this.AnimationRequestId = requestAnimationFrame(tick);
        };
        let last = performance.now();
        tick(last);
        this.StatsIntervalId = window.setInterval(() => print_averages(game.TotalStats), 1000);
    }
    Stop() {
        cancelAnimationFrame(this.AnimationRequestId);
        clearInterval(this.StatsIntervalId);
    }
    FrameUpdate(delta) {
        reset_stats(this.FrameStats);
        let now = performance.now();
        super.FrameUpdate(delta);
        // Performance measurement and stats.
        this.FrameStats.UpdateTime = performance.now() - now;
        update_stats(this.TotalStats, this.FrameStats);
        update_framerate(delta, this.FrameStats.UpdateTime);
    }
}
let game = new BrowserGame();
scene_stage(game);
game.Start();

exports.game = game;
