import { instantiate } from "../entity.js";
export function children(...blueprints) {
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
export function* query_all(world, parent, mask) {
    if (world.Signature[parent] & mask) {
        yield parent;
    }
    if (world.Signature[parent] & 4 /* Children */) {
        for (let child of world.Children[parent].Children) {
            yield* query_all(world, child, mask);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2NoaWxkcmVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tX2NoaWxkcmVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBWSxXQUFXLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFRcEQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxHQUFHLFVBQTRCO0lBQ3BELE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLEtBQUssSUFBSSxTQUFTLElBQUksVUFBVSxFQUFFO1lBQzlCLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDekMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBZ0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUMxQixRQUFRLEVBQUUsY0FBYztTQUMzQixDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFZLEVBQUUsTUFBYyxFQUFFLElBQVM7SUFDOUQsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRTtRQUNoQyxNQUFNLE1BQU0sQ0FBQztLQUNoQjtJQUNELElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQWUsRUFBRTtRQUN4QyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQy9DLEtBQUssQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7QUFDTCxDQUFDIn0=