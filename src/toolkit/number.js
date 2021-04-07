export function lerp(from, to, progress) {
    return from + progress * (to - from);
}
export function clamp(min, max, num) {
    return Math.max(min, Math.min(max, num));
}
export function map_range(value, old_min, old_max, new_min, new_max) {
    return ((value - old_min) / (old_max - old_min)) * (new_max - new_min) + new_min;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibnVtYmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sVUFBVSxJQUFJLENBQUMsSUFBWSxFQUFFLEVBQVUsRUFBRSxRQUFnQjtJQUMzRCxPQUFPLElBQUksR0FBRyxRQUFRLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELE1BQU0sVUFBVSxLQUFLLENBQUMsR0FBVyxFQUFFLEdBQVcsRUFBRSxHQUFXO0lBQ3ZELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FDckIsS0FBYSxFQUNiLE9BQWUsRUFDZixPQUFlLEVBQ2YsT0FBZSxFQUNmLE9BQWU7SUFFZixPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDckYsQ0FBQyJ9