module.exports.loop = function() {
    console.log('--- Neuer Tick ---'); 
    for (let name in Memory.creeps) if (!Game.creeps[name]) delete Memory.creeps[name]; 

    let spawn = Game.spawns['Spawn1']; 
    let roles = [ 
        { role: 'harvester', count: 3, body: [WORK, CARRY, MOVE] }, 
        { role: 'builder', count: 2, body: [WORK, CARRY, MOVE] }, 
        { role: 'upgrader', count: 2, body: [WORK, CARRY, MOVE] }, 
        { role: 'defender', count: 1, body: [TOUGH, ATTACK, MOVE] }, 
        { role: 'attacker', count: 1, body: [TOUGH, ATTACK, ATTACK, MOVE] } 
    ];

    let creepCounts = _.countBy(Game.creeps, c => c.memory.role); 
    for (const { role, count, body } of roles) if ((creepCounts[role] || 0) < count && spawn.spawnCreep(body, `${role}_${Game.time}`, { memory: { role } }) === OK) break; 

    for (let creep of Object.values(Game.creeps)) {
        if (creep.memory.role === 'harvester') manageHarvester(creep);
        else if (creep.memory.role === 'builder') manageBuilder(creep);
        else if (creep.memory.role === 'upgrader') manageUpgrader(creep);
        else if (creep.memory.role === 'defender') manageDefender(creep);
        else if (creep.memory.role === 'attacker') manageAttacker(creep);
    }
};

function manageHarvester(c) { c.store.getFreeCapacity() > 0 ? moveOrAct(c, FIND_SOURCES, 'harvest') : moveOrAct(c, FIND_MY_STRUCTURES, 'transfer', { filter: s => [STRUCTURE_SPAWN, STRUCTURE_EXTENSION].includes(s.structureType) && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0 }); }
function manageBuilder(c) { c.store[RESOURCE_ENERGY] === 0 ? moveOrAct(c, FIND_SOURCES, 'harvest') : moveOrAct(c, FIND_CONSTRUCTION_SITES, 'build'); }
function manageUpgrader(c) { c.store[RESOURCE_ENERGY] === 0 ? moveOrAct(c, FIND_SOURCES, 'harvest') : moveOrAct(c, FIND_MY_STRUCTURES, 'upgradeController', c.room.controller); }
function manageDefender(c) { moveOrAct(c, FIND_HOSTILE_CREEPS, 'attack') || c.moveTo(Game.flags['Defend'] || Game.spawns['Spawn1']); }
function manageAttacker(c) { moveOrAct(c, FIND_HOSTILE_CREEPS, 'attack') || c.moveTo(Game.flags['Attack'] || Game.spawns['Spawn1']); }

function moveOrAct(creep, type, action, opts) { let target = creep.pos.findClosestByPath(type, opts); if (target) creep[action](target) === ERR_NOT_IN_RANGE && creep.moveTo(target, { visualizePathStyle: { stroke: '#ffaa00' } }); }
