export function run(creep: Creep) {
    let target = Game.creeps["Harvester1"].room.find(FIND_SOURCES)[0];

    if (creep.store.getFreeCapacity() === 0) {
        console.log("Creep ist voll");

        // creep.moveTo(Game.spawns["Spawn1"].pos);

        creep.transfer(
            Game.spawns["Spawn1"],
            RESOURCE_ENERGY
        );
    } else {
        creep.moveTo(target);
        creep.harvest(target);
    }
}