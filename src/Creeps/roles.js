// roles.js

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