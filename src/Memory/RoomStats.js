//RoomStats start here

/**
* @param {Object} room
* @param {string} target
*/
const CheckRoom = {
    Storage(room) {
        let info = {};

        let storage = false;
        let energyBalance = null;

        let energyCapacity = null;
        let usedCapacity = null;
        let freeCapacity = null;

        if (room.storage && room.terminal) {
            storage = true;
            if (room.storage.store[RESOURCE_ENERGY] + room.terminal[RESOURCE_ENERGY] > 200000) energyBalance = true;
            else energyBalance = false;

            energyCapacity = room.storage.store[RESOURCE_ENERGY];
            usedCapacity = room.storage.store.getUsedCapacity();
            freeCapacity = room.storage.store.getFreeCapacity();
        }

        info = {
            State: storage,
            EnergyBalance: energyBalance,
            Energy: energyCapacity,
            UsedCapacity: usedCapacity,
            FreeCapacity: freeCapacity
        }

        return info;
    },

    StructuresWithResources(room) {
        let allObjects;
        let energy = [];
        let other = [];
        let tombstones;

        if (room.controller && room.controller.my) {

            const bannedStructures = ['spawn', 'extension', 'lab', 'tower'];

            const spawns = room.find(FIND_MY_SPAWNS);
            const spawn = spawns[0];

            const structures = room.find(FIND_STRUCTURES, {
                filter: (strc) => {
                    return strc.store;
                }
            });
            allObjects = structures;

            tombstones = room.find(FIND_TOMBSTONES);

            let newArray = [];

            for (i in allObjects) {
                if (!bannedStructures.includes(allObjects[i].structureType)) newArray.push(allObjects[i]);
            }

            let allObjectsWithoutBanned = newArray.sort(function (a, b) {
                aRange = spawn.pos.getRangeTo(a);
                bRange = spawn.pos.getRangeTo(b);
                return aRange - bRange;
            });

            for (i in allObjectsWithoutBanned) {
                if (structures[i].store && structures[i].store[RESOURCE_ENERGY] > 0) energy.push(structures[i]);
                else if (structures[i].store && structures[i].store.getUsedCapacity() > 0) other.push(structures[i]);
            }

            energy = energy.sort(function (a, b) {
                if (a.store[RESOURCE_ENERGY] != b.store[RESOURCE_ENERGY]) return b.store[RESOURCE_ENERGY] - a.store[RESOURCE_ENERGY];
                aRange = spawn.pos.getRangeTo(a);
                bRange = spawn.pos.getRangeTo(b);
                return aRange - bRange;
            })
        }

        const info = {
            All: allObjects,
            Energy: energy,
            Other: other,
            Tombstones: tombstones,
        }

        return info;
    },

    RefillStructures(room) {
        let info = {};

        let allStructures = [];
        let importantStructures = [];
        let notImportantStructures = [];

        if (room.controller && room.controller.my) {
            const spawns = room.find(FIND_MY_SPAWNS);
            const spawn = spawns[0];

            let structures = room.find(FIND_MY_STRUCTURES, {
                filter: (strc) => {
                    return strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity());
                }
            });

            structures = structures.sort(function (a, b) { return spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b); });

            for (i in structures) {
                if (structures[i].structureType == 'tower' || structures[i].structureType == 'spawn') {
                    importantStructures.push(structures[i]);
                } else {
                    notImportantStructures.push(structures[i]);
                }
                allStructures.push(structures[i]);
            }
        }

        info = {
            All: allStructures,
            Important: importantStructures,
            NotImportant: notImportantStructures
        }

        return info;
    },

    HostileCreeps(room) {
        let owners = [];
        let info = {};

        const HostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.Friends.includes(creep.owner.username));
            }
        });

        if (HostileCreeps.length > 0) {
            for (i in HostileCreeps) {
                if (!owners.includes(HostileCreeps[i].owner.username)) owners.push(HostileCreeps[i].owner.username);
            }
            info = {
                State:true,
                Amount:HostileCreeps.length,
                Owners:owners,
            }
        } else {
            info = {
                State:false,
                Amount:null,
                Owners:null,
            }
        }

        return info;
    },

    NeedRepair(room) {
        const spawns = room.find(FIND_MY_SPAWNS);
        const spawn = spawns[0];
        let structures = room.find(FIND_STRUCTURES, {
            filter: (strc) => {
                return strc.hits < strc.hitsMax;
            }
        });

        structures = structures.sort(function (a, b) {
            const result = spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b);
            if(result === 0) return a.hits - b.hits;
            return result;
        });

        const amount = structures.length;

        const info = {
            Amount: amount,
            Structures: structures,
        }

        return info;
    },

    Sources(room) {
        let info = {};

        let sourcesAmount = 0;
        let secondSource = null;
        let firstSource = null;

        if (room.controller && room.controller.my) {
            const spawns = room.find(FIND_MY_SPAWNS);
            const spawn = spawns[0];

            const sources = spawn.pos.findClosestByRange(FIND_SOURCES);
            const sourcesInRoom = room.find(FIND_SOURCES);
            firstSource = sources.id

            if (sourcesInRoom[0].id == firstSource) secondSource = sourcesInRoom[1].id;
            else secondSource = sourcesInRoom[0].id;

            if (sourcesInRoom.length > 0) sourcesAmount = sourcesInRoom.length
        }

        info = {
            Amount: sourcesAmount,
            FirstSource: firstSource,
            SecondSource: secondSource
        }

        return info;
    },

    Spawns(room) {
        let info = {};

        let firstSpawn = null;
        let secondSpawn = null;
        let thirdSpawn = null;
        let amountSpawns = 0;

        const spawns = room.find(FIND_MY_SPAWNS);

        if (spawns.length > 0) {
            amountSpawns = spawns.length

            if (spawns[0]) firstSpawn = spawns[0].id;
            if (spawns[1]) secondSpawn = spawns[1].id;
            if (spawns[2]) thirdSpawn = spawns[2].id;
        }

        info = {
            Amount: amountSpawns,
            FirstSpawn: firstSpawn,
            SecondSpawn: secondSpawn,
            ThirdSpawn: thirdSpawn
        }

        return info;
    },

    Minerals(room) {
        let info = {};

        let sourceInRoom = null;
        let extractorInRoom = false;
        let mineralRegeneration = null;

        const source = room.find(FIND_MINERALS);

        if (source[0]) {
            sourceInRoom = source[0].id;
            mineralRegeneration = source[0].ticksToRegeneration;

            const extractor = room.find(FIND_STRUCTURES, {
                filter: (strc) => {
                    return strc.type == 'extractor';
                }
            });

            if (extractor.length > 0) extractorInRoom = extractor[0].id;
        }

        info = {
            Source: sourceInRoom,
            MineralRegeneration: mineralRegeneration,
            Extractor: extractorInRoom
        }

        return info;
    },

    Terminal(room) {
        let info = {};

        let terminalInRoom = false;
        let energyCapacity = null;
        let usedCapacity = null;
        let freeCapacity = null;

        if (room.terminal) {
            terminalInRoom = true;
            energyCapacity = room.terminal.store[RESOURCE_ENERGY];
            usedCapacity = room.terminal.store.getUsedCapacity();
            freeCapacity = room.terminal.store.getFreeCapacity();
        }

        info = {
            State: terminalInRoom,
            Energy: energyCapacity,
            UsedCapacity: usedCapacity,
            FreeCapacity: freeCapacity
        }

        return info;
    },

    Controller(room) {
        let info = {};

        let state = false;
        let isMy = null;
        let reserved = null;
        let level = null;
        let progress = null;
        let downgrade = null;
        let sign = null;
        let safeMode = null;
        let safeModeAvailable = null;
        let safeModeCooldown = null;

        if (room.controller) {
            state = true;
            if (room.controller.my) {
                isMy = true;
                level = room.controller.level;
                progress = room.controller.progress / room.controller.progressTotal * 100;
                downgrade = room.controller.ticksToDowngrade;
                if (room.controller.sign) sign = room.controller.sign;
                if (room.controller.safeMode) safeMode = room.controller.safeMode;
                if (room.controller.safeModeAvailable) safeModeAvailable = room.controller.safeModeAvailable;
                if (room.controller.safeModeCooldown) safeModeCooldown = room.controller.safeModeCooldown;
            }
            else if (room.controller.reservation) reserved = room.controller.reservation;
        }

        info = {
            State: state,
            IsMy: isMy,
            Reserved: reserved,
            Level: level,
            Progress: progress,
            Downgrade: downgrade,
            Sigh: sign,
            SafeMode: safeMode,
            SafeModeAvailable: safeModeAvailable,
            SafeModeCooldown: safeModeCooldown,
        }

        return info;
    },

    Other(room) {
        let info = {};

        let constructionSites = [];
        let amountConstructionSites = 0;
        let amountOfCreeps = 0;

        const cs = room.find(FIND_CONSTRUCTION_SITES);

        if (cs.length > 0) {
            for (i in cs) {
                constructionSites.push(cs[i].id);
            }
            amountConstructionSites = cs.length;

            if (room.controller && room.controller.my) {
                const spawns = room.find(FIND_MY_SPAWNS);
                const spawn = spawns[0];
                
                const extractor = room.find(FIND_STRUCTURES, {
                    filter: (strc) => {
                        return strc.type == 'extractor';
                    }
                });

                amountOfCreeps = room.find(FIND_MY_CREEPS, {
                    filter: (crp) => {
                        return crp.memory.role != 'Miner' && crp.memory.role != 'Helper';
                    }
                }).length;

                constructionSites = constructionSites.sort(function (a, b) {
                    a = Game.getObjectById(a);
                    b = Game.getObjectById(b);
                    const result = spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b);
                    if(result === 0) return b.progress - a.progress;
                    return result;
                });
            }
        }

        info = {
            ConstructionSites: {
                Amount: amountConstructionSites,
                Array: constructionSites,
            },
            Nuke: false,
            AmountOfCreeps: amountOfCreeps,
        }

        return info;
    }
}

