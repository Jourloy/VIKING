// rooms.js

class _rooms {
    static amountCreeps(role, room, info) {
        let structures = room.structures;
        const allCreeps =  room.find(FIND_MY_CREEPS);
        switch(role) {
            case 'miner':
                structures = structures.filter(strc => strc.structureType === 'container');
                if (structures.length >= 2) return 2;
                else return 0;
            case 'worker': 
                let refillStructures = structures.filter(strc => refillStructuresArray.includes(strc.structureType) && strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity()));
                let transporters = allCreeps.filter(aCreep => aCreep.memory.role === 'transporter');
                let miners = allCreeps.filter(aCreep => aCreep.memory.role === 'miner');
                if (room.controller.level < 4) return 20;
                else if (refillStructures.length > 0 && (transporters.length === 0 || miners.length === 0)) return 3;
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
                if (room.defenseFlag.length > 0) return Math.ceil(room.hostileCreeps.length / 2);
                if (Game.flags.fastAttack) return 1;
                return 0;
            case 'remouteWorker':
                const remoteRooms = room.remote;
                const exits = room.exits;
                let amount = 0;
                let availableRooms = 0;

                if (exits['1'] != null) availableRooms++;
                if (exits['3'] != null) availableRooms++;
                if (exits['5'] != null) availableRooms++;
                if (exits['7'] != null) availableRooms++;

                for (let i = 0; i < availableRooms; i++) {
                    if (remoteRooms[i] != null) {
                        if (remoteRooms[i].ban === false) {
                            if (room.controller.level < 4 && room.fastUpgrade) amount += 15;
                            else {
                                if (room.constructionSites.length > 3) amount += 10;
                                amount += 5;
                            }
                        }
                    } else amount++;
                }
                return amount;
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
        new _room(options);
    }

    static create() {
        const createdRooms = [];

        if (array.rooms.length > 0) {
            for (let i in array.rooms) {
                this.existRoom(array.rooms[i])
                createdRooms.push(array.rooms[i].name);
            }
        }

        for (let i in Game.rooms) {
            const room = Game.rooms[i];
            if (room.controller && room.controller.my != null && room.controller.my === true && !createdRooms.includes[room.name]) this.nonExistsRoom(room);
        }
    }

    static sort() {
        for (let i in array.rooms) {
            const room = Game.rooms[array.rooms[i].name];
            const newArray = [];
            if (room != null && room.controller != null && room.controller.my !== false) newArray.push(array.rooms[i]);
            array.rooms = newArray;
        }

        for (let i in Memory.remoteRooms) {
            const room = Game.rooms[Memory.remoteRooms[i].master];
            if (room == null || room.controller == null) delete Memory.remoteRooms[i];
        }
    }

    static control() {
        for (let i in array.rooms) {
            const room = Game.rooms[array.rooms[i].name];

            if (array.rooms.length === 1 && !Game.flags.capital) room.createFlag(25, 25, 'capital', COLOR_WHITE, COLOR_WHITE);
            if (!Game.flags.fastUpgrade && room.capital && room.controller.level < 4) room.createFlag(25, 24, 'fastUpgrade', COLOR_WHITE, COLOR_PURPLE)
            if (room.hostileCreeps.length > 0) {
                if (room.defenseFlag.length === 0) room.createFlag(10, 10, _tool.generateString(12), COLOR_RED, COLOR_WHITE);
            }


            if (Game.flags.fastUpgrade && room.controller.level >= 4 && Game.flags.fastUpgrade.room === room) Game.flags.fastUpgrade.remove();
            if (room.defenseFlag.length > 0 && room.hostileCreeps.length === 0) room.defenseFlag[0].remove();
        }
    }

    static visual(room) {
        const points = [];
        points.push([1,1]);
        points.push([2,1]);
        points.push([3,6]);
        points.push([4,6]);
        points.push([5,1]);
        points.push([6,1]);
        points.push([6,0.5]);
        points.push([4.5,0.5]);
        points.push([3.6,5.5]);
        points.push([3.4,5.5]);
        points.push([2.5,0.5]);
        points.push([1,0.5]);
        points.push([1,1]);
        new RoomVisual(room.name).poly(points, {stroke: 'red', fill: 'red'}); 
    }

    static run() {
        this.sort();
        this.create();
        this.control();

        for (let i in array.rooms) {
            const room = Game.rooms[array.rooms[i].name];
            this.visual(room);
            Autobuild(room)
        }
    }
}