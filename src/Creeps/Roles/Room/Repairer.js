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