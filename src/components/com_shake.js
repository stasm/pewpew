/**
 * sys_shake modifies the transform of the entity. Add it to children only.
 */
export function shake(duration, magnitude) {
    return (game, entity) => {
        game.World.Signature[entity] |= 8192 /* Shake */;
        game.World.Shake[entity] = {
            Duration: duration,
            Magnitude: magnitude,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX3NoYWtlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tX3NoYWtlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBOztHQUVHO0FBQ0gsTUFBTSxVQUFVLEtBQUssQ0FBQyxRQUFnQixFQUFFLFNBQWlCO0lBQ3JELE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDdkIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLFNBQVM7U0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUMifQ==