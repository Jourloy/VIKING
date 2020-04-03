// SetMemory start here

function BasicFolders() {
    if (!Memory.RoomsState) Memory.RoomsState = {};
    else Memory.RoomsState = Memory.RoomsState;

    if (!Memory.SpawnFlags) Memory.SpawnFlags = {};
    else Memory.SpawnFlags = Memory.SpawnFlags;
}

function Friends() {
    if (!Memory.Friends) Memory.Friends = [];
    else Memory.Friends = Memory.Friends;
}

/**
 * @param {string} param1 Name of room
 * @param {string} param2 Name of flag
 * @param {string} part
 */
function AddInMemory(param1, param2, part) {
    if (part == 'SpawnFlags') {
        if (!Memory.SpawnFlags[param1]) {
            Memory.SpawnFlags[param1] = {flagName:param2}
        }
    }

    logging(`In [${part}] added [${param1}] and [${param2}]`);
}

function SetMemory() {
    Friends();
    BasicFolders()
}
