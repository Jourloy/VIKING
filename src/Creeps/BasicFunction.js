// BasicFunctions start here

function FindHostileCreeps(room, target) {
    if (target == "InRoom") {
        const hostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.friends.includes(creep.owner.username));
            }
        });
    }
}
