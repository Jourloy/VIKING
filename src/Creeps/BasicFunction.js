// BasicFunctions start here

/**
 * Find hostile creeps in room
 *
 * @param {Object} room
 * @param {string} target
 * @param {Object} optional
 */
function FindHostileCreeps(room, target, optional) {
    if (target == 'in room') {
        const hostileCreeps = room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => {
                return (!Memory.friends.includes(creep.owner.username));
            }
        });
    }
}


/**
 * Find structure with resource and withdraw energy
 * 
 * @param {Creep} creep 
 * @param {RESOURCE} resource
 */
function GetResource(creep, resource) {
    if (resource == RESOURCE_ENERGY) {
        const information = GetRoomInformation(creep.room.name);
        let energyStructures = information.Room.StructuresWithResources.Energy;
        const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);

        if (energyStructures.length > 0) {
            if (creep.withdraw(energyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(energyStructures[0]);
        } else if (droppedResources && droppedResources.length > 0 && droppedResources[0].amount > creep.store.getFreeCapacity()) {
            if (creep.pickup(droppedResources[0], RESOURCES_ALL) == ERR_NOT_IN_RANGE) creep.moveTo(droppedResources[0]);
        } else creep.say(CreepSay('waiting'));
    }
}

/**
 * waiting
 * searching
 * 
 * @param {String} target 
 */
function CreepSay(target) {
    if (target == 'waiting') {
        const speech = ['WAIT', 'WAIT.', 'WAIT..', 'WAIT...'];
        return speech[Game.time%speech.length];
    } else if (target == 'searching') {
        const speech = ['SEARCH', 'SEARCH.', 'SEARCH..', 'SEARCH...'];
        return speech[Game.time%speech.length];
    }
}

/**
 * Return object with information about room
 *
 * @param {string} roomName
 * @return {Object}
 */
function GetRoomInformation(roomName) {
    if (roomName) {
        return Memory.Information[roomName]
    }
}

function TransferMe(creep) {
    creep.say('🚃');
    const id = creep.id;

    creep.memory.trainRole = 'body'

    const trainHead = creep.room.find(FIND_MY_CREEPS, {
        filter: (creep) => {
            return creep.memory.trainRole && creep.memory.trainRole == 'Head' && creep.memory.trainTarget && creep.memory.trainTarget == id;
        }
    });

    if (trainHead.length == 0) {
        const trainHeadNew = creep.room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role == 'Harvester' || creep.memory.role == 'Transporter';
            }
        });

        if (trainHeadNew.length > 0) {
            trainHeadNew[0].memory.trainRole = 'Head';
            trainHeadNew[0].memory.trainTarget = id;
            trainHeadNew[0].memory.time = Game.time;
        }
    } else {
        const target = creep;
        const train = trainHead[0];
        train.memory.time = Game.time

        train.say('🚂');

        if (train.pull(target) == ERR_NOT_IN_RANGE) {
            train.moveTo(target, {visualizePathStyle: {
                fill: 'transparent',
                stroke: '#FF0000',
                lineStyle: 'dashed',
                strokeWidth: .15,
                opacity: .1
            }});
        } else {
            target.move(train);

            if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType != 'container') {
                if (train.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) {
                    train.say("@")
                    train.move(train.pos.getDirectionTo(target));
                } else {
                    train.moveTo(Game.getObjectById(target.memory.destinationId));
                }
            } else {
                if (train.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) {
                    train.move(train.pos.getDirectionTo(target));
                } else {
                    train.moveTo(Game.getObjectById(target.memory.destinationId));
                }
            }
        }
    }
}

/**
 * Return active source in room
 *
 * @param {Creep} creep
 */
function GetActiveSource(creep) {
    const room = Game.rooms[creep.room.name];
    const sources = room.find(FIND_SOURCES_ACTIVE);
    if (sources[0]) return sources[0].id;
    else return false;
}

/**
 * Start upgrade controller
 *
 * @param {Creep} creep
 */
function DoUpgrade(creep, moveParameters) {
    if (moveParameters) {
        ignoreRoads = moveParameters.ignoreRoads || false;
        ignoreCreeps = moveParameters.ignoreCreeps || false;
        heuristicWeight = moveParameters.heuristicWeight || 1.2;
        range = moveParameters.range || 1;
        reusePath = moveParameters.reusePath || 20;
    } else {
        ignoreRoads = false;
        ignoreCreeps = false;
        heuristicWeight = 1.2;
        range = 1;
        reusePath = 20;
    }
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) creep.moveTo(creep.room.controller, { ignoreRoads: ignoreCreeps, ignoreCreeps: ignoreCreeps, heuristicWeight: heuristicWeight, range: range, reusePath: reusePath });
}

function DoRepair(creep) {
    const info = GetRoomInformation(creep.room.name);
    const needRepairStrc = info.Room.NeedRepair;

    if (needRepairStrc.Amount > 0) {
        if (creep.repair(needRepairStrc.Structures[0]) == ERR_NOT_IN_RANGE) creep.moveTo(needRepairStrc.Structures[0]);
    } else DoBuild(creep)
}

function DoBuild(creep) {
    const info = GetRoomInformation(creep.room.name);

    if (info.Room.Other.ConstructionSites.Amount > 0) {
        const target = Game.getObjectById(info.Room.Other.ConstructionSites.Array[0])
        if (creep.build(target) == ERR_NOT_IN_RANGE) creep.moveTo(target, {heuristicWeight: 1.2, range: 3, reusePath: 50})
    }
    else DoUpgrade(creep, {heuristicWeight: 1.2, range: 3, reusePath: 50});
}
/**
 * Go refill structure
 *
 * @param {Creep} creep
 * @param {Object} structure
 */
function DoRefill(creep, structure, moveParameters) {
    if (moveParameters) {
        ignoreRoads = moveParameters.ignoreRoads || false;
        ignoreCreeps = moveParameters.ignoreCreeps || false;
        heuristicWeight = moveParameters.heuristicWeight || 1.2;
        range = moveParameters.range || 1;
        reusePath = moveParameters.reusePath || 20;
    } else {
        ignoreRoads = false;
        ignoreCreeps = false;
        heuristicWeight = 1.2;
        range = 1;
        reusePath = 20;
    }
    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(structure, { ignoreRoads: ignoreCreeps, ignoreCreeps: ignoreCreeps, heuristicWeight: heuristicWeight, range: range, reusePath: reusePath });
}
