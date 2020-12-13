class _tower {
    static find() {
        const rooms = [];

        for (let i in Game.rooms) {
            const room = Game.rooms[i];
            const structures = room.find(FIND_MY_STRUCTURES, {
                filter: (strc) => {
                    return strc.structureType == 'tower';
                }
            });
            rooms[`${room.name}.towers`] = structures;
        }
        
        return rooms;
    }

    static logic(towers) {
        for (let i in towers) {
            const tower = towers[i];
            const hostileCreeps = tower.room.hostileCreeps
            if (hostileCreeps != null) tower.attack(hostileCreeps[0]);
        }
    }

    static run() {
        const rooms = this.find();
        for (let i in rooms) (rooms[i] != null) ? this.logic(rooms[i]) : {}
    }
}