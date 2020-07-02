// Harvester start here

const HarvesterInfo = {
    name:'VIKING [harvester]',
    role:'Harvester',
    pattern:[WORK,CARRY],
    count:25,
    mustBe:[],
    isForRoad:false,
    useBoost:null,
    moveParts:true,
    skipCarry:false,
}

const moveParametersForGetResource = {
    heuristicWeight: 1.2,
    range: 1,
    reusePath: 50
}

const moveParametersForWork = {
    ignoreCreeps: true,
    heuristicWeight: 1.2,
    reusePath: 50
}

/**
 * Get energy for work
 *
 * @param {Creep} creep
 */
function HarvesterGetResource(creep) {

    let source = false

    const droppedResource = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: (drpd) => {
            return drpd.resourceType == 'energy';
        }
    })

    if (droppedResource.length > 0 && droppedResource.Amount > creep.store.getCapacity()) {
        if (creep.pickup(droppedResource[0]) == ERR_NOT_IN_RANGE) creep.moveTo(droppedResource[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50})
    } else {
        const information = GetRoomInformation(creep.room.name);

        const energyStructures = information.Room.StructuresWithResources.Energy;
        const otherStructures = information.Room.StructuresWithResources.Other;

        const droppedResources = creep.room.find(FIND_DROPPED_RESOURCES);

        if (creep.room.controller.level < 3 && energyStructures.length > 0) {
            if (creep.withdraw(energyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) creep.moveTo(energyStructures[0]);
        } else {
            if (!creep.memory.source) creep.memory.source = GetActiveSource(creep);
            else {
                if (Game.getObjectById(creep.memory.source).energy > 0) source = Game.getObjectById(creep.memory.source);
                else creep.memory.source = GetActiveSource(creep)
            }

            if (source != false) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) creep.moveTo(source, {heuristicWeight: 1.2, range: 1, reusePath: 30});
            }
        }
    }
}

/**
 * Go to work
 *
 * @param {Creep} creep
 */
function HarvesterWork(creep) {
    const info = GetRoomInformation(creep.room.name);

    if (info.Room.Controller.Level == 1) {
        if (info.Room.RefillStructures.All.length > 0 ) DoRefill(creep, info.Room.RefillStructures.All[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50});
        else DoUpgrade(creep, {heuristicWeight: 1.2, range: 3, reusePath: 50});
    } else {
        if(info.Room.RefillStructures.All.length > 0 ) DoRefill(creep, info.Room.RefillStructures.All[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50})
        else DoBuild(creep)
    }
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

            if (creep.memory.trainRole && creep.memory.trainRole == 'Head') {
                const target = Game.getObjectById(creep.memory.trainTarget);
                if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType != 'container') {
                    if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.trainRole = '-';
                } else {
                    if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.trainRole = '-';
                }
            } else {
                if (creep.store.getUsedCapacity() == 0) creep.memory.mode = 0;
                else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.mode = 1;

                if (creep.memory.mode == 0) HarvesterGetResource(creep);
                else if (creep.memory.mode == 1) HarvesterWork(creep);
            }
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}
