// rooms.js

class Room {
    static amountCreeps(role, room, info) {
        switch(role) {
            case 'miner': return 0
            case 'worker': 
                if (room.controller.level < 2) return 20;
                else if (room.controller.level > 1 && room.controller.level < 4) return 15;
                return 0;
            case 'warrior':
                if (Game.flags.fastAttack) return 1;
                return 0;
            case 'upgrader': return 1;
            case 'remouteWorker': return 0//info.exit.length * 5;
        }
    }

    static calculateRepair(room) {
        const spawn = room.find(FIND_MY_SPAWNS)[0];

        let structures = room.find(FIND_MY_STRUCTURES, {
            filter: (strc) => {
                return strc.hits < strc.hitsMax;
            }
        })
        structures = structures.sort(function (a, b) {
            const result = spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b);
            if (result === 0) return a.hits - b.hits;
            return result;
        });

        return structures;
    }

    static calculateExit(room) {
        const exit = [];

        const top = room.find(FIND_EXIT_TOP);
        const right = room.find(FIND_EXIT_RIGHT);
        const bottom = room.find(FIND_EXIT_BOTTOM);
        const left = room.find(FIND_EXIT_LEFT);

        if (top.length > 0) exit.push(EXIT_TOP);
        if (right.length > 0) exit.push(EXIT_RIGHT);
        if (bottom.length > 0) exit.push(EXIT_BOTTOM);
        if (left.length > 0) exit.push(EXIT_LEFT);

        return exit;
    }

    static existRoom(arrayRoom) {
        if (!arrayRoom.information.exit || (arrayRoom.information.exit && arrayRoom.information.exit < 1)) arrayRoom.information.exit = this.calculateExit(Game.rooms[arrayRoom.name]);
        arrayRoom.information.structures.needRepair = this.calculateRepair(Game.rooms[arrayRoom.name]);
        for (let i in roles) arrayRoom.information.amountCreeps[roles[i]] = this.amountCreeps(roles[i], Game.rooms[arrayRoom.name], arrayRoom.information);
        return 0;
    }

    static nonExistsRoom(room) {
        const information = {
            amountCreeps: {},
            structures: {},
            exit: [],
        }

        information.structures.needRepair = this.calculateRepair(room);
        information.exit = this.calculateExit(room);
        for (let i in roles) information.amountCreeps[roles[i]] = this.amountCreeps(roles[i], room, information);

        const options = {
            name: room.name,
            target: null,
            autobuilder: true,
            information: information,
        }
        new VikingRoom(options);
    }

    static create() {
        const createdRooms = [];

        if (roomsArray.length > 0) {
            for (let i in roomsArray) {
                this.existRoom(roomsArray[i])
                createdRooms.push(roomsArray[i].name);
            }
        }

        for (let i in Game.rooms) {
            const room = Game.rooms[i];
            if (!room.controller) return ERR_ROOM_WITHOUT_CONTROLLER;
            if (room.controller && !room.controller.my) return ERR_ROOM_HOSTILE_CONTROLLER;
            if (createdRooms.includes(Game.rooms[i].name)) return ERR_ROOM_WAS_CREATED;
            this.nonExistsRoom(room);
            return 0;
        }
    }

    static sort() {
        for (let i in roomsArray) {
            const newArray = [];
            if (Game.rooms[roomsArray[i].name].controller && Game.rooms[roomsArray[i].name].controller.my) newArray.push(roomsArray[i]);
            roomsArray = newArray;
        }
    }

    static run() {
        this.create();
        this.sort();
    }
}