class _sandbox {
    static code() {
        
    }

    static run() {
        const cpu = Game.cpu.getUsed();
        const check = this.code();
        const cpu1 = Game.cpu.getUsed();
        if (check === true) _console.log(`Sandbox code used ${cpu1-cpu}cpu`);
    }
}