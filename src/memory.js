// memory.js

function createRoom() {
    for (i in Game.rooms) {
        const room = Game.rooms[i];

        const information = {
            amountCreeps: {},
            amountCreepsIsLive: {}
        }

        for (i in roles) {
            if (roles[i] === 'miner') information.amountCreeps[roles[i]] = 0;

            if (roles[i] === 'worker') {
                if (room.controller.level < 2) information.amountCreeps[roles[i]] = 20;
                else if (room.controller.level >= 2 && room.controller.level < 4) information.amountCreeps[roles[i]] = 10;
            }

            if (roles[i] === 'warrior') {
                if (Game.flags.fastAttack) information.amountCreeps[roles[i]] = 2;
            }
        }

        Memory.rooms[room.name] = {
            autobuilder: true,
            information: information
        }
    }
}

function defineMemory() {
    if (!Memory.rooms) Memory.rooms = {};
    else Memory.rooms = Memory.rooms;

    if (!Memory.queue) Memory.queue = [];
    else Memory.queue = Memory.queue;
}

function memory() {
    createRoom();
    defineMemory();
}