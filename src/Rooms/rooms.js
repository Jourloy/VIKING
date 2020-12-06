// rooms.js

function CreateRooms() {
    for (i in Game.rooms) {
        if (Game.rooms[i].controller && !Game.rooms[i].controller.my) return
        for (j in roomsArray) if (roomsArray[j].name === Game.rooms[i].name) return;

        const information = {
            amountCreeps: {
                'miner': 0,
                'worker': 10,
                'warrior': 5
            }
        }

        const options = {
            name: Game.rooms[i].name,
            target: null,
            autobuilder: true,
            information: information,
        }
        const room = new VikingRoom(options);
    }
}