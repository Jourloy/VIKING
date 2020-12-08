// Harvester start here

const HelperInfo = {
    name:'VIKING [helper]',
    role:'Helper',
    pattern:[WORK,CARRY],
    count:3,
    mustBe:[],
    isForRoad:true,
    useBoost:null,
    moveParts:true,
    skipCarry:true,
}

/**
 * Code for creep harvester
 */
const helper = {
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
