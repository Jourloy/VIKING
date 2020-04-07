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

    // const roads
    // TODO:
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
