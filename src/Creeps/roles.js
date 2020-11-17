// Roles.js

const miner = new VikingCreep({
    role: 'miner',
    body: {
        pattern: [WORK],
        count: 5,
        mustBe: [CARRY],
        moveParts: false,
    }
});
miner.run = (creep) => {
    creepSay(creep, this.role);
}

const worker = new VikingCreep({
    role: 'worker',
    body: {
        patter: [WORK, CARRY],
    }
});
worker.run = (creep) => {
    const object = worker;
    const role = object.role;
    creepSay(creep, role);
}

function runCreeps() {
    for (let i in Game.creeps)
        for (let j in creepArray)
            if (creepArray[j].role === Game.creeps[i].memory.role) creepArray[j].run(Game.creeps[i]);
}