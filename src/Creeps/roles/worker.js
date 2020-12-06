// worker.js

function workerLogic(creep) {

    const cs = creep.room.find(FIND_CONSTRUCTION_SITES);
    let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (strc) => {
            return strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity());
        }
    });

    structures = structures.sort(function (a, b) { return spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b); });

    if (cs.length > 0) creep.buildJR();
    if (structures.length > 0) creep.refillJR()
    else creep.upgradeJR();
}

const worker = new VikingCreep({
    role: 'worker',
    body: {
        pattern: [WORK, CARRY],
    }
});
worker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    else if (creep.room.name === creep.memory.birthRoom) {
        if (creep.memory.train == null || creep.memory.train.state === false) {
            if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;
            console.log(creep.getResource(creep))
            if (creep.memory.mode === 0) creep.getResource();
            else if (creep.memory.mode === 1) workerLogic(creep);
        } else {
            const target = Game.getObjectById(creep.memory.train.target);
            if (target != null) {
                if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType !== 'container') {
                    if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.train.role = '-';
                } else {
                    if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.train.role = '-';
                }
            } else creep.memory.train.role = '-';
        }
    } else creep.moveTo(new RoomPosition(25, 25, creep.memory.birthRoom), moveParams);
}