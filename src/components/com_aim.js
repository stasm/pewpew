export function aim(target) {
    return (game, entity) => {
        game.World.Signature[entity] |= 1 /* Aim */;
        game.World.Aim[entity] = {
            Target: target,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2FpbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbV9haW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFlO0lBQy9CLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGVBQVcsQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRztZQUNyQixNQUFNLEVBQUUsTUFBTTtTQUNqQixDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQyJ9