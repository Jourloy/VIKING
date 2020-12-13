// remouteWorker.js

const remouteWorker = new VikingCreep({
    role: 'remouteWorker',
    body: {
        pattern: [WORK, CARRY],
    }
});
remouteWorker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    if (creep.memory.destinationRoom == null) {
        const roomInfo = creep.findRoomInformation();
        for (j in roomInfo.exit) {
            for (let i in Game.creeps) {
                const aCreep = Game.creeps[i];

                let amount = 0;
                if (aCreep.memory.role === 'remouteWorker' && aCreep.memory.destinationRoom != null && aCreep.memory.destinationRoom === roomInfo.exit[j]) amount++;

                if (amount < 5) {
                    creep.memory.destinationRoom = roomInfo.exit[j];
                    break;
                }
            }

            if (creep.memory.destinationRoom != null) break;
        }
    }

    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

    if (creep.memory.mode === 0) {
        if (creep.memory.targetRoom == null) {
            let roomDir;
            switch (creep.memory.destinationRoom) {
                case 1:
                    roomDir = FIND_EXIT_TOP;
                    break;
                case 3:
                    roomDir = FIND_EXIT_RIGHT;
                    break;
                case 5:
                    roomDir = FIND_EXIT_BOTTOM;
                    break;
                case 7:
                    roomDir = FIND_EXIT_LEFT;
                    break;
            }
            creep.memory.targetRoom = creep.pos.findClosestByPath(roomDir);
        }

        if (creep.room.name === creep.memory.birthRoom) creep.moveTo(creep.memory.targetRoom.x, creep.memory.targetRoom.y);
        creep.getResource();
    }
    else if (creep.memory.mode === 1) {
        if (creep.room.name !== creep.memory.birthRoom) creep.travelTo(creep.memory.birthRoom);
        const cs = creep.room.find(FIND_CONSTRUCTION_SITES);
        let structures = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (strc) => {
                return strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity());
            }
        });
        const spawns = creep.room.find(FIND_MY_SPAWNS);
        const spawn = spawns[0];
        structures = structures.sort(function (a, b) { return spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b); });

        const roomInfo = creep.findRoomInformation();

        if (structures.length > 0) creep.refillJR()
        else if (roomInfo.structures.needRepair.length > 0) creep.repairJR(roomInfo.structures.needRepair[0]);
        else if (cs.length > 0) creep.buildJR(cs[0]);
        else creep.upgradeJR();
    }
}