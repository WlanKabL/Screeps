export const runUpgrader = (creep: Creep): void => {
    // if (creep.memory.role !== 'upgrader') {
    //     return;
    // }

    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.upgrading = false;
        creep.say('🔄 Harvest');
    }

    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
        creep.memory.upgrading = true;
        creep.say('⚡ Upgrade');
    }

    if (!creep.memory.upgrading) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    } else {
        if (creep.upgradeController(creep.room.controller!) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#11ff11' } });
        }
    }
};