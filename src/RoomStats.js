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
        case "Reserved":
            if (room.controller && room.controller.reservation) return room.controller.reservation;
            else return false;
        case "Level":
            if (room.controller && room.controller.my && room.controller.level) return room.controller.level;
            else return null;
        case "Progress":
            if (room.controller && room.controller.my) return room.controller.progress / room.controller.progressTotal * 100;
            else return null;
        case "Downgrade":
            if (room.controller && room.controller.my) return room.controller.ticksToDowngrade;
            else return null
        case "Sign":
            if (room.controller && room.controller.my && room.controller.sign) return room.controller.sign;
            else return null
        case "SafeMode":
            if (room.controller && room.controller.my && room.controller.safeMode) return room.controller.safeMode;
            else return null
        case "SafeModeAvailable":
            if (room.controller && room.controller.my && room.controller.safeModeAvailable) return room.controller.safeModeAvailable;
            else return null
        case "SafeModeCooldown":
            if (room.controller && room.controller.my && room.controller.safeModeCooldown) return room.controller.safeModeCooldown;
            else return null
    }
}

function RoomStats() {
    let info;

    for (i in Game.rooms) {
        let room = Game.rooms[i];

        info = {
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
                StorageCapacityEnergy:checkStorage(room, "CapacityEnegy"),
            },
            Room:{
                RoomControlLevel:checkRoom(room, "RCL"),
                EnergyBalance:checkRoom(room, "EnergyBalance"),
                HostileCreeps:checkRoom(room, "HpstileCreeps"),
                EnergySources:checkRoom(room, "EnergySources"),
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

    Memory.Information = info;
}
