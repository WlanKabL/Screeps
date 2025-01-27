module.exports.loop = function() {
    console.log('Neuer Spieltick gestartet');

    Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
};