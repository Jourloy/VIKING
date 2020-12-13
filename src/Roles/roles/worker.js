// worker.js

function workerLogic(creep) {
    const structures = creep.room.structures;

    let cs = creep.room.constructionSites;
    if (cs.length > 0) {
        cs = cs.sort((a, b) => a.progress - b.progress);
    }

    let refillStructures = structures.filter(strc => strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity()));
    if (refillStructures.length > 0) {
        refillStructures = refillStructures.sort((a, b) => creep.pos.getRangeTo(a) - creep.pos.getRangeTo(b));
    }

    let repairStructures = structures.filter(strc => strc.hits < strc.hitsMax);
    if (repairStructures.length > 0) {
        repairStructures = repairStructures.sort((a, b) => a.hits - b.hits);
    }

    if (refillStructures.length > 0) creep._refill(refillStructures[0]);
    else if (repairStructures.length > 0) creep._repair(repairStructures[0]);
    else if (cs.length > 0) creep._build(cs[0]);
    else creep._upgrade();
}

const worker = new VikingCreep({
    role: 'worker',
    body: {
        pattern: [WORK, CARRY],
    }
});

worker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    if (creep.inBirthRoom === true) {
        if (creep.memory.state === 'work') {
            if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

            if (creep.memory.mode === 0) creep.getResource();
            else if (creep.memory.mode === 1) workerLogic(creep);
        } else if (creep.memory.state === 'trainHead') {
            const target = Game.getObjectById(creep.memory.train.target);
            if (target != null) {
                if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType !== 'container') {
                    if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.state = null;
                } else {
                    if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.state = null;
                }
            } else creep.memory.state = 'work';
        } else if (creep.memory.state == null) creep.memory.state = 'work'
    } else {
        creep.travelTo(new RoomPosition(25, 25, creep.memory.birthRoom));
    }
}