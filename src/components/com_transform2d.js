import { create } from "../toolkit/mat2d.js";
export function transform2d(translation = [0, 0], rotation = 0, scale = [1, 1]) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX3RyYW5zZm9ybTJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tX3RyYW5zZm9ybTJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQXFCM0MsTUFBTSxVQUFVLFdBQVcsQ0FBQyxjQUFvQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxXQUFnQixDQUFDLEVBQUUsUUFBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0YsT0FBTyxDQUFDLElBQVUsRUFBRSxNQUFjLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkJBQW1CLENBQUM7UUFDaEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDN0IsVUFBVSxFQUFFLE1BQU0sRUFBRTtZQUNwQixTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQ25CLFdBQVcsRUFBRSxNQUFNLEVBQUU7WUFDckIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDIn0=