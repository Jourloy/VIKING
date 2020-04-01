/*
 *
 * ____________________ Screeps AI ____________________
 * VIKING repository: https://github.com/Jourloy/VIKING
 * Author: JOURLOY
 *
 *
 */

module.exports.loop = function () {
    RoomStats();

    for (i in Game.rooms) {
        if (!Memory.rooms[`.${Game.rooms[i].name}.CalculateState`]) Calculate(Game.rooms[i])
    }

    if (!Memory.Friends) Memory.Friends = [];
    else Memory.Friends = Memory.Friends;
};
