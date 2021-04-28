class _memory {
    static clear() {
        for (let i in Memory.creeps) {
            if (!Game.creeps[i]) delete Memory.creeps[i]
        }
    }

    static def() {
        if (!Memory.remoteRooms) Memory.remoteRooms = {};
        else Memory.remoteRooms = Memory.remoteRooms;
    }

    static run() {
        this.clear();
        this.def();
    }
}