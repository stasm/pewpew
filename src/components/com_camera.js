import { create } from "../toolkit/mat2d.js";
export function camera() {
    return (game, entity) => {
        game.World.Signature[entity] |= 2 /* Camera */;
        game.World.Camera[entity] = {
            EntityId: entity,
            View: create(),
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2NhbWVyYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbV9jYW1lcmEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBUzNDLE1BQU0sVUFBVSxNQUFNO0lBQ2xCLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFjLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDeEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsSUFBSSxFQUFFLE1BQU0sRUFBRTtTQUNqQixDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQyJ9