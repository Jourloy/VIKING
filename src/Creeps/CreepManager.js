const creepInfo = {
    'Harvester': {
        role:'harvester',
        pattern:[WORK,CARRY],
        count:25,
        mustBe:[],
        isForRoad:false,
        useBoost:false,
        moveParts:true
    },
    'Miner': {
        role:'miner',
        pattern:[WORK],
        count:5,
        mustBe:[CARRY],
        isForRoad:false,
        useBoost:false,
        moveParts:true
    },
    'Manager': {
        role:'manager',
        pattern:[CARRY],
        count:5,
        mustBe:[],
        isForRoad:false,
        useBoost:false,
        moveParts:false
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
                moveParts:false
            },
            From_8: {
                role:'upgrader',
                pattern:[WORK,CARRY],
                count:2,
                mustBe:[],
                isForRoad:true,
                useBoost:false,
                moveParts:false
            },
        }
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
        let amount = 0;
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

    let basicAmountCreeps;

    /** Set 0 for all roles */
    for (let z in Game.rooms) {
        let room = Game.rooms[z];
        if (room.controller && room.controller.my) {
            for (i in Memory.roles) {
                Memory.room[room.name + ".amount." + Memory.roles[i]] = 0;
            }
        }
    }

    for (let z in Game.rooms) {
        const room = Game.rooms[z];
        const information = GetRoomInformation(room.name);

        if (room.controller && room.controller.my) {
            basicAmountCreeps = {
                'Miner':CalculateAmountOfCreeps(information, 'Miner'),
                'Upgrader':CalculateAmountOfCreeps(information, 'Upgrader'),
                'Builder':CalculateAmountOfCreeps(information, 'Builder')
                'MineralMiner':CalculateAmountOfCreeps(information, 'MineralMiner'),
            }
        }
}
