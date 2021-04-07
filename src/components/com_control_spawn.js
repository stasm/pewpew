/**
 * Spawn blueprints at random intervals with the average interval of `frequency`.
 *
 * @param creator The function returning the blueprint to spawn.
 * @param frequency The average frequency of spawning.
 * @param scatter The amount of directional scattering of spawning, in Rad.
 */
export function spawn(creator, frequency, scatter) {
    return (game, entity) => {
        game.World.Signature[entity] |= 16384 /* Spawn */;
        game.World.Spawn[entity] = {
            Creator: creator,
            Frequency: frequency,
            Scatter: scatter * 2,
            SinceLast: 0,
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tX2NvbnRyb2xfc3Bhd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21fY29udHJvbF9zcGF3bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFlQTs7Ozs7O0dBTUc7QUFDSCxNQUFNLFVBQVUsS0FBSyxDQUFDLE9BQWdCLEVBQUUsU0FBaUIsRUFBRSxPQUFlO0lBQ3RFLE9BQU8sQ0FBQyxJQUFVLEVBQUUsTUFBYyxFQUFFLEVBQUU7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHFCQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUc7WUFDdkIsT0FBTyxFQUFFLE9BQU87WUFDaEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQztJQUNOLENBQUMsQ0FBQztBQUNOLENBQUMifQ==