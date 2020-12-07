// Main.js

class VikingCreep {
    constructor(options) {
        if (options == null) options = {};
        const move = {
            heuristicWeight: 1.2, 
            ignoreCreeps: true, 
            reusePath: 30,
        };

        this.name = `Viking | ${options.name} | g[${_tools.generateString(10)}]` || `Viking g[${_tools.generateString(10)}]`;
        this.role = options.role || 'creep';
        this.move = options.move || move;
        this.state = options.state || null;
        this.body = options.body || null;

        creepArray.push(this);
        roles.push(this.role);
    }
}

class VikingRoom {
    constructor(options) {
        if (options == null) return 'Need room options';

        this.name = options.name;
        this.target = options.target;
        this.autobuilder = options.autobuilder;
        this.information = options.information || {};

        roomsArray.push(this);
    }
}

function generateBody(options, availableEnergy) {
    if (options == null) return 'Need room options';

    const roads = options.isForRoad || false;
    const skipCarry = options.skipCarry || false;
    const mustBe = options.mustBe || [];
    const moveParts = options.moveParts || true;
    const moveEach = options.moveEach || 1;
    const maxEnergy = options.maxEnergy || 50000;
    const priority = {};
    const pattern = options.pattern;
    let count = options.count || 50;

    let step = (roads === true) ?2 :1;
    step *= moveEach;
    let index = 0, moveIndex = 0;
    
    if (maxEnergy != 50000) availableEnergy = Math.min(maxEnergy, availableEnergy);

    const body = [];
    mustBe.forEach(b => {
        if ((moveParts === true) && (b != CARRY || !skipCarry)) {
            if (moveIndex == 0) {
                availableEnergy -= BODYPART_COST[MOVE];
                if (availableEnergy < BODYPART_COST[b]) return false;
                body.push(MOVE);
            }
            moveIndex = (moveIndex + 1) % step;
        }
        availableEnergy -= BODYPART_COST[b];
        if (availableEnergy < 0) return false;
        body.push(b);
        return;
    });
    while (body.length < 50 && count > 0) {
        if ((moveParts === true) && (pattern[index] != CARRY || !skipCarry)) {
            if (moveIndex == 0) {
                availableEnergy -= BODYPART_COST[MOVE];
                if (availableEnergy < BODYPART_COST[pattern[index]]) break;
                if (moveParts) body.push(MOVE);
            }
            moveIndex = (moveIndex + 1) % step;
        }
        availableEnergy -= BODYPART_COST[pattern[index]];
        if (availableEnergy < 0) break;
        body.push(pattern[index]);
        count--;
        index = (index + 1) % pattern.length;
    }
    return body.sort((a, b) => (priority[b] || _screeps.bodyPriority(b)) - (priority[a] || _screeps.bodyPriority(a)));
}

function spawnProcess(spawn, role, room) {
    if (spawn.spawning == null) {

        let creep;

        for (i in creepArray) {
            if (creepArray[i].role === role) {
                creep = creepArray[i];
                break;
            }
        }
        
        const body = generateBody(creep.body, spawn.room.energyCapacityAvailable);

        if (spawn.spawnCreep(body, creep.name, { memory: { role: creep.role, room: room.name } }) === 0) {
            _console.log("Spawn start spawn creep [" + role + "] in " + room.name)
            for (i in queue) {
                if (queue[i] && queue[i].Role == role && queue[i].Room == spawn.room.name) {
                    let CreepSpawn = queue.slice(i, i + 1);
                    let newList = [];
                    for (i in queue) if (queue[i] != CreepSpawn[0]) newList.push(queue[i])
                    queue = newList;
                }
            }
        }
    }
}

module.exports.loop = function() {
    if (_screeps.public() && Game.cpu.bucket > 5000) Game.cpu.generatePixel();
    
    
    memory();

    
    spawnCreeps()
    runCreeps()
};
