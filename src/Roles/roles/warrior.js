// warrior.js

const warrior = new _creep({
    role: 'warrior',
    body: {
        pattern: [ATTACK],
    }
});
warrior.run = (creep) => {
    if (creep.spawning) return;
    if (Game.flags.fastAttack) {
        if (Game.flags.fastAttack.room == null || creep.room !== Game.flags.fastAttack.room) creep.travelTo(Game.flags.fastAttack);
        else {
            const hostileCreeps = creep.findHostileCreeps();
            if (hostileCreeps != null) {
                creep.say('VIKINGS', true)
                if (creep.attack(hostileCreeps) === ERR_NOT_IN_RANGE) creep.travelTo(hostileCreeps);
            } else {
                creep.say('VIKINGS', true)
                const structure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {
                    filter: (strc) => {
                        return (strc.structureType !== STRUCTURE_CONTROLLER);
                    }
                });
                if (creep.attack(structure) === ERR_NOT_IN_RANGE) creep.travelTo(structure);
            }
        }
    }
}