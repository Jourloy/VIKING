// Commands start here

/**
 * Print information about commands
 */
global.help = function() {
    let info = [];
    info.push(`* ChangeSugn('') - Change sign in all rooms`);
    info.push(`* AddPlayerInFriend('') - Add nickname in friend list`);
    info.push(`* DeletePlayerFromFriend('') - Delete nickname from friend list`);
    info.push(`* [WARNING] ClearFlags() - Remove all flags`);
    info.push(`* [WARNING] ClearMemory() - Remove all memory block from game memory`);
    info = info.join("\n");

    return info;
}

/**
 * Change sign in all rooms
 *
 * @param {string} newSign
 */
global.ChangeSign = function(newSign) {

}

/**
 * Add player in friend list
 *
 * @param {string} username
 */
global.AddPlayerInFriend = function(username) {
    if (!Memory.Friends.includes(username)) {
        Memory.Friends.push(username);
        logging(`${username} added in your friend list`);
    }
    else warning(`Oops. ${username} already in your friend list.`);
    return ``;
}

/**
 * Delete player from friend list
 *
 * @param {string} username
 */
global.DeletePlayerFromFriend = function(username) {
    if (Memory.Friends.includes(username)) {
        delete Memory.Friends[username];
        logging(`${username} deleted from your friend list`);
    }
    else warning(`Oops. ${username} already is not your friend.`);
    return ``;
}

/**
 * Delete all flags from map
 */
global.ClearFlags = function() {
    let count = 0;
    for (i in Game.flags) {
        const flag = Game.flags[i];
        flag.remove();
        count++;
    }
    warning()(`Removed ${count} flags`)
    return ``
}

/**
 * Delete all memory blocks
 */
global.ClearMemory = function() {
    let count = 0;
    for (let i in Memory) {
        delete Memory[i];
        count++;
    }
    warning(`Cleared ${count} memory blocks`);
    return ``
}
