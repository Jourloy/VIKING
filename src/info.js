/**
 *
 *
 * _____________________ VIKING _____________________
 * @repository: https://github.com/Jourloy/VIKING
 * @author: JOURLOY
 *
 */

 /**
  * How add new creep role:
  */

class VikingCreep {
    constructor(options) {
        if (options == null) options = {};
        const moveParams = {
            heuristicWeight: 1.2, 
            ignoreCreeps: true, 
            reusePath: 50,
        };

        const travelParams = {}

        this.name = `Viking | ${options.name} | ` || `Viking | Prototype | s`;
        this.role = options.role || 'creep';
        this.moveParams = options.moveParams || moveParams;
        this.travelParams = options.travelParams || travelParams;
        this.state = options.state || null;
        this.body = options.body || null;

        creepArray.push(this);
        roles.push(this.role);
    }
}

class VikingRoom {
    constructor(options) {
        if (options == null) return ERR_ARGS;

        this.name = options.name;
        this.target = options.target;
        this.autobuilder = options.autobuilder;
        this.information = options.information || {};

        roomsArray.push(this);
    }
}