// Tower start here

function towersControl(tower) {
    const info = GetRoomInformation(tower.roomName);

    if (info.Room.HostileCreeps.State == true) {
        const HostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.Friends.includes(creep.owner.username));
            }
        });

        /**
         * TODO: Add sort HostileCreeps
         *
         * 1. short near my structures
         * 2. not many heal
         * 3. work
         * 4. attack
         **/
        if (HostileCreeps.length > 0) tower.attack(HostileCreeps[0]);
    }
}

const tower = {
    control() {
        for (i in Game.rooms) {
            const room = Game.rooms[i];
            const towers = room.find(FIND_MY_STRUCTURES, {
                filter: (strc) => {
                    return strc.structureType == 'tower';
                }
            });

            for (j in towers) {
                towersControl(towers[j]);
            }
        }
    }
}
