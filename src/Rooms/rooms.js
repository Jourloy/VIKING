// rooms.js

function amountCreepsInRoom(role, room) {
    if (role === 'miner') return 0;
    if (role === 'worker') {
        if (room.controller.level < 2) return 20;
        else if (room.controller.level > 1 && room.controller.level < 4) return 15;
        return 0;
    }
    if (role === 'warrior') {
        if (Game.flags.fastAttack) return 1;
        return 0;
    }
    if (role === 'upgrader') return 1;
}

function CreateRooms() {
    for (i in Game.rooms) {
        if (!Game.rooms[i].controller || (Game.rooms[i].controller && !Game.rooms[i].controller.my)) return
        for (j in roomsArray) {
            if (roomsArray[j].name === Game.rooms[i].name) {
                for (c in roles) roomsArray[j].information.amountCreeps[roles[c]] = amountCreepsInRoom(roles[c], Game.rooms[i]);
            }
            return;
        }

        const information = {
            amountCreeps: {}
        }

        for (j in roles) information.amountCreeps[roles[j]] = amountCreepsInRoom(roles[j], Game.rooms[i]);
    
        const options = {
            name: Game.rooms[i].name,
            target: null,
            autobuilder: true,
            information: information,
        }
        const room = new VikingRoom(options);
    }

    for (i in roomsArray) {
        const newArray = [];
        if (Game.rooms[roomsArray[i].name].controller && Game.rooms[roomsArray[i].name].controller.my) newArray.push(roomsArray[i]);
        roomsArray = newArray;
    }
}

function rooms() {
    CreateRooms();
}