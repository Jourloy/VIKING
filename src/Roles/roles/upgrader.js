// upgrader.js

const upgrader = new _creep({
    role: 'upgrader',
    body: {
        pattern: [WORK, CARRY]
    }
});

upgrader.run = (creep) => {
    if (creep.spawning) return;
    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

    if (creep.memory.state === 'work') {
        if (creep.memory.mode === 0) creep.getResource();
        else if (creep.memory.mode === 1) {
            const structures = creep.room.structures;
            const allCreeps = creep.room.find(FIND_MY_CREEPS);

            let refillStructures = structures.filter(strc => refillStructuresArray.includes(strc.structureType) && strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity()));
            let transporters = allCreeps.filter(aCreep => aCreep.memory.role === 'transporter');
            let miners = allCreeps.filter(aCreep => aCreep.memory.role === 'miner');
            if (refillStructures.length > 0 && transporters.length === 0) {
                refillStructures = refillStructures.sort((a, b) => creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b));
            }

            if (refillStructures.length > 0 && (miners.length === 0 || transporters.length === 0)) creep._refill(refillStructures[0]);
            else creep._upgrade();   
        }
    } else if (creep.memory.state === 'head') {
        const target = Game.getObjectById(creep.memory.trainTarget);
        if (target != null) {
            if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType !== 'container') {
                if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.state = null;
            } else {
                if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.state = null;
            }
        } else creep.memory.state = 'work';
    } else if (creep.memory.state == null) creep.memory.state = 'work'
}