//RoomStats start here

/**
* @param {Object} room
* @param {string} target
*/
function CheckController(room, target) {
    if(target == "State") {
        if (room.controller) return true;
        else return false;
    } else if(target == "IsMy") {
        if (room.controller && room.controller.my) return true;
        else if (room.controller && !room.controller.my) return false;
        else return null;
    } else if(target == "Reserved") {
        if (room.controller && room.controller.reservation) return room.controller.reservation;
        else return false;
    } else if(target == "Level") {
        if (room.controller && room.controller.my && room.controller.level) return room.controller.level;
        else return null;
    } else if(target == "Progress") {
        if (room.controller && room.controller.my) return room.controller.progress / room.controller.progressTotal * 100;
        else return null;
    } else if(target == "Downgrade") {
        if (room.controller && room.controller.my) return room.controller.ticksToDowngrade;
        else return null;
    } else if(target == "Sign") {
        if (room.controller && room.controller.my && room.controller.sign) return room.controller.sign;
        else return null;
    } else if(target == "SafeMode") {
        if (room.controller && room.controller.my && room.controller.safeMode) return room.controller.safeMode;
        else return null;
    } else if(target == "SafeModeAvailable") {
        if (room.controller && room.controller.my && room.controller.safeModeAvailable) return room.controller.safeModeAvailable;
        else return null;
    } else if(target == "SafeModeCooldown") {
        if (room.controller && room.controller.my && room.controller.safeModeCooldown) return room.controller.safeModeCooldown;
        else return null;
    }
}

/**
* @param {Object} room
* @param {string} target
*/
function checkStorage(room, target) {
    if(target == "State") {
        if (room.storage) return true;
        else return false;
    } else if(target == "CapacityUsed") {
        if (room.storage) return room.storage.store.getUsedCapacity();
        else return null;
    } else if(target == "CapacityFree") {
        if (room.storage) return room.storage.store.getFreeCapacity();
        else return null;
    } else if(target == "CapacityEnergy") {
        if (room.storage) return room.storage.store[RESOURCE_ENERGY];
        else return null;
    }
}

/**
* @param {Object} room
* @param {string} target
*/
function checkRoom(room, target) {
    if(target == "EnergyBalance") {
        if (room.storage) {
            if (room.terminal) {
                if (room.storage.store[RESOURCE_ENERGY] + room.terminal[RESOURCE_ENERGY] > 200000) return true;
                else return false
            } else {
                if (room.storage.store[RESOURCE_ENERGY] > 100000) return true;
                else return false
            }
        } else return null;
    } else if(target == "HostileCreeps") {
        const HostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.Friends.includes(creep.owner.username));
            }
        });
        if (HostileCreeps.length > 0) return true;
        else return false;
    } else if(target == "EnergySources") {
        const sources = room.find(FIND_SOURCES);
        return sources.length;
    } else if(target == "Source1") {
        const sources = room.find(FIND_SOURCES);
        return sources[0].id;
    } else if(target == "Source2") {
        const sources = room.find(FIND_SOURCES);
        if (sources[1]) return sources[1].id;
        else return null;
    } else if(target == "RoomMineral") {
        const source = room.find(FIND_MINERALS);
        return source[0].id;
    } else if(target == "Nuke") {
        return false;
    }
}

/**
* @param {Object} room
* @param {string} target
*/
function checkTerminal(room, target) {
    if(target == "State") {
        if (room.terminal) return true;
        else return false;
    } else if(target == "CapacityUsed") {
        if (room.terminal) return room.terminal.getUsedCapacity();
        else return null;
    } else if(target == "CapacityFree") {
        if (room.terminal) return room.terminal.getFreeCapacity();
        else return null;
    } else if(target == "CapacityEnergy") {
        if (room.terminal) return room.terminal.store[RESOURCE_ENERGY];
        else return null;
    }
}

/**
* @param {string} target
*/
function checkPlayer(target) {
    if(target == "Credits") {
        return null;
    } else if(target == "GCL") {
        return null;
    }
}

function RoomStats() {
    let Info;

    for (i in Game.rooms) {
        let room = Game.rooms[i];

        Info = {
            RoomName:room.name,
            EnergyBalance:checkRoom(room, "EnergyBalance"),
            HostileCreeps:checkRoom(room, "HostileCreeps"),
            EnergySources:checkRoom(room, "EnergySources"),
            FirstSource:checkRoom(room, "Source1"),
            SecondSource:checkRoom(room, "Source2"),
            RoomMineral:checkRoom(room, "RoomMineral"),
            Nukes:checkRoom(room, "Nuke"),
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
            Terminal:{
                TerminalState:checkTerminal(room, "State"),
                TerminalCapacityUsed:checkTerminal(room, "CapacityUsed"),
                TerminalCapacityFree:checkTerminal(room, "CapacityFree"),
                TerminalCapacityEnergy:checkTerminal(room, "CapacityEnergy"),
            },
            Storage:{
                StorageState:checkStorage(room, "State"),
                StorageCapacityUsed:checkStorage(room, "CapacityUsed"),
                StorageCapacityFree:checkStorage(room, "CapacityFree"),
                StorageCapacityEnergy:checkStorage(room, "CapacityEnergy"),
            },
        }

        Memory.Information[room.name] = Info;
    }
}

/**
* @param {string} RoomName
*/
function CalculateRoom(roomName) {

    const room = Game.rooms[roomName];
    const spawns = room.find(FIND_MY_SPAWNS);
    const sources = room.find(FIND_SOURCES);

    if (spawns[0]) {
        const spawnFlag = spawns[0].pos.lookFor(LOOK_FLAGS);
        if (spawnFlag.length && spawnFlag[0].color == COLOR_WHITE && spawnFlag[0].secondaryColor == COLOR_WHITE) {
            //
        } else {
            const flagName = 'Spawn:' + GenerateString(6);
            spawns[0].pos.createFlag(flagName, COLOR_WHITE, COLOR_WHITE);
            AddInMemory(roomName, flagName, "SpawnFlags");
        }

        Memory.RoomsState[roomName] = true;
    }
}
