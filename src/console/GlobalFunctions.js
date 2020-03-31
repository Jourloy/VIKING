function GlobalFunctions() {
    Global.AddPlayerInFriend = function(username) {
        if (!Memory.Friends.includes(username)) Memory.Friends.push(username);
        else console.log(`Oop. ${username} already in your friend list.`)
    }
}
