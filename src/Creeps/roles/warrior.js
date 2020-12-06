function warriorLogic(creep) {

    const cs = creep.room.find(FIND_CONSTRUCTION_SITES);
    let structures = creep.room.find(FIND_MY_STRUCTURES, {
        filter: (strc) => {
            return strc.store && (strc.store.getCapacity() == null ? strc.store.getUsedCapacity(RESOURCE_ENERGY) < strc.store.getCapacity(RESOURCE_ENERGY) : strc.store.getUsedCapacity() < strc.store.getCapacity());
        }
    });

    structures = structures.sort(function (a, b) { return spawn.pos.getRangeTo(a) - spawn.pos.getRangeTo(b); });

    if (cs.length > 0) creep.buildJR();
    if (structures.length > 0) creep.refillJR()
    else creep.upgradeJR();
}

const warrior = new VikingCreep({
    role: 'warrior',
    body: {
        pattern: [ATTACK],
    }
});
warrior.run = (creep) => {

    if (Game.flags.fastAttack) {
        if (Game.flags.fastAttack.room == null || creep.room !== Game.flags.fastAttack.room) creep.travelTo(Game.flags.fastAttack);
        else {
            const hostileCreeps = creep.findHostileCreeps();

            if (creep.attack(hostileCreeps[0]) === ERR_NOT_IN_RANGE) creep.travelTo(hostileCreeps[0])
        }
    }
}