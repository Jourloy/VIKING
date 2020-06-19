const creepInfo = {
    'Harvester': HarvesterInfo,
    'Miner': MinerInfo,
    //'Upgrader': UpgraderInfo,
}

const startCreep = {
    'Harvester': harvester,
    'Miner': miner,
}

function StartCreepCode() {
    for (i in Game.creeps) {
        let role = Game.creeps[i].memory.role;
        let creep = Game.creeps[i]

        if (startCreep[role]) startCreep[role].control(creep);
    }
}

/**
 * Return information about creep
 *
 * @param {string} role
 * @return {Object}
 */
function getCreepInfo(role) {
    for (i in creepInfo) {
        if (role == creepInfo[i]) return creepInfo[i];
    }
}

/**
 * Return information about creep
 *
 * @param {Object} room
 * @param {string} role
 * @return {Object}
 */
function CalculateAmountOfCreeps(roomInfo, role) {
    if (role == 'Miner') {
        if (roomInfo.Room.Controller.Level > 1) return roomInfo.Room.Sources.Amount;
        else return 0;
    } else if (role == 'Upgrader') {
        return 0;
        if (roomInfo.Room.Controller.Level > 1) return 1;
        else return 0;
    } else if (role == 'Builder') {
        return 0;
        if (roomInfo.Room.Controller.Level > 1) {
            let constructionSites = roomInfo.Room.Other.ConstructionSites.Amount;
            if (constructionSites == 0) return 0;
            else if (constructionSites > 0 && constructionSites < 5) return 1;
            else if (constructionSites >= 5) return 2;
        } else return 0;
    } else if (role == 'MineralMiner') {
        return 0;
        if (roomInfo.Room.Controller.Level > 1) {
            const mineralRegeneration = roomInfo.Room.Minerals.MineralRegeneration;
            const extractor = roomInfo.Room.Minerals.Extractor;
            if (mineralRegeneration < 20 && extractor.length > 0) return 1;
            else return 0;
        } else return 0;
    } else if (role == 'Harvester') {
        if (roomInfo.Room.Controller.Level < 3) return 7;
        else return 0;
    }
}

/**
 * Setting amount of creeps in all rooms
 */
function AmountCreeps() {

    /** Set 0 for all roles */
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (i in Memory.roles) {
                Memory.room[room.name + ".amount." + Memory.roles[i]] = 0;
            }
        }
    }

    /** Set amount roles for all rooms */
    for (let z in Game.rooms) {
        const room = Game.rooms[z];
        const information = GetRoomInformation(room.name);

        if (room.controller && room.controller.my) {

            Memory.room[room.name + '.amount.Harvester'] = CalculateAmountOfCreeps(information, 'Harvester');
            Memory.room[room.name + '.amount.Miner'] = CalculateAmountOfCreeps(information, 'Miner');
            Memory.room[room.name + '.amount.Upgrader'] = CalculateAmountOfCreeps(information, 'Upgrader');
            Memory.room[room.name + '.amount.Builder'] = CalculateAmountOfCreeps(information, 'Builder');
            Memory.room[room.name + '.amount.MineralMiner'] = CalculateAmountOfCreeps(information, 'MineralMiner');

        }
    }
}

/**
 * Get amount live creeps
 */
function amountCreepsIsLive() {
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Memory.roles) {
                Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] = 0
            }
        }
    }

    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (let i in Game.creeps) {
                let creep = Game.creeps[i];
                if (room.name == creep.memory.room) Memory.room[room.name + ".amountIsLive." + creep.memory.role]++;
            }
            spawns = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN);
                }
            });

            for (i in spawns) {
                if (spawns[i].spawning != null && spawns[i].spawning.remainingTime > spawns[i].spawning.needTime - 10) {
                    Memory.room[room.name + ".amountIsLive." + spawns[i].memory.spawningCreep]++;
                }
            }
        }
    }
}

/**
 * Find creeps and create queue
 */
function CalculateCreeps() {
    if (Game.time % 2 == 1) {
        Memory.queue = [];
        for (i in Memory.roles) {
            for (z in Game.rooms) {
                if (Game.rooms[z].controller && Game.rooms[z].controller.my) {
                    let roomName = Game.rooms[z].name;
                    let role = Memory.roles[i];
                    let room = Game.rooms[z];
                    if ((!Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] && Memory.room[room.name + ".amount." + Memory.roles[i]] > 0) || (Memory.room[room.name + ".amountIsLive." + Memory.roles[i]] < Memory.room[room.name + ".amount." + Memory.roles[i]])) {
                        Memory.queue.push({ Role: role, Room: roomName });
                    }
                }
            }
        }
    }
}

function CreepManager() {
    CalculateAmountOfCreeps();
    AmountCreeps();
    amountCreepsIsLive();
    CalculateCreeps();
    StartCreepCode();
}
