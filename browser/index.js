import { Game } from "../src/game.js";
import { scene_stage } from "../src/scenes/sce_stage.js";
import { print_averages, reset_stats, update_stats } from "../src/stats.js";
import { update_framerate } from "./framerate.js";
class BrowserGame extends Game {
    constructor() {
        super();
        this.AnimationRequestId = 0;
        this.StatsIntervalId = 0;
        this.Canvas = document.querySelector("canvas");
        this.Context2D = this.Canvas.getContext("2d");
        this.TotalStats = {
            Ticks: 0,
            UpdateTime: 0,
            EntityCount: 0,
            EntityCreate: 0,
            EntityDestroy: 0,
            SignatureChange: 0,
            DrawCall: 0,
        };
        this.Canvas.width = this.ViewportWidth;
        this.Canvas.height = this.ViewportHeight;
    }
    Start() {
        let tick = (now) => {
            let delta = (now - last) / 1000;
            this.FrameUpdate(delta);
            last = now;
            this.AnimationRequestId = requestAnimationFrame(tick);
        };
        let last = performance.now();
        tick(last);
        this.StatsIntervalId = window.setInterval(() => print_averages(game.TotalStats), 1000);
    }
    Stop() {
        cancelAnimationFrame(this.AnimationRequestId);
        clearInterval(this.StatsIntervalId);
    }
    FrameUpdate(delta) {
        reset_stats(this.FrameStats);
        let now = performance.now();
        super.FrameUpdate(delta);
        // Performance measurement and stats.
        this.FrameStats.UpdateTime = performance.now() - now;
        update_stats(this.TotalStats, this.FrameStats);
        update_framerate(delta, this.FrameStats.UpdateTime);
    }
}
export let game = new BrowserGame();
scene_stage(game);
game.Start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEMsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBQyxjQUFjLEVBQUUsV0FBVyxFQUFTLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRWhELE1BQU0sV0FBWSxTQUFRLElBQUk7SUFpQjFCO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFqQkosdUJBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRTVCLFdBQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBQzNDLGNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUUxQyxlQUFVLEdBQVU7WUFDaEIsS0FBSyxFQUFFLENBQUM7WUFDUixVQUFVLEVBQUUsQ0FBQztZQUNiLFdBQVcsRUFBRSxDQUFDO1lBQ2QsWUFBWSxFQUFFLENBQUM7WUFDZixhQUFhLEVBQUUsQ0FBQztZQUNoQixlQUFlLEVBQUUsQ0FBQztZQUNsQixRQUFRLEVBQUUsQ0FBQztTQUNkLENBQUM7UUFJRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0MsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQ3ZCLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLElBQUksR0FBRyxHQUFHLENBQUM7WUFDWCxJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVYLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCxJQUFJO1FBQ0Esb0JBQW9CLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUMsYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsV0FBVyxDQUFDLEtBQWE7UUFDckIsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFNUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV6QixxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNyRCxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKO0FBRUQsTUFBTSxDQUFDLElBQUksSUFBSSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFDcEMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyJ9