// roles.js

const creepStatistic = {
    amountIsLive: {}
}

class _creeps {
    static amountCreepsIsLive() {
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
    
                const spawns = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
                });
    
                for (let i in spawns) {
                    if (spawns[i].spawning != null && spawns[i].spawning.remainingTime > spawns[i].spawning.needTime - 10) {
                        creepStatistic.amountIsLive[room.name + "." + spawns[i].memory.spawningCreep]++;
                    }
                }
            }
        }
    }

    static spawnCreeps() {
        this.amountCreepsIsLive();

        for (let i in roomsArray) {
            const room = roomsArray[i];
            queue = [];
            for (let j in room.information.amountCreeps) {
                if (room.information.amountCreeps[j] > creepStatistic.amountIsLive[room.name + '.' + j]) queue.push({ role: j, room: room.name });
            }

            const spawns = Game.rooms[room.name].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });

            for (let j in queue) {
                if (spawns[0].spawning == null) spawnProcess(spawns[0], queue[j].role, Game.rooms[queue[j].room]);
            }
        }
    }

    static runCreeps() {
        for (let i in Game.creeps) {
            for (let j in creepArray) {
                if (creepArray[j].role === Game.creeps[i].memory.role) creepArray[j].run(Game.creeps[i]);
            }
        }
    }

    static run() {
        this.spawnCreeps();
        this.runCreeps();
    }
}