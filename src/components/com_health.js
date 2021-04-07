export function health(amount) {
    return (game, entity) => {
        game.World.Signature[entity] |= 2048 /* Health */;
        game.World.Health[entity] = {
            Amount: amount,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2hlYWx0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbV9oZWFsdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFjO0lBQ2pDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFjLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDeEIsTUFBTSxFQUFFLE1BQU07U0FDakIsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUMifQ==