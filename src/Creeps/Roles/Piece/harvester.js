// Harvester start here

const HarvesterInfo = {
    role:'Harvester',
    pattern:[WORK,CARRY],
    count:25,
    mustBe:[],
    isForRoad:false,
    useBoost:null,
    moveParts:true,
    skipCarry:true,
}

/**
 * Get energy for work
 *
 * @param {Creep} creep
 */
function HarvesterGetResource(creep) {

    let source = false

    if (!creep.memory.source) creep.memory.source = GetActiveSource(creep);
    else {
        if (Game.getObjectById(creep.memory.source).energy > 0) source = Game.getObjectById(creep.memory.source);
        else creep.memory.source = GetActiveSource(creep)
    }

    if (source != false) {
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source);
    }
}

/**
 * Go to work
 *
 * @param {Creep} creep
 */
function HarvesterWork(creep) {
    DoUpgrade(creep)
}

/**
 * Code for creep harvester
 */
const harvester = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (creep.room.name == creep.memory.room) {

            if (creep.store.getUsedCapacity() == 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.mode = 1;

            if (creep.memory.mode == 0) HarvesterGetResource(creep);
            else if (creep.memory.mode == 1) HarvesterWork(creep);
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}
