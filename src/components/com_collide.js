export function collide(radius) {
    return (game, entity) => {
        game.World.Signature[entity] |= 8 /* Collide */;
        game.World.Collide[entity] = {
            EntityId: entity,
            Radius: radius,
            Center: [0, 0],
            Collisions: [],
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2NvbGxpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21fY29sbGlkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjQSxNQUFNLFVBQVUsT0FBTyxDQUFDLE1BQWM7SUFDbEMsT0FBTyxDQUFDLElBQVUsRUFBRSxNQUFjLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQWUsQ0FBQztRQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRztZQUN6QixRQUFRLEVBQUUsTUFBTTtZQUNoQixNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDZCxVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQyJ9