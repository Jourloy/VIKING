// Main.js

/* module.exports.loop = function() {
    if (_screeps.public() && Game.cpu.bucket > 5000) Game.cpu.generatePixel();

    Tower.run();
    _room.run();

    for (i in Memory.creeps) {
        if (!Game.creeps[i]) delete Memory.creeps[i]
    }

    spawnCreeps()
    runCreeps()
    for (i in roomsArray) {
        const room = Game.rooms[roomsArray[i].name];
        Autobuild(room)
    }
}; */

function main() {
    _room.run();
    _creeps.run();
    _tower.run();

    for (i in Memory.creeps) {
        if (!Game.creeps[i]) delete Memory.creeps[i]
    }

    for (i in roomsArray) {
        const room = Game.rooms[roomsArray[i].name];
        Autobuild(room)
    }
}

exports.loop = main();
