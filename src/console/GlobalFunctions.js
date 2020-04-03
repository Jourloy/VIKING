// Commands start here

function AddPlayerInFriend = function(username) {
    if (!Memory.Friends.includes(username)) Memory.Friends.push(username);
    else console.log(`Oops. ${username} already in your friend list.`)
}
