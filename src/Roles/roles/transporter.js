// transporter.js

const transporter = new VikingCreep({
    role: 'transporter',
    body: {
        pattern: [CARRY]
    }
});

transporter.run = (creep) => {
    if (creep.spawning) return;
    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

    if (creep.memory.state === 'work') {
        if (creep.memory.mode === 0) {
            let structures = creep.room.structures;
            let tombstones = creep.room.tombstones;
            let ruins = creep.room.ruins;
            let droppedEnergy = creep.room.droppedEnergy;

            structures = structures.filter(strc => (strc.structureType === 'storage' && strc.store[RESOURCE_ENERGY] > 100000) || strc.structureType === 'container' && strc.store[RESOURCE_ENERGY] > creep.store.getFreeCapacity());
            tombstones = tombstones.filter(tmb => tmb.store[RESOURCE_ENERGY] > 0);
            ruins = ruins.filter(r => r.store[RESOURCE_ENERGY] > 0);

            if (droppedEnergy.length > 0) {
                if (creep.pickup(droppedEnergy[0]) === ERR_NOT_IN_RANGE) creep.travelTo(droppedEnergy[0]);
            } else if (tombstones.length > 0) {
                if (creep.withdraw(tombstones[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.travelTo(tombstones[0]);
            } else if (ruins.length > 0) {
                if (creep.withdraw(ruins[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.travelTo(ruins[0]);
            } else if (structures.length > 0) {
                if (creep.withdraw(structures[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.travelTo(structures[0]);
            }

        } else if (creep.memory.mode === 1) {
            const structures = creep.room.structures;

            let refillStructures = structures.filter(strc => refillStructuresArray.includes(strc.structureType) && strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity()));
            if (refillStructures.length > 0) {
                refillStructures = refillStructures.sort((a, b) => creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b));
            }

            if (refillStructures.length > 0) creep._refill(refillStructures[0]);
            else {
                if (creep.room.storage) if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) creep.travelTo(creep.room.storage);
            }
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