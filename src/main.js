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

module.exports.loop = function () {
    SetMemory();
    RoomStats();

    for(i in Game.rooms) {
        if (!Memory.RoomsState[Game.rooms[i].name]) CalculateRoom(Game.rooms[i].name);
    }
};
