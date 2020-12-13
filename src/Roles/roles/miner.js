// miner.js

const miner = new VikingCreep({
    role: 'miner',
    body: {
        pattern: [WORK],
        count: 5,
        mustBe: [CARRY],
        moveParts: false,
    }
});

miner.run = (creep) => {
    if (creep.spawning) return;
    if (creep.memory.birthRoom == null) creep.memory.birthRoom = creep.room.name;
    if (creep.memory.source == null) {
        const _allCreep = creep.room.find(FIND_MY_CREEPS);
        const mineCreeps = _allCreep.filter(aCreep => aCreep.memory.role === 'miner' && aCreep.memory.birthRoom === creep.memory.birthRoom && aCreep.name !== creep.name);
        if (mineCreeps.length === 0) creep.memory.source = creep.room.find(FIND_SOURCES)[0].id;
        else if (mineCreeps.length === 1) {
            let source = creep.room.find(FIND_SOURCES);
            if (source[0].id === mineCreeps[0].memory.source) creep.memory.source = source[1].id;
            else creep.memory.source = source[0].id;
        } else _console.error(`${creep.memory.role} error [JWQ]`)
    } else {
        const source = Game.getObjectById(creep.memory.source);
        const container = source.pos.findInRange(FIND_STRUCTURES, 1, strc => strc && strc.structureType && strc.structureType === 'container')[0];
        creep.memory.destinationId = container.id;
        if (!creep.pos.isEqualTo(container.pos)) creep._transfer();
        else {
            creep.say(Math.ceil(source.energy / 5))
            if (container.store.getUsedCapacity() !== container.store.getCapacity()) creep.harvest(source);
        }
    }
}