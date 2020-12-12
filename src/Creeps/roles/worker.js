// worker.js

function workerLogic(creep) {
    const cs = creep.room.find(FIND_CONSTRUCTION_SITES);
    let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (strc) => {
            return strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity());
        }
    });
    const spawns = creep.room.find(FIND_MY_SPAWNS);
    const spawn = spawns[0];
    structures = structures.sort(function (a, b) { return spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b); });

    const roomInfo = creep.findRoomInformation();

    if (structures.length > 0) creep.refillJR()
    else if (roomInfo.structures.needRepair.length > 0) creep.repairJR(roomInfo.structures.needRepair[0]);
    else if (cs.length > 0) creep.buildJR(cs[0]);
    else creep.upgradeJR();
}

const worker = new VikingCreep({
    role: 'worker',
    body: {
        pattern: [WORK, CARRY],
    },
    moveParams: {
        offRoad: true,
    }
});
worker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    else if (creep.room.name === creep.memory.birthRoom) {
        if (creep.memory.state == null) {
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
            } else creep.memory.state = null;
        } else if (creep.memory.state === 'busy') {
            creep.say('🛑 BUSY')
        } else creep.memory.state = null;
    } else creep.moveTo(new RoomPosition(25, 25, creep.memory.birthRoom), moveParams);
}