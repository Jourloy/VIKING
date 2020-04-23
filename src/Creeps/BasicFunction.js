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
    const info = GetRoomInformation(creep.room.name);
    const room = Game.rooms[info.RoomName];
    const sources = room.find(FIND_SOURCES_ACTIVE);
    if (sources[0]) return sources[0].id;
    else return false;
}

/**
 * Start upgrade controller
 *
 * @param {Creep} creep
 */
function DoUpgrade(creep) {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { heuristicWeight: 1.2 });
}
