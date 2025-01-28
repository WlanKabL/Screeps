import { StateManager } from './stateManager';

export const runBuilder = (creep: Creep): void => {
    if (creep.memory.role !== 'builder') {
        return;
    }

    if (creep.memory.status === 'upgrading') {
        
    }

    // If the creep's energy is empty, switch to harvesting mode
    if (creep.store[RESOURCE_ENERGY] === 0 || creep.memory.status === 'harvesting') {
        if (creep.store.getFreeCapacity() === 0) {
            StateManager.updateState(creep, 'building', '🚧 Building');
            return;
        }

        StateManager.updateState(creep, 'harvesting', '🔄 Harvesting');

        // Try to withdraw energy from containers or storage first
        const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) =>
                (structure.structureType === STRUCTURE_CONTAINER ||
                    structure.structureType === STRUCTURE_STORAGE) &&
                structure.store[RESOURCE_ENERGY] > 0,
        });

        if (container) {
            if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                StateManager.moveTo(creep, container, '#ffaa00');
            }
        } else {
            // Fallback to harvesting energy from sources
            const source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (source) {
                if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    StateManager.moveTo(creep, source, '#ffaa00');
                }
            }
        }

        // Exit the function while harvesting
        return;
    }

    // If the creep's energy is full, switch to building mode
    if (creep.store.getFreeCapacity() === 0 || creep.memory.status === 'building') {
        StateManager.updateState(creep, 'building', '🚧 Building');

        // Find the nearest construction site and build
        const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite) {
            if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
                StateManager.moveTo(creep, constructionSite, '#ffffff');
            }
            return;
        }

        // Fallback: If no construction sites, upgrade the room controller
        const controller = creep.room.controller;
        if (controller) {
            StateManager.updateState(creep, 'upgrading', '⚡ Upgrading');
            if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                StateManager.moveTo(creep, controller, '#11ff11');
            }
        }

        // Exit the function while building or upgrading
        return;
    }

    // Handle cases where the creep's energy is partially filled
    if (creep.store[RESOURCE_ENERGY] > 0 && creep.store.getFreeCapacity() > 0) {
        // Default to harvesting to fill the rest of the energy
        StateManager.updateState(creep, 'harvesting', '🔄 Harvesting');
        const source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) {
            StateManager.moveTo(creep, source, '#ffaa00');
        }
    }
};