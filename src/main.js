// Main.js

class VikingCreep {
    constructor(options) {
        if (options == null) options = {};
        const move = {
            heuristicWeight: 1.2, 
            ignoreCreeps: true, 
            reusePath: 30,
        };

        this.name = `Viking | ${options.name} | g[${_.generateString(10)}]` || `Viking g[${_.generateString(10)}]`;
        this.role = options.role || 'creep';
        this.move = options.move || move;
        this.state = options.state || null;
        this.body = options.body || null;

        creepArray.push(this);
        roles.push(this.role);
    }
}

class VikingRoom {
    constructor(options) {
        if (options == null) return 'Need room options';

        this.name = options.name;
        this.target = options.target;
        this.autobuilder = options.autobuilder;
        this.information = options.information || null;

        roomsArray.push(this);
    }
}

function generateBody(options, availableEnergy) {
    if (options == null) return 'Need room options';

    const roads = options.isForRoad || false;
    const skipCarry = options.skipCarry || false;
    const mustBe = options.mustBe || [];
    const moveParts = options.moveParts || true;
    const moveEach = options.moveEach || 1;
    const maxEnergy = options.maxEnergy || 50000;
    const priority = {};

    let step = (roads === true) ?2 :1;
    step *= moveEach;
    let index = 0, moveIndex = 0;
    
    if (maxEnergy != 50000) availableEnergy = Math.min(maxEnergy, availableEnergy);

    const body = [];
    mustBe.forEach(b => {
        if ((moveParts === true) && (b != CARRY || !skipCarry)) {
            if (moveIndex == 0) {
                availableEnergy -= BODYPART_COST[MOVE];
                if (availableEnergy < BODYPART_COST[b]) return false;
                body.push(MOVE);
            }
            moveIndex = (moveIndex + 1) % step;
        }
        availableEnergy -= BODYPART_COST[b];
        if (availableEnergy < 0) return false;
        body.push(b);
        return;
    });
    while (body.length < 50 && count > 0) {
        if ((moveParts === true) && (pattern[index] != CARRY || !skipCarry)) {
            if (moveIndex == 0) {
                availableEnergy -= BODYPART_COST[MOVE];
                if (availableEnergy < BODYPART_COST[pattern[index]]) break;
                if (moveParts) body.push(MOVE);
            }
            moveIndex = (moveIndex + 1) % step;
        }
        availableEnergy -= BODYPART_COST[pattern[index]];
        if (availableEnergy < 0) break;
        body.push(pattern[index]);
        count--;
        index = (index + 1) % pattern.length;
    }
    return body.sort((a, b) => (priority[b] || _screeps.bodyPriority(b)) - (priority[a] || _screeps.bodyPriority(a)));
}

function spawnCreep(room) {
    for (i in Memory.queue) {
        if (Memory.queue[i] && Memory.queue[i].Room && room.name == Memory.queue[i].Room) {
            const roleCreep = Memory.queue[i].Role;

            const info = GetRoomInformation(room.name);

            const amountSpawns = info.Room.Spawns.Amount;
            const firstSpawn = Game.getObjectById(info.Room.Spawns.FirstSpawn);
            const secondSpawn = Game.getObjectById(info.Room.Spawns.SecondSpawn);
            const thirdSpawn = Game.getObjectById(info.Room.Spawns.ThirdSpawn);

            if (firstSpawn && amountSpawns > 1) {
                if (firstSpawn && firstSpawn.spawning == null) {
                    spawnProcess(firstSpawn, roleCreep, room);
                } else if (secondSpawn && secondSpawn.spawning == null) {
                    spawnProcess(secondSpawn, roleCreep, room);
                } else if (thirdSpawn && thirdSpawn.spawning == null) {
                    spawnProcess(thirdSpawn, roleCreep, room);
                }
            } else if (firstSpawn && firstSpawn.spawning == null) {
                spawnProcess(firstSpawn, roleCreep, room);
            }
        }
    }
}

function spawnProcess(spawn, role, room) {
    if (spawn.spawning == null) {

        let name;
        const randomNumber = Game.time%5000;

        let spawnInfo = null;
        let body = null;

        if (creepInfo[role]) spawnInfo = creepInfo[role];
        if (spawnInfo != null) {
            let withoutMove;
            if (spawnInfo.moveParts == true) withoutMove = false
            else withoutMove = true;
            let optional = {
                role: spawnInfo.role,
                isForRoad: spawnInfo.isForRoad,
                moveBoost: spawnInfo.useBoost,
                skipCarry: spawnInfo.skipCarry,
                mustBe: spawnInfo.mustBe,
                moveParts: spawnInfo.moveParts,
                withoutMove: withoutMove
            }
            body = getBodyParts(room, spawnInfo.pattern, spawnInfo.count, optional);

            name = `${spawnInfo.name} | id:${randomNumber}`;
        }

        if (creepInfo[role] && creepInfo[role].role == 'Miner') {
            let number;

            const miners = spawn.room.find(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return creep.memory.role == 'Miner';
                }
            });

            if (miners.length > 0) {
                if (miners[0].memory.number == 1) number = 2;
                else number = 1;
            } else number = 1;

            if (spawn.spawnCreep(body, name, { memory: { role: role, room: room.name, number: number } }) == 0) {
                logging("Spawn start spawn creep [" + role + "] in " + spawn.room.name)
                for (i in Memory.queue) {
                    if (Memory.queue[i] && Memory.queue[i].Role == role && Memory.queue[i].Room == spawn.room.name) {
                        let CreepSpawn = Memory.queue.slice(i, i + 1);
                        let newList = [];
                        for (i in Memory.queue) {
                            if (Memory.queue[i] != CreepSpawn[0]) newList.push(Memory.queue[i])
                        }
                        Memory.queue = newList;
                    }
                }
            }
        } else if (creepInfo[role]) {
            if (spawn.spawnCreep(body, name, { memory: { role: role, room: room.name } }) == 0) {
                logging("Spawn start spawn creep [" + role + "] in " + spawn.room.name)
                for (i in Memory.queue) {
                    if (Memory.queue[i] && Memory.queue[i].Role == role && Memory.queue[i].Room == spawn.room.name) {
                        let CreepSpawn = Memory.queue.slice(i, i + 1);
                        let newList = [];
                        for (i in Memory.queue) {
                            if (Memory.queue[i] != CreepSpawn[0]) newList.push(Memory.queue[i])
                        }
                        Memory.queue = newList;
                    }
                }
            }
        }
    }
}

module.exports.loop = function() {
    if (_screeps.public() && Game.cpu.bucket > 5000) Game.cpu.generatePixel();
    runCreeps()
};
