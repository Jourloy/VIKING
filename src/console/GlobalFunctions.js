// Commands start here

function AddPlayerInFriend(username) {
    if (!Memory.Friends.includes(username)) Memory.Friends.push(username);
    else console.log(`Oops. ${username} already in your friend list.`)
}
