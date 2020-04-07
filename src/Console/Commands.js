// Commands start here

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
    logging.warning()(`Removed ${count} flags`)
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
    logging.warning(`Cleared ${count} memory blocks`);
    return ``
}
