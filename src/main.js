/*
 *
 *
 * ____________________ Screeps AI ____________________
 * VIKING repository: https://github.com/Jourloy/VIKING
 * Author: JOURLOY
 *
 *
 */

// Don't change this. It is need for communicate
const MY_USERNAME = 'JOURLOY';

// Don't change this. It is need for communicate
const YOUR_USERNAME = 'soon';

// Don't change this. Use command ChangeSign('') in console for change this sign.
const SIGN = 'VIKING';

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
 * @param {?} direction
 * @return {?}
 */
DefenceDirection(direction) {
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
                 body.push(MOVE);
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
                 body.push(MOVE);
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

function spawnCreep() {
    for (i in Game.rooms) {
        let room = Game.rooms[i];

        let opt = {
            isForRoad: true,
        }
        console.log(getBodyParts(room, [WORK, CARRY], 12, opt))
    }
}

// 20 20
const RCL2 = {"extension":{"pos":[{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2}]},"road":{"pos":[{"x":x,"y":y+1},{"x":x+1,"y":y},{"x":x,"y":y-1},{"x":x-1,"y":y},{"x":x+2,"y":y},{"x":x+4,"y":y+1}]}}
const RCL3 = {"extension":{"pos":[{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+4,"y":y+1},{"x":x+4,"y":y},{"x":x+4,"y":y-1},{"x":x+3,"y":y},{"x":x+3,"y":y-1}]},"road":{"pos":[{"x":x,"y":y+1},{"x":x+1,"y":y},{"x":x,"y":y-1},{"x":x-1,"y":y},{"x":x+2,"y":y},{"x":x+3,"y":y+1},{"x":x+4,"y":y+2},{"x":x+2,"y":y-1},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2}]},"tower":{"pos":[{"x":x+5,"y":y+3}]}};

module.exports.loop = function () {
    SetMemory();
    RoomStats();
    spawnCreep();

    for(i in Game.rooms) {
        if (!Memory.RoomsState[Game.rooms[i].name]) CalculateRoom(Game.rooms[i].name);
    }
};
