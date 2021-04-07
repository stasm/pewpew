export function move(Speed) {
    return (game, entity) => {
        game.World.Signature[entity] |= 4096 /* Move */;
        game.World.Move[entity] = {
            Speed,
            Direction: null,
            Rotation: 0,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX21vdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21fbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFhQSxNQUFNLFVBQVUsSUFBSSxDQUFDLEtBQWE7SUFDOUIsT0FBTyxDQUFDLElBQVUsRUFBRSxNQUFjLEVBQUUsRUFBRTtRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsbUJBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztZQUN0QixLQUFLO1lBQ0wsU0FBUyxFQUFFLElBQUk7WUFDZixRQUFRLEVBQUUsQ0FBQztTQUNkLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDIn0=