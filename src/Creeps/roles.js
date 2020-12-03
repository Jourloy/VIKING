// Roles.js

const miner = new VikingCreep({
    role: 'miner',
    body: {
        pattern: [WORK],
        count: 5,
        mustBe: [CARRY],
        moveParts: false,
    }
});
miner.run = (creep) => {
    creepSay(creep, this.role);
}

const worker = new VikingCreep({
    role: 'worker',
    body: {
        patter: [WORK, CARRY],
    }
});
worker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    else if (creep.room.name === creep.memory.birthRoom) {
        if (creep.memory.train == null || creep.memory.train.state === false) {
            if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

            if (creep.memory.mode === 0) GetResource(creep, RESOURCE_ENERGY);
            else if (creep.memory.mode === 1) HarvesterWork(creep);
        } else {
            const target = Game.getObjectById(creep.memory.train.target);
            if (target != null) {
                if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType !== 'container') {
                    if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.train.role = '-';
                } else {
                    if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.train.role = '-';
                }
            } else creep.memory.train.role = '-';
        }
    } else creep.moveTo(new RoomPosition(25, 25, creep.memory.birthRoom), moveParams);
}

function runCreeps() {
    for (let i in Game.creeps)
        for (let j in creepArray)
            if (creepArray[j].role === Game.creeps[i].memory.role) creepArray[j].run(Game.creeps[i]);
}

function calculatingCreeps() {
    for (let i in roomsArray) {
        const room = roomsArray[i];
        if (room.information == null) {
            _console.error(`Room [${room.name}] don't have information`);
            return;
        }
        if (room.information.state == true) return;

        switch(roles) {
            case 'miner':
                if (room.information.controller.level > 1) room.information.amountCreeps
        }
    }
}

function CalculateAmountOfCreeps(roomInfo, role) {
    const room = Game.rooms[roomInfo.RoomName]
    if (role == 'Miner') {
        if (roomInfo.Room.Controller.Level > 1) return roomInfo.Room.Sources.Amount;
        else return 0;
    } else if (role == 'Transporter') {
        if (roomInfo.Room.Controller.Level > 1) return 2;
    } else if (role == 'Upgrader') {
        if (roomInfo.Room.Controller.Level > 1 && roomInfo.Room.Controller.Level < 8) return 4;
        else if (roomInfo.Room.Controller.Level == 8) return 1
        else return 0;
    } else if (role == 'Builder') {
        if (roomInfo.Room.Controller.Level > 1) {
            let constructionSites = roomInfo.Room.Other.ConstructionSites.Amount;
            if (constructionSites == 0) return 0;
            else if (constructionSites > 0 && constructionSites < 2) return 1;
            else if (constructionSites >= 2) return 2;
        } else return 0;
    } else if (role == 'MineralMiner') {
        return 0;
        if (roomInfo.Room.Controller.Level > 1) {
            const mineralRegeneration = roomInfo.Room.Minerals.MineralRegeneration;
            const extractor = roomInfo.Room.Minerals.Extractor;
            if (mineralRegeneration < 20 && extractor.length > 0) return 1;
            else return 0;
        } else return 0;
    } else if (role == 'Harvester') {
        if (roomInfo.Room.Controller.Level < 3) return 10;
        else if (roomInfo.Room.Controller.Level >= 3 && Memory.room[room.name + ".amountIsLive.Transporter"] == 0) return 2
        else return 0;
    } else if (role == 'Repairer') {
        if (roomInfo.Room.Controller.Level > 1) return 2;
        else return 0
    } else if (role == 'Helper') {
        if (roomInfo.Room.Other.AmountOfCreeps == 0) return 2;
        else return 0;
    }
}