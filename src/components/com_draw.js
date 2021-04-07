export function draw_circle(radius, color) {
    return (game, entity) => {
        game.World.Signature[entity] |= 256 /* Draw */;
        game.World.Draw[entity] = {
            Kind: 0 /* Circle */,
            Radius: radius,
            Color: color,
        };
    };
}
export function draw_rect(width, height, color) {
    return (game, entity) => {
        game.World.Signature[entity] |= 256 /* Draw */;
        game.World.Draw[entity] = {
            Kind: 1 /* Rect */,
            Width: width,
            Height: height,
            Color: color,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2RyYXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21fZHJhdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQkEsTUFBTSxVQUFVLFdBQVcsQ0FBQyxNQUFjLEVBQUUsS0FBYTtJQUNyRCxPQUFPLENBQUMsSUFBVSxFQUFFLE1BQWMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxrQkFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ3RCLElBQUksZ0JBQWlCO1lBQ3JCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ04sQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVNELE1BQU0sVUFBVSxTQUFTLENBQUMsS0FBYSxFQUFFLE1BQWMsRUFBRSxLQUFhO0lBQ2xFLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtCQUFZLENBQUM7UUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDdEIsSUFBSSxjQUFlO1lBQ25CLEtBQUssRUFBRSxLQUFLO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsS0FBSztTQUNmLENBQUM7SUFDTixDQUFDLENBQUM7QUFDTixDQUFDIn0=