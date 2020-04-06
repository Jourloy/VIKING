// Commands start here



/**
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

global.ClearMemory = function() {
    let count = 0;
    for (let i in Memory) {
        delete Memory[i];
        count++;
    }
    logging.warning(`Cleared ${count} memory blocks`);
    return ``
}