/**
 * const info = GetRoomInformation(ROON);
 *
 * info.RoomName
 *
 * info.Room =>
 *
 * .RefillStructures {All | Important | NotImportant]
 *
 * .Storage {State | EnergyBalance | Energy | UsedCapacity | FreeCapacity]
 *
 * .HostileCreeps {State | Amount | Owners}
 *
 * .StructuresWithResources {All | Energy | Other}
 *
 * .Sources {Amount | FirstSource | SecondSource}
 *
 * .Spawns {Amount | FirstSpawn | SecondSpawn | ThirdSpawn}
 *
 * .Minerals {Source | MineralRegeneration | Extractor}
 *
 * .Other {Amount | Array}
 *
 * .Controller {State | IsMy | Reserved | Level | Progress | Downgrade | Sigh | SafeMode | SafeModeAvailable | SafeModeCooldown}
 *
 * .Terminal {State | Energy | UsedCapacity | FreeCapacity}
 **/
function RoomStats() {
    Memory.Information = {};

    let Info;

    for (i in Game.rooms) {
        let room = Game.rooms[i];

        Info = {
            RoomName:room.name,
            Room:{
                RefillStructures:CheckRoom.RefillStructures(room),
                Storage:CheckRoom.Storage(room),
                HostileCreeps:CheckRoom.HostileCreeps(room),
                StructuresWithResources:CheckRoom.StructuresWithResources(room),
                Sources:CheckRoom.Sources(room),
                NeedRepair:CheckRoom.NeedRepair(room),
                Spawns:CheckRoom.Spawns(room),
                Minerals:CheckRoom.Minerals(room),
                Other:CheckRoom.Other(room),
                Controller:CheckRoom.Controller(room),
                Terminal:CheckRoom.Terminal(room)
            },
        }

        Memory.Information[room.name] = Info;
    }
}
