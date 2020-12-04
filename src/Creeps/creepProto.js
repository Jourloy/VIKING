// creepProto.js

class Build {
    static buildJR(creep, options = {}) {
        const cs = room.find(FIND_CONSTRUCTION_SITES);
        let constructionSites = [];

        if (cs.length > 0) {
            for (i in cs) constructionSites.push(cs[i].id);
            amountConstructionSites = cs.length;

            if (room.controller && room.controller.my) {
                const spawns = room.find(FIND_MY_SPAWNS);
                const spawn = spawns[0];

                constructionSites = constructionSites.sort(function (a, b) {
                    a = Game.getObjectById(a);
                    b = Game.getObjectById(b);
                    const result = spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b);
                    if(result === 0) return b.progress - a.progress;
                    return result;
                });
            }
        }

        if (creep.build(Game.getObjectById(constructionSites[0])) === ERR_NOT_IN_RANGE) creep.travelTo(Game.getObjectById(constructionSites[0]));
    }
}

Creep.prototype.buildJR = function (options) {
    return Build.buildJR(this, options);
};

class Repair {
    static repairJR(creep, options = {}) {
        const spawns = creep.room.find(FIND_MY_SPAWNS);
        const spawn = spawns[0];
        let structures = creep.room.find(FIND_STRUCTURES, {
            filter: (strc) => {
                return strc.hits < strc.hitsMax;
            }
        });

        structures = structures.sort(function (a, b) {
            const result = spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b);
            if(result === 0) return a.hits - b.hits;
            return result;
        });

        if (creep.repair(structures[0]) === ERR_NOT_IN_RANGE) creep.travelTo(structures[0]);
    }
}

Creep.prototype.repairJR = function (options) {
    return Repair.repairJR(this, options);
};

class Transfer {
    static transfetMe(creep, options = {}) {
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
                train.travelTo(target, {visualizePathStyle: {
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
    }
}

Creep.prototype.transferMe = function (options) {
    return Transfer.transferMe(this, options);
};

class Say {
    static say(creep, state) {
        if (state == null) state = 'null';

        if (state === 'waiting') {
            const text = ['WAIT', 'WAIT.', 'WAIT..', 'WAIT...'];
            creep.say([Game.time%text.length]);
        } else if (state == 'searching') {
            const text = ['SEARCH', 'SEARCH.', 'SEARCH..', 'SEARCH...'];
            creep.say([Game.time%text.length]);
        } else creep.say(state);
    }
}

Creep.prototype.stateSay = function (state) {
    return Say.say(this, state);
};

class Upgrade {
    static upgradeJR(creep) {
        if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) creep.travelTo(creep.room.controller, creep.move);
    }
}

Creep.prototype.upgradeJR = function () {
    return Upgrade.upgradeJR(this);
};

class Find {
    static findHostileCreeps(creep) {
        return room.find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => { return (!_screeps.friends().includes(creep.owner.username) && creep.owner.username !== 'JOURLOY') }
        })
    }

    static findActiveSource(room) {
        const room = Game.rooms[creep.room.name];
        const sources = room.find(FIND_SOURCES_ACTIVE);
        if (sources[0] != null) return sources[0].id;
        else return false;
    }
}

Creep.prototype.findHostileCreeps = function () {
    return Find.findHostileCreeps(this);
};

Creep.prototype.findActiveSource = function (room) {
    if (!room) room = creep.room;
    return Find.findActiveSource(room);
};