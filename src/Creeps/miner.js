// Miner.js

const options = {
    role: 'miner',
    body: {
        pattern: [WORK],
        count: 5,
        mustBe: [CARRY],
        moveParts: false,
    }
}

const creep = new Creep(options);

creep.run = function() {
    const roomName = this.game.room.name;
    let container;

    if (!creep.spawning) {
        if (!creep.memory.source) {
            if (creep.memory.number === 1) creep.memory.source = information.Room.Sources.FirstSource;
            else if (creep.memory.number === 2) creep.memory.source = information.Room.Sources.SecondSource;
        } else if (creep.memory.source) {
            const sourceTarget = Game.getObjectById(creep.memory.source);
            container = sourceTarget.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER });

            if (container.length > 0) {
                creep.memory.destinationId = container[0].id;

                if (creep.pos.isEqualTo(container[0].pos) && container[0].store.getCapacity() != container[0].store.getUsedCapacity()) creep.harvest(sourceTarget);
                else if (creep.pos.isEqualTo(container[0].pos) && container[0].store.getCapacity() == container[0].store.getUsedCapacity()) creep.say('💤')
                else TransferMe(creep);
            } else {
                creep.memory.destinationId = creep.memory.source;

                if (creep.pos.isNearTo(sourceTarget.pos)) creep.harvest(sourceTarget);
                else TransferMe(creep);
            }
        }
    }
}