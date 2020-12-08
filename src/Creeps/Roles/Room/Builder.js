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

/**
 * Code for creep harvester
 */
const builder = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (!creep.spawning) {
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
                else if (!creep.memory.mode) creep.memory.mode = 0

                if (creep.memory.mode == 0) GetResource(creep, RESOURCE_ENERGY);
                else if (creep.memory.mode == 1) {
                    const info = GetRoomInformation(creep.room.name);
                    const room = creep.room
                    if (Memory.room[room.name + ".amountIsLive.Harvester"] == 0 && Memory.room[room.name + ".amountIsLive.Transporter"] == 0) DoRefill(creep, info.Room.RefillStructures.All[0], moveParams);
                    else DoBuild(creep);
                }
            }
        }
    }
}