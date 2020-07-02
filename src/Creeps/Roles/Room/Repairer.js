// Repairer start here

const RepairerInfo = {
    name:'VIKING [repairer]',
    role:'Repairer',
    pattern:[WORK,CARRY],
    count:50,
    mustBe:[],
    isForRoad:true,
    useBoost:null,
    moveParts:true,
    skipCarry:false,
}


function RepairerIWork(creep) {
    const info = GetRoomInformation(creep.room.name);

    if (info.Room.Other.ConstructionSites.Amount > 0) {
        const target = Game.getObjectById(info.Room.Other.ConstructionSites.Array[0])
        if (creep.build(target) == ERR_NOT_IN_RANGE) creep.moveTo(target, {heuristicWeight: 1.2, range: 3, reusePath: 50})
    }
    else DoUpgrade(creep, {heuristicWeight: 1.2, range: 3, reusePath: 50});
}

/**
 * Code for creep harvester
 */
const repairer = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (!creep.spawning) {
            if (creep.store.getFreeCapacity() == creep.store.getCapacity()) GetResource(creep, RESOURCE_ENERGY);
            else DoRepair(creep)
        }
    }
}