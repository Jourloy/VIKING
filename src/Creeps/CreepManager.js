const creepInfo = {
    'harvester': {
        role:'harvester',
        pattern:[WORK,CARRY],
        count:25,
        mustBe:[],
        isForRoad:false,
        useBoost:false,
        moveParts:true
    },
    'miner': {
        role:'miner',
        pattern:[WORK],
        count:5,
        mustBe:[CARRY],
        isForRoad:false,
        useBoost:false,
        moveParts:true
    },
    'manager': {
        role:'manager',
        pattern:[CARRY],
        count:5,
        mustBe:[],
        isForRoad:false,
        useBoost:false,
        moveParts:false
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
