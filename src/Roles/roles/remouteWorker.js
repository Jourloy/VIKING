// remouteWorker.js

const remouteWorker = new _creep({
    role: 'remouteWorker',
    body: {
        pattern: [WORK, CARRY],
    }
});
remouteWorker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    if (creep.memory.destinationRoom == null) {
        const exits = creep.room.exits;
        const amountCreep = {
            '1': (exits['1'] != null) ? 0 : 15,
            '3': (exits['3'] != null) ? 0 : 15,
            '5': (exits['5'] != null) ? 0 : 15,
            '7': (exits['7'] != null) ? 0 : 15
        }
        for (let i in Game.creeps) {
            const aCreep = Game.creeps[i];
            if (aCreep.memory.birthRoom === creep.memory.birthRoom && aCreep.memory.role === 'remouteWorker' && aCreep.memory.destinationRoom) {
                amountCreep[aCreep.memory.destinationRoom]++;
            }
        }

        if (amountCreep['1'] < 15) creep.memory.destinationRoom = '1';
        else if (amountCreep['3'] < 15) creep.memory.destinationRoom = '3';
        else if (amountCreep['5'] < 15) creep.memory.destinationRoom = '5';
        else if (amountCreep['7'] < 15) creep.memory.destinationRoom = '7';
    }
    if (creep.memory.targetRoomName == null) {
        creep.memory.targetRoomName = creep.room.exits[creep.memory.destinationRoom];
    }

    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;
    if (creep.memory.mode === 0) {
        const roomName = creep.memory.targetRoomName;
        if (creep.inBirthRoom) {
            creep.travelTo(new RoomPosition(25, 25, roomName));
        } else if (creep.room.name === roomName) {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

            if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.travelTo(source);
        } else creep.travelTo(new RoomPosition(25, 25, roomName));
    }
    else if (creep.memory.mode === 1) {
        if (creep.inBirthRoom) {
            const structures = creep.room.structures;
            const allCreeps = creep.room.find(FIND_MY_CREEPS);

            let cs = creep.room.constructionSites;
            let builders = allCreeps.filter(aCreep => aCreep.memory.role === 'builder');
            if (cs.length > 0 && builders.length === 0) {
                cs = cs.sort((a, b) => b.progress - a.progress);
            }

            let refillStructures = structures.filter(strc => refillStructuresArray.includes(strc.structureType) && strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity()));
            let transporters = allCreeps.filter(aCreep => aCreep.memory.role === 'transporter');
            let miners = allCreeps.filter(aCreep => aCreep.memory.role === 'miner');
            if (refillStructures.length > 0 && transporters.length === 0) {
                refillStructures = refillStructures.sort((a, b) => creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b));
            }

            let repairStructures = structures.filter(strc => strc.hits < strc.hitsMax);
            let repairers = allCreeps.filter(aCreep => aCreep.memory.role === 'repairer');
            if (repairStructures.length > 0 && repairers.length === 0) {
                repairStructures = repairStructures.sort((a, b) => a.hits - b.hits);
            }

            if (refillStructures.length > 3 || (refillStructures.length > 0 && transporters.length === 1 && miners.length < 2)) creep._refill(refillStructures[0]);
            else if (repairStructures.length > 0 && repairers.length === 0) creep._repair(repairStructures[0]);
            else if (cs.length > 0 && builders < 2 || cs.length > 3) creep._build(cs[0]);
            else creep._upgrade();
        } else creep.travelTo(new RoomPosition(25, 25, creep.memory.birthRoom));
    }
}