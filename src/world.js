export class World {
    constructor() {
        this.Signature = [];
        this.Graveyard = [];
        // Component data
        this.Aim = [];
        this.Camera = [];
        this.Children = [];
        this.Collide = [];
        this.ControlAlways = [];
        this.ControlMob = [];
        this.Spawn = [];
        this.Damage = [];
        this.Draw = [];
        this.Lifespan = [];
        this.Grid = [];
        this.Health = [];
        this.Move = [];
        this.Shake = [];
        this.Transform2D = [];
    }
    CreateEntity() {
        if (this.Graveyard.length > 0) {
            return this.Graveyard.pop();
        }
        // Push a new signature and return its index.
        return this.Signature.push(0) - 1;
    }
    DestroyEntity(entity) {
        this.Signature[entity] = 0;
        this.Graveyard.push(entity);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ybGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3b3JsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1REEsTUFBTSxPQUFPLEtBQUs7SUFBbEI7UUFDSSxjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUM5QixjQUFTLEdBQWtCLEVBQUUsQ0FBQztRQUU5QixpQkFBaUI7UUFDakIsUUFBRyxHQUFlLEVBQUUsQ0FBQztRQUNyQixXQUFNLEdBQWtCLEVBQUUsQ0FBQztRQUMzQixhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQUMvQixZQUFPLEdBQW1CLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUF5QixFQUFFLENBQUM7UUFDekMsZUFBVSxHQUFzQixFQUFFLENBQUM7UUFDbkMsVUFBSyxHQUFpQixFQUFFLENBQUM7UUFDekIsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFDM0IsU0FBSSxHQUFnQixFQUFFLENBQUM7UUFDdkIsYUFBUSxHQUFvQixFQUFFLENBQUM7UUFDL0IsU0FBSSxHQUFnQixFQUFFLENBQUM7UUFDdkIsV0FBTSxHQUFrQixFQUFFLENBQUM7UUFDM0IsU0FBSSxHQUFnQixFQUFFLENBQUM7UUFDdkIsVUFBSyxHQUFpQixFQUFFLENBQUM7UUFDekIsZ0JBQVcsR0FBdUIsRUFBRSxDQUFDO0lBZXpDLENBQUM7SUFiRyxZQUFZO1FBQ1IsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDM0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRyxDQUFDO1NBQ2hDO1FBRUQsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBYztRQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0oifQ==