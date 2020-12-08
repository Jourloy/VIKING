/**
 * Reserver add in memory room.
 * If he see in this room any hostile creeps, then he run in home room and place
 * war flag. If war flag placed, then spawn start create defenders
 *
 * @param {Creep} creep
 */
function Reserver(creep) {
    if (!creep.memory.targetRoom) Error(`Creep [id: ${creep.id}] have not target room in memory`);
    else {
        if (creep.room.name != targetRoom) {
            creep.moveTo();
        } else {
            const roomName = creep.room.name
            const information = GetRoomInformation(roomName);
            const room = creep.room;
            if (information.HostileCreeps && !Game.flags[roomName] && !creep.memory.HostileCreeps) {
                room.createFlag(25, 25, roomName, COLOR_BLUE, COLOR_BLUE);
                creep.memory.HostileCreeps = true;
            } else if (!creep.memory.HostileCreeps && !information.HostileCreeps) {
                if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller);
                if (creep.signController(creep.room.controller, RESERVE_SIGN) == ERR_NOT_IN_RANGE) {};
            } else if (creep.memory.HostileCreeps && Game.flags[roomName]) {
                creep.moveTo(new RoomPosition(Game.rooms[creep.memory.room].controller.pos, creep.memory.room), {reusePath: 50});
            }
        }
    }
}
