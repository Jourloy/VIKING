// Functions.js

function creepFindHostileCreeps(room) {
    return room.find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => { return (!_screeps.friends().includes(creep.owner.username) && creep.owner.username !== 'JOURLOY') }
    })
}

function creepSay(creep, aim) {
    if (aim == null) aim = 'null';

    if (aim === 'waiting') {
        const text = ['WAIT', 'WAIT.', 'WAIT..', 'WAIT...'];
        creep.say([Game.time%text.length]);
    } else if (aim == 'searching') {
        const text = ['SEARCH', 'SEARCH.', 'SEARCH..', 'SEARCH...'];
        creep.say([Game.time%text.length]);
    } else creep.say(aim);
}

function creepUpgrade(creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, creep.move);
}

function creepRepair(creep) {

}

function creepBuild(creep) {

}

function creepRefill(creep, structure) {
    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(structure, creep.move);
}

function creepFindActiveSource(creep) {
    const room = Game.rooms[creep.room.name];
    const sources = room.find(FIND_SOURCES_ACTIVE);
    if (sources[0] != null) return sources[0].id;
    else return false;
}

const _creep = {
    upgrade: (creep) => creepUpgrade(creep),
    repair: (creep) => creepRepair(creep),
    build: (creep) => creepBuild(creep),
    refill: (creep, structure) => creepRefill(creep, structure),
    repair: (creep) => creepRepair(creep),
    findHostileCreeps: (room) => creepFindHostileCreeps(room),
    findActiveSource: (creep) => creepFindActiveSource(creep),
    getResource: (creep, resource) => function(creep, resource){},
    transferMe: (creep) => function(creep){},
    say: (creep, aim) => creepSay(creep, aim),
}