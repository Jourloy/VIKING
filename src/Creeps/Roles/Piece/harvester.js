// Harvester start here

const HarvesterInfo = {
    role:'Harvester',
    pattern:[WORK,CARRY],
    count:25,
    mustBe:[],
    isForRoad:false,
    useBoost:false,
    moveParts:true
}

/**
 * @param {Creep} creep
 */
function HarvesterGetResource(creep) {
    const source = GetActiveSource(creep);

    if (source != false) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
    }
}

/**
 * @param {Creep} creep
 */
function HarvesterWork(creep) {

}

/**
 * @param {Creep} creep
 */
function Harvester() {
    if (creep.spawning) {
        creep.memory.room = creep.room.name;
    } else {
        if (creep.room.name == creep.memory.room) {

            SetMemory(creep);
            if (creep.memory.mode === 0) HarvesterGetResource(creep);
            else (creep.memory.mode === 1) HarvesterWork(creep);
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}
