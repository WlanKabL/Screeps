export const runHarvester = (creep: Creep): void => {
    if (creep.memory.role !== "harvester") {
        return;
    }
    
    // If the creep has free capacity, gather energy
    if (creep.store.getFreeCapacity() > 0) {
        const source = creep.pos.findClosestByPath(FIND_SOURCES);

        if (!source) {
            setIdleState(creep);
            return;
        }

        const harvestResult = creep.harvest(source);

        if (harvestResult === ERR_NOT_IN_RANGE) {
            setMovingState(creep, source, "#11ff11", "🏃🏼 Moving");
            return;
        }

        if (harvestResult === OK) {
            setHarvestingState(creep);
            return;
        }

        // If no other state applies, set idle
        setIdleState(creep);
        return;
    }

    // If the creep is full, transfer energy to spawn or extensions
    const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (structure) =>
            (structure.structureType === STRUCTURE_SPAWN ||
                structure.structureType === STRUCTURE_EXTENSION) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
    });

    if (target) {
        const transferResult = creep.transfer(target, RESOURCE_ENERGY);

        if (transferResult === ERR_NOT_IN_RANGE) {
            setMovingState(creep, target, "#11ff11", "🏃🏼 Moving");
            return;
        }

        if (transferResult === OK) {
            setTransferringState(creep);
            return;
        }
    }

    // If there’s no valid target, move to parking lot
    setIdleState(creep);
    creep.moveTo(Game.flags["HarvesterParkingLot"], { visualizePathStyle: { stroke: '#ffaa00' }});
};

// Helper function to set the creep's state to "moving"
const setMovingState = (
    creep: Creep,
    target: RoomPosition | { pos: RoomPosition },
    pathColor: string,
    message: string
): void => {
    if (creep.memory.status !== "moving") {
        creep.memory.status = "moving";
        creep.say(message);
    }
    creep.moveTo(target, { visualizePathStyle: { stroke: pathColor } });
};

// Helper function to set the creep's state to "harvesting"
const setHarvestingState = (creep: Creep): void => {
    if (creep.memory.status !== "harvesting") {
        creep.memory.status = "harvesting";
        creep.say("🔄 Harvest");
    }
};

// Helper function to set the creep's state to "transferring"
const setTransferringState = (creep: Creep): void => {
    if (creep.memory.status !== "transferring") {
        creep.memory.status = "transferring";
        creep.say("💴 Transferring");
    }
};

// Helper function to set the creep's state to "idle"
const setIdleState = (creep: Creep): void => {
    if (creep.memory.status !== "idle") {
        creep.memory.status = "idle";
        creep.say("⏰ Waiting");
    }
};