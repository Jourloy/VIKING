// upgrader.js

const upgrader = new VikingCreep({
    role: 'upgrader',
    body: {
        pattern: [WORK, CARRY]
    }
});

upgrader.run = (creep) => {
    if (creep.spawning) return;
    if (creep.store.getUsedCapacity() === 0) creep.memory.mode = 0;
    else if (creep.store.getUsedCapacity() === creep.store.getCapacity()) creep.memory.mode = 1;

    if (creep.memory.mode === 0) creep.getResource();
    else if (creep.memory.mode === 1) creep._upgrade();
}