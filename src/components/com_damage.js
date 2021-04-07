export function damage(amount) {
    return (game, entity) => {
        game.World.Signature[entity] |= 128 /* Damage */;
        game.World.Damage[entity] = {
            Amount: amount,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2RhbWFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbV9kYW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxVQUFVLE1BQU0sQ0FBQyxNQUFjO0lBQ2pDLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9CQUFjLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDeEIsTUFBTSxFQUFFLE1BQU07U0FDakIsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUMifQ==