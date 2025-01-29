export const runSpawnManager = (spawn: StructureSpawn): void => {
    const roleCounts = {
        harvester: Object.values(Game.creeps).filter((c: Creep) => c.memory.role === 'harvester').length,
        upgrader: Object.values(Game.creeps).filter((c: Creep) => c.memory.role === 'upgrader').length,
        builder: Object.values(Game.creeps).filter((c: Creep) => c.memory.role === 'builder').length,
    };

    console.log(`Harvester: ${roleCounts.harvester}, Upgrader: ${roleCounts.upgrader}, Builder: ${roleCounts.builder}`);

    const energyAvailable = spawn.room.energyAvailable;

    let bodyParts: BodyPartConstant[] = [];
    if (energyAvailable >= 300) {
        bodyParts = [WORK, CARRY, MOVE, MOVE]; // Größerer Builder
    } else {
        return;
        bodyParts = [WORK, CARRY, MOVE]; // Standard Builder
    }
    
    if (roleCounts.harvester < 5) {
        spawnCreep(spawn, 'harvester', bodyParts);
    } else if (roleCounts.upgrader < 5) {
        spawnCreep(spawn, 'upgrader', bodyParts);
    } else if (roleCounts.builder < 12) {
        spawnCreep(spawn, 'builder', bodyParts);
    }
};

const spawnCreep = (spawn: StructureSpawn, role: CreepRole, bodyParts: BodyPartConstant[]): void => {
    const newName = `${role}_${Game.time}`;
    const result = spawn.spawnCreep(bodyParts, newName, {
        memory: { role, upgrading: false, status: 'spawned' },
    })

    if (result === OK) {
        console.log(`🚀 Spawning new ${role}: ${newName}`);
    }
};