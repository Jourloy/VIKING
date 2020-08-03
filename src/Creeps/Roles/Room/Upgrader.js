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

const upgrader = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (!creep.spawning) {
            if (creep.store.getUsedCapacity() == 0) creep.memory.mode = 0;
            else if (creep.store.getUsedCapacity() == creep.store.getCapacity()) creep.memory.mode = 1;

            if (creep.memory.mode == 0) GetResource(creep, RESOURCE_ENERGY);
            else if (creep.memory.mode == 1) {
                const info = GetRoomInformation(creep.room.name);
                const room = creep.room
                if (Memory.room[room.name + ".amountIsLive.Harvester"] == 0 && Memory.room[room.name + ".amountIsLive.Transporter"] == 0) DoRefill(creep, info.Room.RefillStructures.All[0], moveParams);
                else DoUpgrade(creep);
            }
        }
    }
}