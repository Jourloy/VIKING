// worker.js

const worker = new VikingCreep({
    role: 'worker',
    body: {
        patter: [WORK, CARRY],
    }
});
worker.run = (creep) => {
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    else if (creep.room.name === creep.memory.birthRoom) {
        if (creep.memory.train == null || creep.memory.train.state === false) {
            if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

            if (creep.memory.mode === 0) GetResource(creep, RESOURCE_ENERGY);
            else if (creep.memory.mode === 1) HarvesterWork(creep);
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