// Commands start here

global.AddPlayerInFriend = function(username) {
    if (!Memory.Friends.includes(username)) Memory.Friends.push(username);
    else console.log(`Oops. ${username} already in your friend list.`)
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
