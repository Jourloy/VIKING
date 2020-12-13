// rooms.js

class _room {
    static amountCreeps(role, room, info) {
        let structures = room.structures;
        switch(role) {
            case 'miner':
                structures = structures.filter(strc => strc.structureType === 'container');
                if (structures.length === 0) return 0;
                else if (structures.length === 1) return 1;
                else return 2;
            case 'worker': 
                if (room.controller.level < 2) return 20;
                else if (room.controller.level > 1 && room.controller.level < 3) return 15;
                return 0;
            case 'upgrader':
                if (room.controller.level < 3) return 1;
                else if (room.controller.level === 3) return 6;
                else if (room.controller.level > 3 && room.controller.level < 8) return 2;
                else return 1;
            case 'repairer': 
                if (room.controller.level < 3) return 1;
                else return 2;
            case 'builder':
                if (room.controller.level < 3) return 1;
                else return 2;
            case 'transporter':
                structures = structures.filter(strc => strc.structureType === 'container');
                if (room.controller.level === 2 && structures.length > 0) return 1;
                else if (room.controller.level >= 3) return 2;
            case 'warrior':
                if (Game.flags.fastAttack) return 1;
                return 0;
            case 'remouteWorker':
                if (room.controller.level < 5) {
                    const exits = room.exits;
                    let amount = 0;
                    if (exits[1] != null) amount += 10;
                    if (exits[3] != null) amount += 10;
                    if (exits[5] != null) amount += 10;
                    if (exits[7] != null) amount += 10;
                    return amount;
                } else return 0
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
            if (room.controller && room.controller.my != null && room.controller.my === true && !createdRooms.includes[room.name]) this.nonExistsRoom(room);
        }
    }

    static sort() {
        for (let i in roomsArray) {
            const room = Game.rooms[roomsArray[i].name];
            const newArray = [];
            if (room != null && room.controller != null && room.controller.my !== false) newArray.push(roomsArray[i]);
            roomsArray = newArray;
        }
    }

    static run() {
        this.sort();
        this.create();

        for (let i in roomsArray) {
            const room = Game.rooms[roomsArray[i].name];
            Autobuild(room)
        }
    }
}