import { destroy, instantiate } from "./entity.js";
import { sys_aim } from "./systems/sys_aim.js";
import { sys_camera } from "./systems/sys_camera.js";
import { sys_collide } from "./systems/sys_collide.js";
import { sys_control_always } from "./systems/sys_control_always.js";
import { sys_control_mob } from "./systems/sys_control_mob.js";
import { sys_control_turret } from "./systems/sys_control_turret.js";
import { sys_damage } from "./systems/sys_damage.js";
import { sys_draw2d } from "./systems/sys_draw2d.js";
import { sys_grid } from "./systems/sys_grid.js";
import { sys_lifespan } from "./systems/sys_lifespan.js";
import { sys_move } from "./systems/sys_move.js";
import { sys_shake } from "./systems/sys_shake.js";
import { sys_spawn } from "./systems/sys_spawn.js";
import { sys_transform2d } from "./systems/sys_transform2d.js";
import { World } from "./world.js";
export class Game {
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
        sys_control_turret(this, delta);
        sys_control_mob(this, delta);
        sys_spawn(this, delta);
        sys_control_always(this, delta);
        // Game logic.
        sys_lifespan(this, delta);
        sys_move(this, delta);
        sys_shake(this, delta);
        sys_aim(this, delta);
        // Commit.
        sys_transform2d(this, delta);
        sys_grid(this, delta);
        // Collisions.
        sys_collide(this, delta);
        sys_damage(this, delta);
        // Render.
        sys_camera(this, delta);
        sys_draw2d(this, delta);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsT0FBTyxFQUFZLE9BQU8sRUFBRSxXQUFXLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFNUQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDckQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQzdELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUNuRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDL0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFlBQVksQ0FBQztBQUlqQyxNQUFNLE9BQWdCLElBQUk7SUFBMUI7UUFDSSxVQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQXFCLEVBQUUsQ0FBQztRQUMvQixXQUFNLEdBQWdCLElBQUksR0FBRyxFQUFFLENBQUM7UUFFaEMsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDckIsbUJBQWMsR0FBRyxJQUFJLENBQUM7UUFJdEIsU0FBSSxHQUEyQixFQUFFLENBQUM7UUFHbEMsZUFBVSxHQUFVO1lBQ2hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsVUFBVSxFQUFFLENBQUM7WUFDYixXQUFXLEVBQUUsQ0FBQztZQUNkLFlBQVksRUFBRSxDQUFDO1lBQ2YsYUFBYSxFQUFFLENBQUM7WUFDaEIsZUFBZSxFQUFFLENBQUM7WUFDbEIsUUFBUSxFQUFFLENBQUM7U0FDZCxDQUFDO0lBMENOLENBQUM7SUF4Q0csV0FBVyxDQUFDLEtBQWE7UUFDckIsTUFBTTtRQUNOLGtCQUFrQixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoQyxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkIsa0JBQWtCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhDLGNBQWM7UUFDZCxZQUFZLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEIsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2QixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJCLFVBQVU7UUFDVixlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFdEIsY0FBYztRQUNkLFdBQVcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekIsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixVQUFVO1FBQ1YsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QixVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLHNFQUFzRTtRQUN0RSxtRUFBbUU7UUFDbkUsOERBQThEO1FBRTlELEtBQUssSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxXQUFXLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsS0FBSyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDekI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDSiJ9