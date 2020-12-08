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
    ignoreCreeps: false,
    heuristicWeight: 1.2,
    reusePath: 50
}

/**
 * Go to work
 *
 * @param {Creep} creep
 */
function HarvesterWork(creep) {
    const info = GetRoomInformation(creep.room.name);

    if (info.Room.Controller.Level == 1) {
        if (info.Room.RefillStructures.All.length > 0 ) DoRefill(creep, info.Room.RefillStructures.All[0], moveParams);
        else DoUpgrade(creep);
    } else {
        if(info.Room.RefillStructures.All.length > 0 ) DoRefill(creep, info.Room.RefillStructures.All[0], moveParams)
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
                if (target != null) {
                    if (!Game.getObjectById(target.memory.destinationId).structureType || Game.getObjectById(target.memory.destinationId).structureType != 'container') {
                        if (target.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) creep.memory.trainRole = '-';
                    } else {
                        if (target.pos.isEqualTo(Game.getObjectById(target.memory.destinationId))) creep.memory.trainRole = '-';
                    }
                } else {
                    creep.memory.trainRole = '-'
                }
            } else {
                if (creep.store.getUsedCapacity() == 0) creep.memory.mode = 0;
                else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.mode = 1;

                if (creep.memory.mode == 0) GetResource(creep, RESOURCE_ENERGY);
                else if (creep.memory.mode == 1) HarvesterWork(creep);
            }
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), moveParams);
        }
    }
}
