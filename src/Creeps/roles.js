// roles.js

function runCreeps() {
    for (let i in Game.creeps) {
        for (let j in creepArray) {
            if (creepArray[j].role === Game.creeps[i].memory.role) creepArray[j].run(Game.creeps[i]);
        }
    }
}

function spawnCreeps() {

    amountCreepsIsLive();

    for (i in Memory.rooms) {
        const room = Memory.rooms[i];

        for (j in room.information.amountCreeps) {
            if (room.information.amountCreeps[j] > room.information.amountCreepsIsLive[j]) Memory.queue.push({ role: j, room: i });
        }

        spawns = Game.rooms[i].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });

        for (j in Memory.queue) {
            console.log(Memory.queue[j].role);
            if (spawns[0].spawning == null) spawnProcess(spawns[0], Memory.queue[j].role, Game.rooms[Memory.queue[j].room]);
        }
    }
}

function amountCreepsIsLive() {
    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        if (room.controller && room.controller.my) {
            for (let j in roles) {
                Memory.rooms[room.name].information.amountCreepsIsLive[roles[j]] = 0;
            }
        }
    }

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                if (room.name == creep.memory.room) Memory.rooms[room.name].information.amountCreepsIsLive[creep.memory.role]++;
            }

            spawns = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });

            for (i in spawns) {
                if (spawns[i].spawning != null && spawns[i].spawning.remainingTime > spawns[i].spawning.needTime - 10) {
                    Memory.rooms[spawns[i].room.name].information.amountCreepsIsLive[Game.creeps[spawns[i].spawning.name]]++;
                }
            }
        }
    }
}