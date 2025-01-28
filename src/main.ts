import { runSpawnManager } from './spawnManager';
import { runHarvester } from './role.harvester';
import { runUpgrader } from './role.upgrader';
import { Visuals } from './visuals';
import { runBuilder } from './role.builder';

export const loop = (): void => {
    for (const roomName in Game.rooms) {
        const room = Game.rooms[roomName];

        // Draw the upgrade overlay for each controlled room
        Visuals.visualizeConstructionSites(room);
        Visuals.visualizeController(room);
    }
    
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log(`💀 Creep ${name} entfernt`);
            delete Memory.creeps[name];
        }
    }

    const spawn = Game.spawns['Spawn1'];
    if (spawn) {
        runSpawnManager(spawn);
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role === 'harvester') {
            runHarvester(creep);
        } else if (creep.memory.role === 'upgrader') {
            runUpgrader(creep);
        } else if (creep.memory.role === 'builder') {
            runBuilder(creep);
        }
    }
};