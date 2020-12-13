// prototype.js

/* CONTAINER */
/* CONTROLLER */
/* EXTENSION */
/* EXTRACTOR */
/* FACTORY */
/* LAB */
/* LINK */
/* NUKER */
/* SPAWN */
/* STORAGE */
/* TERMINAL */
/* TOWER */
/* CREEP */

Creep.prototype._build = function(structure) {
    if (this.build(structure) === ERR_NOT_IN_RANGE) this.travelTo(structure, this.travelParams);
    return 0;
}

Creep.prototype._repair = function(structure) {
    if (this.repair(structure) === ERR_NOT_IN_RANGE) this.travelTo(structure, this.travelParams);
    return 0;
}

Creep.prototype._upgrade = function() {
    if (this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) this.travelTo(this.room.controller, this.travelParams);
    return 0;
};

Creep.prototype._refill = function(structure) {
    if (this.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) this.travelTo(structure, this.travelParams);
    return 0;
}

Creep.prototype._transfer = function() {
    const creep = this;

    creep.say('🚃');
    const id = creep.id;

    creep.memory.trainRole = 'body';

    const trainHead = creep.room.find(FIND_MY_CREEPS, {
        filter: (creep) => {
            return creep.memory.trainRole && creep.memory.trainRole == 'head' && creep.memory.trainTarget && creep.memory.trainTarget == id;
        }
    });

    if (trainHead.length == 0) {
        const trainHeadNew = creep.room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role === 'worker' || creep.memory.role === 'upgrader';
            }
        });

        if (trainHeadNew.length > 0) {
            trainHeadNew[0].memory.trainRole = 'head';
            trainHeadNew[0].memory.state = 'head';
            trainHeadNew[0].memory.trainTarget = id;
            trainHeadNew[0].memory.time = Game.time;
        }
    } else {
        const target = creep;
        const train = trainHead[0];
        train.memory.time = Game.time

        train.say('🚂');

        if (train.pull(target) == ERR_NOT_IN_RANGE) {
            train.travelTo(target);
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

Creep.prototype.stateSay = function(state) {
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
    if (resource == null) resource = RESOURCE_ENERGY;

    if (resource === RESOURCE_ENERGY) {
        const activeSource = this.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        switch (this.memory.role) {
            case 'remouteWorker':
                if (this.harvest(activeSource) === ERR_NOT_IN_RANGE) this.travelTo(activeSource, this.travelParams);
                if (this.harvest(activeSource) === ERR_NOT_OWNER) {
                    if (!Game.flags.fastAttack) this.room.createFlag(this.pos, 'fastAttack');
                }
                return 0;
            default:
                let structures = this.room.structures;
                structures = structures.filter(strc => (strc.structureType === 'container' || strc.structureType === 'storage') && strc.store[RESOURCE_ENERGY] > this.store.getFreeCapacity());

                if (structures.length > 0) {
                    if (this.withdraw(structures[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) this.travelTo(structures[0], this.travelParams);
                } else {
                    if (this.harvest(activeSource) == ERR_NOT_IN_RANGE) this.travelTo(activeSource, this.travelParams);
                }
                
                return 0;
        }
    }
    return 0;
}