const TaskManager = require("./Task.manager");
const SpawnManager = require("./Spawn.manager");
const HardstuckManager = require("./Hardstuck.manager");

export const loop = (): void => {
    // Cleanup memory of dead creeps
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) delete Memory.creeps[name];
    }

    // Assign tasks
    for (const creepName in Game.creeps) {
        TaskManager.assignTask(Game.creeps[creepName]);
    }

    // Spawn new creeps
    for (const spawnName in Game.spawns) {
        SpawnManager.spawnCreep(Game.spawns[spawnName]);
    }

    // Check for stuck creepsx
    HardstuckManager.checkHardstuck();

    // Update Visuals
    TaskManager.updateVisuals();
};
