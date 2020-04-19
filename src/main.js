/**
 *
 *
 * ____________________ Screeps AI ____________________
 * @VIKING_repository: https://github.com/Jourloy/VIKING
 * @author: JOURLOY
 *
 */

/**
 * @param {int} length
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
 * @param {DIRECTION} direction
 * @return {DIRECTION}
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
 *  ------------------------------------------------------------------------------
 * | This code was given by Sergey on Screeps Slack. Thank you very much :)       |
 *  ------------------------------------------------------------------------------
 * | Code corrected |
 *  ----------------
 *
 * @param {BODYPART} body
 * @return {int} Priority of this part
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
 *  ------------------------------------------------------------------------------
 * | This code was given by Sergey on Screeps Slack. Thank you very much :)       |
 *  ------------------------------------------------------------------------------
 * | Code corrected |
 *  ----------------
 *
 * @param {Object} room
 * @param {List} pattern
 * @param {int} count
 * @param {Object} optional
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
     let availableEnergy = room.energyAvailable;
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
 */
function spawnCreep() {
    for (i in Game.rooms) {
        let room = Game.rooms[i];
    }
}

const INFORMAION = {
    MY_USERNAME:'JOURLOY',
    YOUR_USERNAME:'soon',
    ROOM_SIGN:'VIKING',
    RESERVED_SIGN:'Reserved by VIKING',
    ATTACKED_SIGN:'Attacked by VIKING',
    CONTROL_SIGN:'Controlled by VIKING'
}

module.exports.loop = function () {
    SetMemory();
    RoomStats();
    AmountCreeps();
    RunCreep();
    CalculateCreeps();
    //spawnCreep();

    for (i in Game.rooms) {
        if (Game.rooms[i].controller && Game.rooms[i].controller.my) Autobuild(Game.rooms[i]);
    }
};
