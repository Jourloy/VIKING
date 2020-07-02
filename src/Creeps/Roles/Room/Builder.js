// Builder start here

const BuilderInfo = {
    name:'VIKING [builder]',
    role:'Builder',
    pattern:[WORK,CARRY],
    count:50,
    mustBe:[],
    isForRoad:true,
    useBoost:null,
    moveParts:true,
    skipCarry:true,
}

function BuilderGetResource(creep) {
    const information = GetRoomInformation(creep.room.name);

    const energyStructures = information.Room.StructuresWithResources.Energy;
    const otherStructures = information.Room.StructuresWithResources.Other;

    const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);

    if (energyStructures.length > 0) {
        if (creep.withdraw(energyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(energyStructures[0]);
    } else if (otherStructures.length > 0) {
        if (creep.withdraw(otherStructures[0], RESOURCES_ALL) == ERR_NOT_IN_RANGE) creep.moveTo(otherStructures[0]);
    } else if (droppedResources && droppedResources.length > 0 && droppedResources[0].amount > 100) {
        if (creep.pickup(droppedResources[0], RESOURCES_ALL) == ERR_NOT_IN_RANGE) creep.moveTo(droppedResources[0]);
    } else {
        creep.say(CreepSay('waiting'))
    }
}

function BuilderWork(creep) {
    
}

/**
 * Code for creep harvester
 */
const builder = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (!creep.spawning) {
            if (creep.store.getFreeCapacity() == creep.store.getCapacity()) BuilderGetResource(creep);
            else DoBuild(creep);
        }
    }
}