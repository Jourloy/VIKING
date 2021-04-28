// Main.js

function main() {
    if (_screeps.public() && Game.cpu.bucket === 10000 && _viking.redFlags() === false) Game.cpu.generatePixel();

    _memory.run();
    _rooms.run();
    _creeps.run();
    _tower.run();
    _sandbox.run();
}

exports.loop = main();