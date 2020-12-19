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

        array.remoteRooms.push(this);
    }
}