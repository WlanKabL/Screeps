import { runSpawnManager } from './spawnManager';
import { runHarvester } from './role.harvester';
import { runUpgrader } from './role.upgrader';

export const loop = (): void => {
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
        }
    }
};