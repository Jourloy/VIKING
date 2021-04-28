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

        const remoteRooms = creep.room.remote;
        const exits = creep.room.exits;
        const creeps = {
            need: {
                '1': (exits['1'] != null) ? 0 : null,
                '3': (exits['3'] != null) ? 0 : null,
                '5': (exits['5'] != null) ? 0 : null,
                '7': (exits['7'] != null) ? 0 : null,
            },
            live: {
                '1': (exits['1'] != null) ? 0 : null,
                '3': (exits['3'] != null) ? 0 : null,
                '5': (exits['5'] != null) ? 0 : null,
                '7': (exits['7'] != null) ? 0 : null,
            }
        }

        const rooms = {
            available: 0,
            exits: [],
        }

        if (exits['1'] != null) {
            rooms.available++;
            rooms.exits.push('1');
        }
        if (exits['3'] != null) {
            rooms.available++;
            rooms.exits.push('3');
        }
        if (exits['5'] != null) {
            rooms.available++;
            rooms.exits.push('5');
        }
        if (exits['7'] != null) {
            rooms.available++;
            rooms.exits.push('7');
        }

        for (let i = 0; i < rooms.available; i++) {
            if (remoteRooms[i] != null) {
                if (remoteRooms[i].ban === false) {
                    if (creep.room.controller.level < 4 && creep.room.fastUpgrade) creeps.need[remoteRooms[i].exit] += 15;
                    else {
                        if (creep.room.constructionSites.length > 3) creeps.need[remoteRooms[i].exit] += 10;
                        creeps.need[remoteRooms[i].exit] += 5;
                    }
                }
            } else {
                const dest = rooms.exits[i];
                creeps.need[dest] = 1;
            }
        }

        for (let i in Game.creeps) {
            const aCreep = Game.creeps[i];
            if (aCreep.memory.birthRoom === creep.memory.birthRoom && aCreep.memory.role === 'remouteWorker' && aCreep.memory.destinationRoom) {
                creeps.live[aCreep.memory.destinationRoom]++;
            }
        }

        if (creeps.live['1'] < creeps.need['1']) creep.memory.destinationRoom = '1';
        else if (creeps.live['3'] < creeps.need['3']) creep.memory.destinationRoom = '3';
        else if (creeps.live['5'] < creeps.need['5']) creep.memory.destinationRoom = '5';
        else if (creeps.live['7'] < creeps.need['7']) creep.memory.destinationRoom = '7';
    }

    if (creep.memory.targetRoomName == null) {
        creep.memory.targetRoomName = creep.room.exits[creep.memory.destinationRoom];
    }

    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;
    if (creep.memory.mode === 0) {
        const roomName = creep.memory.targetRoomName;
        if (creep.room.name === roomName) {
            let check = false;
            for (let i in Memory.remoteRooms) {
                if (Memory.remoteRooms[i].name === creep.room.name) check = true;
            }
            if (check === false) {
                const options = {
                    name: creep.room.name,
                    exit: creep.memory.destinationRoom,
                    master: creep.memory.birthRoom,
                    ban: false,
                }

                if (creep.room.controller) {
                    if (creep.room.owner != null) options.ban = true; 
                } else options.ban = true;

                delete Memory.remoteRooms[options.name];
                Memory.remoteRooms[options.name] = options;
            }

            if (creep.room.hostileCreeps.length > 2) {
                for (let i in Memory.remoteRooms) {
                    if (Memory.remoteRooms[i].name === creep.room.name) Memory.remoteRooms[i].ban = true;
                }
                creep.suicide()
            } else {
                if (Memory.remoteRooms[creep.room.name].ban === true) creep.suicide()
                else {
                    const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    if (creep.harvest(source) === ERR_NOT_IN_RANGE) creep.travelTo(source);
                }
            }
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