const MinerInfo = {
    role:'Miner',
    pattern:[WORK],
    count:5,
    mustBe:[CARRY],
    isForRoad:false,
    useBoost:false,
    moveParts:false
}

/**
 * @param {Creep} creep
 */
function Miner(creep) {
    const roomName = creep.room.name;
    const information = GetRoomInformation(roomName);
    const source = null;
    const containerNear = creep.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER });

    if (creep.memory.number === 1) source = information.FirstSource;
    else if (creep.memory.number === 2) source = information.SecondSource;

    if (source != null) {
        const source = Game.getObjectById(source);

        if (containerNear.length == 1 && creep.pos.isNearTo(source)) {
            if (!creep.pos.isEqualTo(containerNear[0].pos)) {
                creep.moveTo(containerNear[0].pos, { ignoreCreeps: true, reusePath: 20 });
            } else if (containerNear[0].store[RESOURCE_ENERGY] < 1950) {
                creep.harvest(source);
            } else {
                creep.moveTo(source, { ignoreCreeps: true, reusePath: 20 });
            }
        } else {
            if (containerNear.length == 2 && creep.pos.isNearTo(source)) {
                creep.moveTo(containerNear[1], { ignoreCreeps: true, reusePath: 50 });
            } else creep.moveTo(source, { ignoreCreeps: true, reusePath: 50 });
        }
    } else {
        Error(`Creep can't choose source. Error [MINER:30]`);
    }
}
