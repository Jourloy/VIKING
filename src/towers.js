class Tower {
    static find() {
        const roomsJR = {};

        for (let i in Game.rooms) {
            const room = Game.rooms[i];
            const structures = room.find(FIND_MY_STRUCTURES, {
                filter: (strc) => {
                    return strc.structureType == 'tower';
                }
            });
            roomsJR[`${room.name}.towers`] = structures;
        }
        
        return roomsJR;
    }

    static logic(towers) {
        for (let i in towers) {
            const tower = towers[i];
            const hostileCreeps = tower.findHostileCreeps();
            if (hostileCreeps != null) tower.attack(hostileCreeps);
        }
    }

    static run() {
        const towers = this.find();

        for (let i in towers) (towers[i] != null) ? this.logic(towers[i]) : {}
    }
}