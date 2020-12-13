class _memory {
    static clear() {
        for (let i in Memory.creeps) {
            if (!Game.creeps[i]) delete Memory.creeps[i]
        }
    }

    static run() {
        this.clear();
    }
}