// roles.js

const creepStatistic = {
    amountIsLive: {}
}

function runCreeps() {
    for (let i in Game.creeps) {
        for (let j in creepArray) {
            if (creepArray[j].role === Game.creeps[i].memory.role) creepArray[j].run(Game.creeps[i]);
        }
    }
}

function spawnCreeps() {

    amountCreepsIsLive();

    for (i in roomsArray) {
        const room = roomsArray[i];

        for (i in room.information.amountCreeps) {
            if (room.information.amountCreeps[i] > creepStatistic.amountIsLive[room.name + '.' + i]) queue.push({ role: i, room: room.name });
        }

        spawns = Game.rooms[room.name].find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });

        

        for (i in queue) {
            if (spawns[0].spawning == null) spawnProcess(spawns[0], queue[i].role, Game.rooms[queue[i].room]);
        }
    }
}

function amountCreepsIsLive() {
    for (let i in Game.rooms) {
        let room = Game.rooms[i];
        if (room.controller && room.controller.my) {
            for (let j in roles) creepStatistic.amountIsLive[room.name + "." + roles[j]] = 0;
        }
    }

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                if (room.name == creep.memory.room) creepStatistic.amountIsLive[room.name + "." + creep.memory.role]++;
            }

            spawns = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });

            for (i in spawns) {
                if (spawns[i].spawning != null && spawns[i].spawning.remainingTime > spawns[i].spawning.needTime - 10) {
                    creepStatistic.amountIsLive[room.name + "." + spawns[i].memory.spawningCreep]++;
                }
            }
        }
    }
}