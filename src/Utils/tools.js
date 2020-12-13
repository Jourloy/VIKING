// Tools.js

class _console {
    static log(message) {
        console.log(`<p style="color: grey">[LOG] ${message}</p>`)
    }
    static warning(message) {
        console.log(`<p style="color: orange">[WARNING] ${message}</p>`)
    }
    static error(message) {
        console.log(`<p style="color: red">[ERROR] ${message}</p>`)
    }
}

class _screeps {
    static getUsername() {
        for (let i in Game.rooms) {
            let room = Game.rooms[i];
            if (room.controller && room.controller.my) return room.controller.owner.username;
        }
        return ERR_USERNAME;
    }
    static public() {
        return Game.shard.name.includes('shard');
    }
}

class _viking {
    static defenceDirection(dir) {
        switch (dir) {
            case TOP: return BOTTOM;
            case TOP_LEFT: return BOTTOM_RIGHT;
            case LEFT: return RIGHT;
            case BOTTOM_LEFT: return TOP_RIGHT;
            case BOTTOM: return TOP;
            case BOTTOM_RIGHT: return TOP_LEFT;
            case RIGHT: return LEFT;
            case TOP_RIGHT: return BOTTOM_LEFT;
        }
    }
    static bodyPriority(bodyPart) {
        switch (bodyPart) {
            case HEAL: return -1;
            case MOVE: return 2;
            case RANGED_ATTACK: return 1;
            case ATTACK: return 0;
            case WORK: return 7;
            case TOUGH: return 10;
            default: return 5;
        }
    }
}

class _tool {
    static generateString(length) {
        const chars = '0123456789abcdefghij';
        let result = '';
        for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}