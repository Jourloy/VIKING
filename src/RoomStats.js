function CheckController(room, target) {
    switch (target) {
        case "State":
            if (room.controller) return true;
            else return false;
            break;
        case "IsMy":
            if (room.controller && room.controller.my) return true;
            else if (room.controller && !room.controller.my) return false;
            else return null;
            break;
        case "Reserved":
            if (room.controller && room.controller.reservation) return room.controller.reservation;
            else return false;
            break;
        case "Level":
            if (room.controller && room.controller.my && room.controller.level) return room.controller.level;
            else return null;
            break;
        case "Progress":
            if (room.controller && room.controller.my) return room.controller.progress / room.controller.progressTotal * 100;
            else return null;
            break;
        case "Downgrade":
            if (room.controller && room.controller.my) return room.controller.ticksToDowngrade;
            else return null;
            break;
        case "Sign":
            if (room.controller && room.controller.my && room.controller.sign) return room.controller.sign;
            else return null;
            break;
        case "SafeMode":
            if (room.controller && room.controller.my && room.controller.safeMode) return room.controller.safeMode;
            else return null;
            break;
        case "SafeModeAvailable":
            if (room.controller && room.controller.my && room.controller.safeModeAvailable) return room.controller.safeModeAvailable;
            else return null;
            break;
        case "SafeModeCooldown":
            if (room.controller && room.controller.my && room.controller.safeModeCooldown) return room.controller.safeModeCooldown;
            else return null;
            break;
    }
}

function checkStorage(room, target) {
    switch (target) {
        case "State":
            if (room.storage) return true;
            else return false;
            break;
        case "CapacityUsed":
            if (room.storage) return room.storage.store.getUsedCapacity();
            else return null;
            break;
        case "CapacityFree":
            if (room.storage) return room.storage.store.getFreeCapacity();
            else return null;
            break;
        case "CapacityEnergy":
            if (room.storage) return room.storage.store[RESOURCE_ENERGY];
            else return null;
            break;
    }
}


function checkRoom() {
    switch (target) {
        case "EnergyBalance":
            if (room.storage) {
                if (room.terminal) {
                    if (room.storage.store[RESOURCE_ENERGY] + room.terminal[RESOURCE_ENERGY] > 200000) return true;
                    else return false
                } else {
                    if (room.storage.store[RESOURCE_ENERGY] > 100000) return true;
                    else return false
                }
            } else return null;
            break;
        case "HostileCreeps":
            const HostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
                filter: (creep) => {
                    return (!Memory.Friends.includes(creep.owner.username));
                }
            });
            if (HostileCreeps.length > 0) return true;
            else return false;
            break;
        case "EnergySources":
            const sources = room.find(FIND_SOURCES);
            return sources.length;
            break;
        case "Source1":
            const sources = room.find(FIND_SOURCES);
            return sources[0].id;
            break;
        case "Source2":
            const sources = room.find(FIND_SOURCES);
            if (sources[1]) return sources[1].id;
            else return null;
            break;
        case "RoomMineral":
            const source = room.find(FIND_MINERALS);
            return source[0].id;
        case "Nuke":
            return false;
    }
}

function checkTerminal(room, target) {
    
}

function RoomStats() {
    let Info;

    for (i in Game.rooms) {
        let room = Game.rooms[i];

        Info = {
            Controller:{
                ControllerState:CheckController(room, "State"),
                ControllerIsMy:CheckController(room, "IsMy"),
                ControllerReserved:CheckController(room, "Reserved"),
                ControllerLevel:CheckController(room, "Level"),
                ControllerProgress:CheckController(room, "Progress"),
                ControllerDowngrade:CheckController(room, "Downgrade"),
                ControllerSign:CheckController(room, "Sign"),
                ControllerSafeMode:CheckController(room, "SafeMode"),
                ControllerSafeModeAvailable:CheckController(room, "SafeModeAvailable"),
                ControllerSafeModeCooldown:CheckController(room, "SafeModeCooldown"),
            },
            Storage:{
                StorageState:checkStorage(room, "State"),
                StorageCapacityUsed:checkStorage(room, "CapacityUsed"),
                StorageCapacityFree:checkStorage(room, "CapacityFree"),
                StorageCapacityEnergy:checkStorage(room, "CapacityEnergy"),
            },
            Room:{
                EnergyBalance:checkRoom(room, "EnergyBalance"),
                HostileCreeps:checkRoom(room, "HostileCreeps"),
                EnergySources:checkRoom(room, "EnergySources"),
                FirstSource:checkRoom(room, "Source1"),
                SecondSource:checkRoom(room, "Source2"),
                RoomMineral:checkRoom(room, "RoomMineral"),
                Nuke:checkRoom(room, "Nuke"),
            },
            Terminal:{
                TerminalState:checkTerminal(room, "State"),
                TerminalCapacityUsed:checkTerminal(room, "CapacityUsed"),
                TerminalCapacityFree:checkTerminal(room, "CapacityFree"),
                TerminalCapacityEnergy:checkTerminal(room, "CapacityEnergy"),
            },
            Player:{
                Credits:checkPlayer("Credits"),
                GlobalControlLevel:checkPlayer("GCL"),
            }
        }
    }

    Memory.Information = Info;
}
