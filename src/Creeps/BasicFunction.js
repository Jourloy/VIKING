// BasicFunctions start here

/**
 * Find hostile creeps in room
 *
 * @param {Object} room
 * @param {string} target
 * @param {Object} optional
 */
function FindHostileCreeps(room, target, optional) {
    if (target == 'in room') {
        const hostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.friends.includes(creep.owner.username));
            }
        });
    }
}

/**
 * Return object with information about room
 *
 * @param {string} roomName
 * @return {Object}
 */
function GetRoomInformation(roomName) {
    if (roomName) {
        return Memory.Information[roomName]
    }
}

/**
 * Return active source in room
 *
 * @param {Creep} creep
 */
function GetActiveSource(creep) {
    const info = Memory.Information[creep.room.name];
    const room = Game.rooms[info.roomName];
    const sources = room.find(FIND_SOURCES_ACTIVE);
    return sources[0];
}

/**
 * Set creep memory
 *
 * @param {Creep} creep
 * @return {int} 0 - need energy/minerals for work. 1 - need go work.
 */
function setMemory(creep) {
    if (creep.store.getUsedCapacity()() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;
}

/**
 * Start upgrade controller
 *
 * @param {Creep} creep
 */
function DoUpgrade(creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { heuristicWeight: 1.2 });
}
