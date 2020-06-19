const MinerInfo = {
    name:'drone',
    role:'Miner',
    pattern:[WORK],
    count:5,
    mustBe:[CARRY],
    isForRoad:false,
    useBoost:null,
    moveParts:false,
    skipCarry:true,
    withoutMove:true,
}

const miner = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        const roomName = creep.room.name;
        const information = GetRoomInformation(roomName);
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

                    if (creep.pos.isEqualTo(container[0].pos)) creep.harvest(sourceTarget);
                    else TransferMe(creep);
                } else {
                    creep.memory.destinationId = creep.memory.source;

                    if (creep.pos.isNearTo(sourceTarget.pos)) creep.harvest(sourceTarget);
                    else TransferMe(creep);
                }
            }
        }
    }
}
