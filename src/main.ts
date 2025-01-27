const harvester = require('role.harvester');

module.exports.loop = function () {
    console.log("Neuer Spieltick gestartet");

    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], "Harvester2");

    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        if (creep.body[0].type === WORK) {
            harvester.run(creep)
        }
    }
};
