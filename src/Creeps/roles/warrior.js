// warrior.js

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
            const hostileCreep = creep.findHostileCreeps();

            if (creep.attack(hostileCreep) === ERR_NOT_IN_RANGE) creep.travelTo(hostileCreep)
        }
    } else {
        creep.suicide()
    }
}