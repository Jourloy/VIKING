class _creep {
    constructor(options) {
        if (options == null) options = {};
        const moveParams = {
            heuristicWeight: 1.2, 
            ignoreCreeps: true, 
            reusePath: 50,
        };

        const travelParams = {}

        this.name = `Viking | ${options.role} | ` || `Viking | Prototype | `;
        this.role = options.role || 'creep';
        this.moveParams = options.moveParams || moveParams;
        this.travelParams = options.travelParams || travelParams;
        this.state = options.state || null;
        this.body = options.body || null;

        array.creep.push(this);
        roles.push(this.role);
    }
}

class _room {
    constructor(options) {
        if (options == null) return ERR_ARGS;

        this.name = options.name;
        this.target = options.target;
        this.autobuilder = options.autobuilder;
        this.information = options.information || {};

        array.rooms.push(this);
    }
}

class _remoteRoom {
    constructor(options) {
        if (options == null) return ERR_ARGS;

        this.name = options.name;
        this.exit = options.exit;
        this.master = options.master;
        this.ban = options.ban || false;

        array.remoteRooms.push(this);
    }
}

class _sort {
    static body(bodyPart) {
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

    static constructionSites(structure) {
        switch (structure) {
            case STRUCTURE_SPAWN: return 30;
            case STRUCTURE_TOWER: return 25;
            case STRUCTURE_RAMPART: return 20;
            case STRUCTURE_WALL: return 15;
            case STRUCTURE_EXTENSION: return 10;
            case STRUCTURE_STORAGE: 6;
            case STRUCTURE_ROAD: return 0;
            case STRUCTURE_LAB: return -30;
            default: return 5;
        }
    }

    static creep(role) {
        switch (role) {
            case 'worker': return 100;
            case 'miner': return 90;
            case 'transporter': return 80;
            case 'repairer': return 70;
            case 'renamer': return -90;
            case 'seller': return -100;
            default: 0
        }
    }
}