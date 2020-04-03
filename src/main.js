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
const SIGN = '╔══════════════════╗”\n“║................VIKING................║”\n“╚══════════════════╝';

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
 * @param {Object} spawn
 * @param {list} pattern
 * @param {int} count
 * @param {bool} notBalance
 * @return {list}
 */

function getBodyParts(spawn, pattern, count, notBalance) {

    if (!spawn) return 'Need parameter [Spawn]';
    if (!pattern) return 'Need parameter [Pattern]';
    if (!count || count == null) count = 25;
    if (!notBalance) notBalance = false;

    let body = [];
    let prepareBody = [];
    let amountEnergy = spawn.room.energyCapacityAvailable;
    let bodyCost = 0;

    count = count * 2;

    if (!notBalance) {
        for (let i = 0; i < count/2; i++) {
            prepareBody.push(pattern[i%pattern.length]);
            prepareBody.push(MOVE);
        }
    }

    // TODO: Дописать getBodyParts

    for (i in prepareBody) {
        if (prepareBody[i] != MOVE && bodyCost + BODYPART_COST[prepareBody[i]] + 50 < amountEnergy) {
            body.push(prepareBody[i]);
            body.push(MOVE)
            bodyCost += BODYPART_COST[prepareBody[i]] + 50;
        }
    }
    return body
}

function spawnCreep() {

}

module.exports.loop = function () {
    SetMemory();
    RoomStats();

    for(i in Game.rooms) {
        if (!Memory.RoomsState[Game.rooms[i].name]) CalculateRoom(Game.rooms[i].name);
    }
};
