// SetMemory start here

function BasicBlocks() {
    Memory.room = {};

    if (!Memory.Timer) Memory.Timer = {};
    else Memory.Timer = Memory.Timer;

    if (!Memory.Information) Memory.Information = {};
    else Memory.Information = Memory.Information;

    if (!Memory.RoomsState) Memory.RoomsState = {};
    else Memory.RoomsState = Memory.RoomsState;

    if (!Memory.Friends) Memory.Friends = [];
    else Memory.Friends = Memory.Friends;

    if (!Memory.BannedResources) Memory.BannedResources = [];
    else Memory.BannedResources = Memory.BannedResources;

    Memory.roles = [
        "Transporter",
        "Builder",
        "Miner",
        "MineralMiner",
        "Seller",
        "Upgrader",
        "Repairer",
        "Harvester",
        "Helper"
    ];
}

function BasicParametersForRoom() {
    Memory.BasicParametersForRoom = {
        ENERGY_IN_STORAGE:100000,
        ENERGY_IN_TERMINAL:20000,
        FREE_CAPACITY_IN_TERMINAL:10000,
        BUNKER:true,
    }
}

function SetMemory() {
    BasicBlocks()
    BasicParametersForRoom()

    for (let name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}
