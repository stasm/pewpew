export function lifespan(remaining) {
    return (game, entity) => {
        game.World.Signature[entity] |= 512 /* Lifespan */;
        game.World.Lifespan[entity] = {
            Remaining: remaining,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2xpZmVzcGFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tX2xpZmVzcGFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLE1BQU0sVUFBVSxRQUFRLENBQUMsU0FBaUI7SUFDdEMsT0FBTyxDQUFDLElBQVUsRUFBRSxNQUFjLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsc0JBQWdCLENBQUM7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDMUIsU0FBUyxFQUFFLFNBQVM7U0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUMifQ==