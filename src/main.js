// Main start here

/**
 * @param {number} length - length of string
 * @return {string}
 */
function GenerateString(length) {
    const chars = '0123456789abcdefghij';

    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

/**
 * Return direction for defence
 *
 * @param {string} direction direction where is hostile creep
 * @return {string}
 */
function DefenceDirection(direction) {
    switch (direction) {
        case TOP:
            return BOTTOM;
            break;
        case TOP_LEFT:
            return BOTTOM_RIGHT;
            break;
        case LEFT:
            return RIGHT;
            break;
        case BOTTOM_LEFT:
            return TOP_RIGHT;
            break;
        case BOTTOM:
            return TOP;
            break;
        case BOTTOM_RIGHT:
            return TOP_LEFT;
            break;
        case RIGHT:
            return LEFT;
            break;
        case TOP_RIGHT:
            return BOTTOM_LEFT;
            break;
    }
}

/**
 * Return priority of part
 *
 * @param {BodyPartConstant} body - body of creep
 * @return {number} Priority of this part
 * @author Sergey from Screeps Slack (code corrected)
 */
function bodyPriority(body) {
    switch (body) {
        case HEAL:
            return -1;
            break;
        case MOVE:
            return 2;
            break;
        case RANGED_ATTACK:
            return 1;
            break;
        case ATTACK:
            return 0;
            break;
        case WORK:
            return 7;
            break;
        case TOUGH:
            return 10;
            break;
        default:
            return 5;
            break;
    }
}

/**
 * Return creep's body part for spawn
 *
 * @param {Object} room
 * @param {Array} pattern
 * @param {int} count
 * @param {Object} optional
 * @author Sergey from Screeps Slack (code corrected)
 */
function getBodyParts(room, pattern, count, optional) {
     const roads = optional.isForRoad || false; // Move per 1 body part or move per 2 body parts
     let moveBoost = optional.moveBoost || null; // Will be used boosts?
     const priority = {}; // Unused
     const skipCarry = optional.skipCarry || false; // Skip carry parts?
     const mustBe = optional.mustBe || []; // Important body parts. For example result will be [ATTACK, CARRY, CARRY, MOVE, MOVE] with pattern [CARRY]
     const moveParts = optional.moveParts || true; // Add MOVE in creep's dody?
     if (moveBoost &&
         !_.includes([RESOURCE_ZYNTHIUM_OXIDE, RESOURCE_ZYNTHIUM_ALKALIDE, RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE], moveBoost)) {
         logger.logWarning(MODULE_NAME, `Incorect parameter moveBoost: ${moveBoost}`);
         moveBoost = null;
     }
     let step = 1;
     if (roads) {
         step = 2;
     }
     step *= (optional && optional.moveEach) || 1;
     if (moveBoost) {
         step +=
             BOOSTS.move[moveBoost].fatigue - 1;
     }
     let index = 0;
     let moveIndex = 0;
     let availableEnergy = room.energyCapacityAvailable;
     if (optional && optional.maxEnergy) {
         availableEnergy = Math.min(optional.maxEnergy, availableEnergy);
     }
     let body = [];
     mustBe.forEach(b => {
         if ((!optional || !optional.withoutMove) && (b != CARRY || !skipCarry)) {
             if (moveIndex == 0) {
                 availableEnergy -= BODYPART_COST[MOVE];
                 if (availableEnergy < BODYPART_COST[b]) {
                     return false;
                 }
                 if (moveParts) body.push(MOVE);
             }
             moveIndex = (moveIndex + 1) % step;
         }
         availableEnergy -= BODYPART_COST[b];
         if (availableEnergy < 0) {
             return false;
         }
         body.push(b);
         return;
     });
     while (body.length < 50 && count > 0) {
         if ((!optional || !optional.withoutMove) && (pattern[index] != CARRY || !skipCarry)) {
             if (moveIndex == 0) {
                 availableEnergy -= BODYPART_COST[MOVE];
                 if (availableEnergy < BODYPART_COST[pattern[index]]) {
                     break;
                 }
                 if (moveParts) body.push(MOVE);
             }
             moveIndex = (moveIndex + 1) % step;
         }
         availableEnergy -= BODYPART_COST[pattern[index]];
         if (availableEnergy < 0) {
             break;
         }
         body.push(pattern[index]);
         count--;
         index = (index + 1) % pattern.length;
     }
     return body.sort((a, b) => (priority[b] || bodyPriority(b)) - (priority[a] || bodyPriority(a)));
 }

/**
 * Spawn creeps in all rooms
 *
 * @param {Object} room
 */
function spawnCreep(room) {
    for (i in Memory.queue) {
        if (room.name == Memory.queue[i].Room) {
            const roomCreep = Game.rooms[Memory.queue[i].Room];
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

/**
 * Start spawn creep
 * 
 * !Add spawn miner with other memory
 *
 * @param {Object} spawn
 * @param {string} role
 */
function spawnProcess(spawn, role, room) {
    if (spawn.spawning == null) {

        const name = ['VIKING'];
        const randomNumber = 1 + (Game.time % 20);
        const newName = `${name} | ${GenerateString(randomNumber)} | ${Game.time%101}`

        let spawnInfo = null;
        let body = null;

        if (creepInfo[role]) spawnInfo = creepInfo[role];
        if (spawnInfo != null) {
            let optional = {
                isForRoad: spawnInfo.isForRoad,
                moveBoost: spawnInfo.useBoost,
                skipCarry: spawnInfo.skipCarry,
                mustBe: spawnInfo.mustBe,
                moveParts:spawnInfo.moveParts,
            }
            body = getBodyParts(room, spawnInfo.pattern, spawnInfo.count, optional);
        }

        if (spawn.spawnCreep(body, newName, {memory: {role: role, room:room.name} }) == 0) {
            console.log("[INFO] Spawn start spawn creep [" + role + "] in " + spawn.room.name)
            for (i in Memory.queue) {
                if (Memory.queue[i] && Memory.queue[i].Role == role && Memory.queue[i].Room == spawn.room.name) {
                    let CreepSpawn = Memory.queue.slice(i, i+1);
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

const INFORMAION = {
    MY_USERNAME:'JOURLOY',
    YOUR_USERNAME:'soon',
    ROOM_SIGN:'VIKING',
}

module.exports.loop = function () {
    SetMemory();
    RoomStats();
    CreepManager();

    for (i in Game.rooms) {
        let room = Game.rooms[i];

        if (room.controller && room.controller.my) {
            Autobuild(room);
            spawnCreep(room);
        }
    }
};
