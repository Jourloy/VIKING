// warrior.js

const warrior = new _creep({
    role: 'warrior',
    body: {
        pattern: [ATTACK],
    }
});
warrior.run = (creep) => {
    if (creep.spawning) return;
    if (creep.memory.destination == null) {
        if (creep.room.defenseFlag.length > 0) {
            const hostiles = creep.room.hostileCreeps.length;
            let myCreeps = creep.room.find(FIND_MY_CREEPS);
            myCreeps = myCreeps.filter(aCreep => (aCreep.memory.role === 'warrior' && aCreep.memory.destination === 'defense'));

            if (myCreeps < Math.ceil(hostiles / 2)) creep.memory.destination = 'defense';
        }

        if (Game.flags.fastAttack) creep.memory.destination = 'fastAttack'
    }

    if (creep.memory.destination === 'defense') {
        let targetCreeps = undefined;

        console.log(creep.room.invaders)
        if (creep.room.invaders.length > 0) targetCreeps = creep.room.invaders;

        if (targetCreeps != null) {
            if (creep.room.controller && creep.room.controller.my && creep.room.controller.safeMode != null) creep._say('ODIN WITH US', true);
            else creep._say('FOR THE VIKINGS', true)
            if (creep.attack(targetCreeps[0]) === ERR_NOT_IN_RANGE) creep.travelTo(targetCreeps[0]);
        } else {
            const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            if (spawn.recycleCreep(creep) === ERR_NOT_IN_RANGE) creep.travelTo(spawn);
        }
    }

    if (creep.memory.destination === 'fastAttack') {
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