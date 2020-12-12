// prototype.js

StructureTower.prototype.findHostileCreeps = function () {
    const tower = this;
    return tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return (!friends.includes(creep.owner.username) && creep.owner.username !== 'JOURLOY')
        }
    })
};

Creep.prototype.findRoomInformation = function() {
    const creep = this;

    for (i in roomsArray) {
        if (roomsArray[i].name === creep.room.name) return roomsArray[i].information;
    }

    return ERR_ROOM_NOT_FOUND;
}

Creep.prototype.buildJR = function(structure) {
    const creep = this;

    if (creep.build(structure) === ERR_NOT_IN_RANGE) creep.travelTo(structure, creep.travelParams);
    return 0;
};

Creep.prototype.repairJR = function(structure) {
    const creep = this;

    if (creep.repair(structures) === ERR_NOT_IN_RANGE) creep.travelTo(structures, creep.travelParams);
    return 0;
};

Creep.prototype.transferMe = function (options) {
    const creep = this;

    creep.say('🚃');
    const id = creep.id;

    creep.memory.trainRole = 'body';

    const trainHead = creep.room.find(FIND_MY_CREEPS, {
        filter: (creep) => {
            return creep.memory.trainRole && creep.memory.trainRole == 'Head' && creep.memory.trainTarget && creep.memory.trainTarget == id;
        }
    });

    if (trainHead.length == 0) {
        const trainHeadNew = creep.room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role == 'Harvester' || creep.memory.role == 'Transporter' || creep.memory.role == 'Helper' || creep.memory.role == 'Builder';
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
            train.travelTo(target, {
                visualizePathStyle: {
                    fill: 'transparent',
                    stroke: '#FF0000',
                    lineStyle: 'dashed',
                    strokeWidth: .15,
                    opacity: .1
                }
            });
        } else {
            target.move(train);

            if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType != 'container') {
                if (train.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) {
                    train.say("@")
                    train.move(train.pos.getDirectionTo(target));
                } else {
                    train.travelTo(Game.getObjectById(target.memory.destinationId));
                }
            } else {
                if (train.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) {
                    train.move(train.pos.getDirectionTo(target));
                } else {
                    train.travelTo(Game.getObjectById(target.memory.destinationId));
                }
            }
        }
    }
    return 0;
};

Creep.prototype.stateSay = function (state) {
    const creep = this;

    if (state == null) state = 'null';

    if (state === 'waiting') {
        const text = ['WAIT', 'WAIT.', 'WAIT..', 'WAIT...'];
        creep.say([Game.time % text.length]);
    } else if (state == 'searching') {
        const text = ['SEARCH', 'SEARCH.', 'SEARCH..', 'SEARCH...'];
        creep.say([Game.time % text.length]);
    } else creep.say(state);
    return 0;
};

Creep.prototype.upgradeJR = function () {
    const creep = this;
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) creep.travelTo(creep.room.controller, creep.travelParams);
    return 0;
};

Creep.prototype.findHostileCreeps = function () {
    const creep = this;
    return creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return (!friends.includes(creep.owner.username) && creep.owner.username !== 'JOURLOY')
        }
    })
};

Creep.prototype.findActiveSource = function () {
    const creep = this;
    return creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
};

Creep.prototype.getResource = function (resource) {
    const creep = this;
    if (resource == null) resource = RESOURCE_ENERGY;

    if (resource === RESOURCE_ENERGY) {
        const activeSource = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        switch (creep.memory.role) {
            case 'upgrader':
            case 'worker':
                console.log(creep.harvest(activeSource))
                if (creep.harvest(activeSource) == ERR_NOT_IN_RANGE) creep.travelTo(activeSource, creep.travelParams);
                return 0;
            case 'remouteWorker':
                if (creep.harvest(activeSource) === ERR_NOT_IN_RANGE) creep.travelTo(activeSource, creep.travelParams);
                if (creep.harvest(activeSource) === ERR_NOT_OWNER) {
                    if (!Game.flags.fastAttack) creep.room.createFlag(creep.pos, 'fastAttack');
                }
                return 0;
        }
    }
    return 0;
}

Creep.prototype.refillJR = function () {
    const creep = this;

    let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (strc) => {
            return strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity());
        }
    });
    const spawns = creep.room.find(FIND_MY_SPAWNS);
    const spawn = spawns[0];
    structures = structures.sort(function (a, b) { return spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b); });

    if (creep.transfer(structures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.travelTo(structures[0], creep.travelParams);
    return 0;
}