const creepInfo = {
    'Harvester': {
        role:'Harvester',
        pattern:[WORK,CARRY],
        count:25,
        mustBe:[],
        isForRoad:false,
        useBoost:false,
        moveParts:true
    },
    'Miner': {
        role:'Miner',
        pattern:[WORK],
        count:5,
        mustBe:[CARRY],
        isForRoad:false,
        useBoost:false,
        moveParts:false
    },
    'Manager': {
        role:'Manager',
        pattern:[CARRY],
        count:5,
        mustBe:[],
        isForRoad:false,
        useBoost:false,
        moveParts:true
    },
    'Upgrader': {
        RoomLevel: {
            To_8: {
                role:'upgrader',
                pattern:[WORK,CARRY],
                count:null,
                mustBe:[],
                isForRoad:true,
                useBoost:false,
                moveParts:true
            },
            From_8: {
                role:'upgrader',
                pattern:[WORK,CARRY],
                count:2,
                mustBe:[],
                isForRoad:true,
                useBoost:false,
                moveParts:true
            },
        }
    },
    'MineralMiner': {
        role:'MineralMiner',
        pattern:[WORK],
        count:null,
        mustBe:[CARRY],
        isForRoad:false,
        useBoost:false,
        moveParts:false
    },
    'Repairer': {
        role:'Repairer',
        pattern:[WORK, CARRY],
        count:null,
        mustBe:[],
        isForRoad:true,
        useBoost:false,
        moveParts:true
    },
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
        return roomInfo.Room.Sources.Amount;
    } else if (role == 'Upgrader') {
        let amount = 1;
        // TODO
        return amount;
    } else if (role == 'Builder') {
        let constructionSites = roomInfo.Room.ConstructionSites.Amount;
        if (constructionSites == 0) return 0;
        else if (constructionSites > 0 && constructionSites < 5) return 1;
        else if (constructionSites >= 5) return 2;
    } else if (role == 'MineralMiner') {
        const mineralRegeneration = roomInfo.Room.Mineral.MineralRegeneration;
        const extractor = roomInfo.Room.Mineral.Extractor;
        if (mineralRegeneration < 20 && extractor.length > 0) return 1;
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

            Memory.room[room.name + '.amount.Miner'] = CalculateAmountOfCreeps(information, 'Miner');
            Memory.room[room.name + '.amount.Upgrader'] = CalculateAmountOfCreeps(information, 'Upgrader');
            Memory.room[room.name + '.amount.Builder'] = CalculateAmountOfCreeps(information, 'Builder');
            Memory.room[room.name + '.amount.MineralMiner'] = CalculateAmountOfCreeps(information, 'MineralMiner');

        }
    }
}

/**
 *  ------------------------------------------------------------------------------
 * | This code was given by Sergey on Screeps Slack. Thank you very much :)       |
 *  ------------------------------------------------------------------------------
 * | Code corrected |
 *  ----------------
 *
 * Run code for all creeps
 */
function RunCreep() {
    let droneTask = null;
    for (let i in Game.creeps) {
        let creep = Game.creeps[i];
        //droneTask = require(creep.memory.role);
        //if (droneTask) droneTask.control(creep);
        //else console.log(`Invalid creep role ${creep.memory.role}`);
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
