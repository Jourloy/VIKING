// BasicFunctions start here

/**
 * @param {Object} room
 * @param {string} target
 */
function FindHostileCreeps(room, target) {
    if (target == "InRoom") {
        const hostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.friends.includes(creep.owner.username));
            }
        });
    }
}

/**
 * @param {Creep} creep
 */
function GetAllSource(creep) {
    const info = Memory.Information[creep.room.name];
    const room = Game.rooms[info.roomName];
    const sources = room.find(FIND_SOURCES_ACTIVE);
    return sources[0];
}

/**
 * @param {Creep} creep
 */
function setMemory(creep) {
    if (creep.store.getUsedCapacity()() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;
}

/**
 * @param {Creep} creep
 */
function harvesterWork(creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller)
}
