// repairer.js

const repairer = new _creep({
    role: 'repairer',
    body: {
        pattern: [WORK, CARRY]
    }
});

repairer.run = (creep) => {
    if (creep.spawning) return;
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;

    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

    if (creep.memory.mode === 0) creep.getResource();
    else if (creep.memory.mode === 1) {
        const structures = creep.room.structures;
        const allCreeps = creep.room.find(FIND_MY_CREEPS);

        let refillStructures = structures.filter(strc => refillStructuresArray.includes(strc.structureType) && strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity()));
        let transporters = allCreeps.filter(aCreep => aCreep.memory.role === 'transporter');
        if (refillStructures.length > 0 && transporters.length === 0) {
            refillStructures = refillStructures.sort((a, b) => creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b));
        }

        let repairStructures = structures.filter(strc => strc.hits < strc.hitsMax);
        if (repairStructures.length > 0) {
            repairStructures = repairStructures.sort((a, b) => a.hits - b.hits);
        }

        if (refillStructures.length > 0 && transporters.length === 0) creep._refill(refillStructures[0]);
        else if (repairStructures.length > 0) creep._repair(repairStructures[0]);
        else creep._upgrade();   
    }
}