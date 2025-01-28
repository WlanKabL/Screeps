export const runSpawnManager = (spawn: StructureSpawn): void => {
    const roleCounts = {
        harvester: Object.values(Game.creeps).filter((c: Creep) => c.memory.role === 'harvester').length,
        upgrader: Object.values(Game.creeps).filter((c: Creep) => c.name.toLowerCase().includes('upgrader')).length,
    };

    console.log(`Harvester: ${roleCounts.harvester}, Upgrader: ${roleCounts.upgrader}`);

    if (roleCounts.harvester < 5) {
        spawnCreep(spawn, 'harvester', [WORK, CARRY, MOVE]);
    } else if (roleCounts.upgrader < 12) {
        spawnCreep(spawn, 'upgrader', [WORK, CARRY, MOVE]);
    }
};

const spawnCreep = (spawn: StructureSpawn, role: CreepRole, bodyParts: BodyPartConstant[]): void => {
    const newName = `${role}_${Game.time}`;
    if (
        spawn.spawnCreep(bodyParts, newName, {
            memory: { role, upgrading: false, status: 'spawned' },
        }) === OK
    ) {
        console.log(`🚀 Spawning new ${role}: ${newName}`);
    }
};