export function grid() {
    return (game, entity) => {
        game.World.Signature[entity] |= 1024 /* Grid */;
        game.World.Grid[entity] = {
            Cell: undefined,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2dyaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21fZ3JpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxNQUFNLFVBQVUsSUFBSTtJQUNoQixPQUFPLENBQUMsSUFBVSxFQUFFLE1BQWMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxtQkFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ3RCLElBQUksRUFBRSxTQUFTO1NBQ2xCLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDIn0=