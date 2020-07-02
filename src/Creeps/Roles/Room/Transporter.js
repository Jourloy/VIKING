// Transporter start here

const TransporterInfo = {
    name:'VIKING [transporter]',
    role:'Transporter',
    pattern:[CARRY],
    count:50,
    mustBe:[],
    isForRoad:true,
    useBoost:null,
    moveParts:true,
    skipCarry:false,
}

function TransporterGetResource(creep) {
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

function TransporterWork(creep) {
    const information = GetRoomInformation(creep.room.name);
    if (information.Room.RefillStructures.Important.length > 0) DoRefill(creep, information.Room.RefillStructures.Important[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50});
    if (information.Room.RefillStructures.All.length > 0 ) DoRefill(creep, information.Room.RefillStructures.All[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50});
}

const transporter = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (!creep.spawning) {
            if (creep.memory.trainRole && creep.memory.trainRole == 'Head') {
                const target = Game.getObjectById(creep.memory.trainTarget);
                if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType != 'container') {
                    if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.trainRole = '-';
                } else {
                    if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.trainRole = '-';
                }
            } else {
                if (creep.store.getFreeCapacity() == creep.store.getCapacity()) TransporterGetResource(creep);
                else TransporterWork(creep);
            }
        }
    }
}
