export function control_mob(kind) {
    return (game, entity) => {
        game.World.Signature[entity] |= 32 /* ControlMob */;
        game.World.ControlMob[entity] = {
            Kind: kind,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2NvbnRyb2xfbW9iLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tX2NvbnRyb2xfbW9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWFBLE1BQU0sVUFBVSxXQUFXLENBQUMsSUFBYTtJQUNyQyxPQUFPLENBQUMsSUFBVSxFQUFFLE1BQWMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBa0IsQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUM1QixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDIn0=