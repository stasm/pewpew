import { explosion_blueprint } from "../blueprints/blu_explosion.js";
import { query_all } from "../components/com_children.js";
import { get_translation } from "../toolkit/mat2d.js";
const QUERY = 32 /* ControlMob */ | 2048 /* Health */;
export function sys_control_mob(game, delta) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzX2NvbnRyb2xfbW9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3lzX2NvbnRyb2xfbW9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUd4RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFJcEQsTUFBTSxLQUFLLEdBQUcsdUNBQTJCLENBQUM7QUFFMUMsTUFBTSxVQUFVLGVBQWUsQ0FBQyxJQUFVLEVBQUUsS0FBYTtJQUNyRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDN0MsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNuQjtLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLElBQVUsRUFBRSxNQUFjO0lBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRS9DLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7UUFDcEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FB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