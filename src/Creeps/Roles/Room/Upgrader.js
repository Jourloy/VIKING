// Upgrader start here

const UpgraderInfo = {
    name:'VIKING [upgrader]',
    role:'Upgrader',
    pattern:[WORK,CARRY],
    count:50,
    mustBe:[],
    isForRoad:true,
    useBoost:null,
    moveParts:true,
    skipCarry:false,
}

function UpgraderGetResource(creep) {
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

function UpgraderWork(creep) {
    DoUpgrade(creep, {heuristicWeight: 1.2, range: 3, reusePath: 50});
}

const upgrader = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (!creep.spawning) {
            if (creep.store.getFreeCapacity() == creep.store.getCapacity()) UpgraderGetResource(creep);
            else UpgraderWork(creep);
        }
    }
}