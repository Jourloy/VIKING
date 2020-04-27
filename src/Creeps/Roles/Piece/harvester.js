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

    if (droppedResource.length > 0) {
        if (creep.pickup(droppedResource[0]) == ERR_NOT_IN_RANGE) creep.moveTo(droppedResource[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50})
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
        if (info.Room.Other.ConstructionSites.Amount > 0) {
            const target = Game.getObjectById(info.Room.Other.ConstructionSites.Array[0])
            if (creep.build(target) == ERR_NOT_IN_RANGE) creep.moveTo(target, {heuristicWeight: 1.2, range: 3, reusePath: 50})
        } else if(info.Room.RefillStructures.All.length > 0 ) DoRefill(creep, info.Room.RefillStructures.All[0], {ignoreCreeps: true, heuristicWeight: 1.2, range: 1, reusePath: 50});
        else DoUpgrade(creep, {heuristicWeight: 1.2, range: 3, reusePath: 50});

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

            if (creep.store.getUsedCapacity() == 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.mode = 1;

            if (creep.memory.mode == 0) HarvesterGetResource(creep);
            else if (creep.memory.mode == 1) HarvesterWork(creep);
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), { ignoreRoads: true, heuristicWeight: 1.2, range: 1, reusePath: 50 });
        }
    }
}
