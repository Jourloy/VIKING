function CheckStructures(room, basicStructures) {
    let spawnsState;
    let extensionsState;
    let towersState;
    let storageState;
    let terminalState;

    if (basicStructures.spawns) {
        const spawns = room.find(FIND_MY_SPAWNS);
        if (spawns.length < basicStructures.spawns) spawnsState = false;
        else spawnsState = true;
    } else spawnsState = true;

    if (basicStructures.extensions) {
        const extensions = room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_EXTENSION});
        if (extensions.length < basicStructures.extensions) extensionsState = false;
        else extensionsState = true;
    } else extensionsState = true;

    if (basicStructures.towers) {
        const towers = room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER});
        if (towers.length < towers.extensions) towersState = false;
        else towersState = true;
    } else towersState = true;

    if (basicStructures.storage) {
        if (!room.storage) storageState = false;
        else storageState = true;
    } else storageState = true;
    
    if (basicStructures.terminal) {
        if (!room.terminal) terminalState = false;
        else terminalState = true;
    } else terminalState = true;
}
/**
 * @param {Object} room
 */
function RCL2RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:5
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL3RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:10,
            towers:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL4RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:20,
            towers:1,
            storage:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL5RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:30,
            towers:2,
            storage:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL6RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:40,
            towers:2,
            storage:1,
            terminal:1,
            lab:3,
            container:1,
            extractor:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL7RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:2,
            extensions:50,
            towers:3,
            storage:1,
            terminal:1,
            lab:6,
            container:1,
            extractor:1,
            factory:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL8RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:3,
            extensions:60,
            towers:6,
            storage:1,
            terminal:1,
            lab:10,
            container:1,
            extractor:1,
            factory:1,
            powerSpawn:1,
            nuker:1
        }

        CheckStructures(room, basicStructures);
    }
}

/**
 * @param {Object} room
 */
function Autobuild(room) {
    switch(room.controller.level) {
        switch 2:
            if (Game.time%21===20) RCL2RoomBuilder(room)
            break;
    }
}
