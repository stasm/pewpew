export function control_always(forward, rotation) {
    return (game, entity) => {
        game.World.Signature[entity] |= 16 /* ControlAlways */;
        game.World.ControlAlways[entity] = {
            Forward: forward,
            Rotation: rotation,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2NvbnRyb2xfYWx3YXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tX2NvbnRyb2xfYWx3YXlzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE1BQU0sVUFBVSxjQUFjLENBQUMsT0FBZ0IsRUFBRSxRQUFhO0lBQzFELE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLDBCQUFxQixDQUFDO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQy9CLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDIn0=