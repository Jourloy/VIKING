// property.js

/* CONTAINER */

Object.defineProperty(StructureContainer.prototype, 'energy', {
    get: function() {
        return this.store[RESOURCE_ENERGY];
    },
    configurable: true,
});
Object.defineProperty(StructureContainer.prototype, 'isFull', {
    get: function() {
        return _.sum(this.store) >= this.store.getCapacity();
    },
    configurable: true,
});
Object.defineProperty(StructureExtension.prototype, 'isEmpty', {
    get: function() {
        return _.sum(this.store) == 0;
    },
    configurable: true,
});

/* CONTROLLER */

Object.defineProperty(StructureController.prototype, 'reservedByMe', {
    get: function() {
        return this.reservation && this.reservation.username === _screeps.getUsername();
    },
    configurable: true,
});
Object.defineProperty(StructureController.prototype, 'signedByMe', {
    get: function () {
        return this.sign && this.sign.text === SIGN;
    },
    configurable: true,
});
Object.defineProperty(StructureController.prototype, 'signedByScreeps', {
    get: function () {
        return this.sign && this.sign.username === 'Screeps';
    },
    configurable: true,
});

/* EXTENSION */

Object.defineProperty(StructureExtension.prototype, 'isFull', {
    get: function() {
        return this.store[RESOURCE_ENERGY] >= this.store.getCapacity(RESOURCE_ENERGY);
    },
    configurable: true,
});
Object.defineProperty(StructureExtension.prototype, 'isEmpty', {
    get: function() {
        return this.store[RESOURCE_ENERGY] == 0;
    },
    configurable: true,
});

/* EXTRACTOR */
/* FACTORY */
/* LAB */
/* LINK */
/* NUKER */

/* SPAWN */

Object.defineProperty(StructureSpawn.prototype, 'isFull', {
    get: function() {
        return this.store[RESOURCE_ENERGY] >= this.store.getCapacity(RESOURCE_ENERGY);
    },
    configurable: true,
});
Object.defineProperty(StructureSpawn.prototype, 'isEmpty', {
    get: function() {
        return this.store[RESOURCE_ENERGY] == 0;
    },
    configurable: true,
});

/* STORAGE */

Object.defineProperty(StructureStorage.prototype, 'energy', {
    get: function() {
        return this.store[RESOURCE_ENERGY];
    },
    configurable: true,
});
Object.defineProperty(StructureStorage.prototype, 'isFull', {
    get: function() {
        return _.sum(this.store) >= this.store.getCapacity();
    },
    configurable: true,
});
Object.defineProperty(StructureStorage.prototype, 'isEmpty', {
    get: function() {
        return _.sum(this.store) == 0;
    },
    configurable: true,
});

/* TERMINAL */

Object.defineProperty(StructureTerminal.prototype, 'isFull', {
    get: function() {
        return _.sum(this.store) >= this.store.getCapacity();
    },
    configurable: true,
});
Object.defineProperty(StructureTerminal.prototype, 'isEmpty', {
    get: function() {
        return _.sum(this.store) == 0;
    },
    configurable: true,
});

/* TOWER */

Object.defineProperty(StructureTower.prototype, 'isFull', {
    get: function() {
        return this.store[RESOURCE_ENERGY] >= this.store.getCapacity(RESOURCE_ENERGY);
    },
    configurable: true,
});
Object.defineProperty(StructureTower.prototype, 'isEmpty', {
    get: function() {
        return this.store[RESOURCE_ENERGY] == 0;
    },
    configurable: true,
});

/* CREEP */

Object.defineProperty(Creep.prototype, 'isMy', {
    get: function() {
        return this.owner.username === _screeps.getUsername();
    },
    configurable: true,
});

Object.defineProperty(Creep.prototype, 'inBirthRoom', {
    get: function() {
        return this.memory.birthRoom === this.room.name;
    },
    configurable: true,
});

/* ROOM */

Object.defineProperty(Room.prototype, 'isMy', {
    get: function() {
        return this.controller && this.controller.my;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'owner', {
    get: function() {
        this.controller && this.controller.owner ? this.controller.owner.username : undefined;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'reservedByMe', {
    get: function() {
        return this.controller && this.controller.reservation && this.controller.reservation.username == _screeps.getUsername();
    },
    configurable: true,
});

/**
 * @deprecated
 */
Object.defineProperty(Room.prototype, 'hostileCreeps', {
    get: function() {
        if (!this._hostileCreeps) {
            this._hostileCreeps = this.find(FIND_HOSTILE_CREEPS, creep => !friends.includes(creep.owner.username));
        }
        return this._hostileCreeps;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'hostiles', {
    get: function() {
        if (!this._hostiles) {
            this._hostiles = this.find(FIND_HOSTILE_CREEPS, creep => !friends.includes(creep.owner.username));
        }
        return this._hostiles;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'invaders', {
    get: function() {
        if (!this._invaders) {
            this._invaders = _.filter(this.hostiles, (creep) => creep.owner.username == 'Invader');
        }
        return this._invaders;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'sourceKeepers', {
    get: function() {
        if (!this._sourceKeepers) {
            this._sourceKeepers = _.filter(this.hostiles, (creep) => creep.owner.username == 'Source Keeper');
        }
        return this._sourceKeepers;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'playerHostiles', {
    get: function() {
        if (!this._playerHostiles) {
            this._playerHostiles = _.filter(this.hostiles, (creep) => creep.owner.username != 'Invader'
                && creep.owner.username != 'Source Keeper');
        }
        return this._playerHostiles;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'dangerousHostiles', {
    get: function() {
        if (!this._dangerousHostiles) {
            if (this.my) {
                this._dangerousHostiles = _.filter(this.hostiles, (creep) => creep.getActiveBodyparts(ATTACK) > 0
                    || creep.getActiveBodyparts(WORK) > 0
                    || creep.getActiveBodyparts(RANGED_ATTACK) > 0
                    || creep.getActiveBodyparts(HEAL) > 0);
            }
            else {
                this._dangerousHostiles = _.filter(this.hostiles, (creep) => creep.getActiveBodyparts(ATTACK) > 0
                    || creep.getActiveBodyparts(RANGED_ATTACK) > 0
                    || creep.getActiveBodyparts(HEAL) > 0);
            }
        }
        return this._dangerousHostiles;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'dangerousPlayerHostiles', {
    get: function() {
        if (!this._dangerousPlayerHostiles) {
            this._dangerousPlayerHostiles = _.filter(this.playerHostiles, (c) => c.getActiveBodyparts(ATTACK) > 0
                || c.getActiveBodyparts(WORK) > 0
                || c.getActiveBodyparts(RANGED_ATTACK) > 0
                || c.getActiveBodyparts(HEAL) > 0);
        }
        return this._dangerousPlayerHostiles;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'structures', {
    get: function() {
        if (!this._allStructures) {
            this._allStructures = this.find(FIND_STRUCTURES);
        }
        return this._allStructures;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'hostileStructures', {
    get: function() {
        if (!this._hostileStructures) {
            this._hostileStructures = this.find(FIND_HOSTILE_STRUCTURES, { filter: (s) => s.hitsMax });
        }
        return this._hostileStructures;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'constructionSites', {
    get: function() {
        if (!this._constructionSites) {
            this._constructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
        }
        return this._constructionSites.sort((a, b) => (_sort.constructionSites(b.structureType) - _sort.constructionSites(a.structureType)));
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'tombstones', {
    get: function() {
        if (!this._tombstones) {
            this._tombstones = this.find(FIND_TOMBSTONES);
        }
        return this._tombstones;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'ruins', {
    get: function() {
        if (!this._ruins) {
            this._ruins = this.find(FIND_RUINS);
        }
        return this._ruins;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'drops', {
    get: function() {
        if (!this._drops) {
            this._drops = _.groupBy(this.find(FIND_DROPPED_RESOURCES), (r) => r.resourceType);
        }
        return this._drops;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'droppedEnergy', {
    get: function() {
        return this.drops[RESOURCE_ENERGY] || [];
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'droppedPower', {
    get: function() {
        return this.drops[RESOURCE_POWER] || [];
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'information', {
    get: function() {
        for (i in array.rooms) {
            if (array.rooms[i].name === this.name) return array.rooms[i].information;
        }
        return ERR_ROOM_INFORMATION_NOT_FOUND
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'exits', {
    get: function() {
        return Game.map.describeExits(this.name);
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'fastUpgrade', {
    get: function() {
        const flags = this.find(FIND_FLAGS);
        for (let i in flags) {
            const flag = flags[i];

            if (flag.color === COLOR_WHITE && flag.secondaryColor === COLOR_PURPLE) return true;
        }
        return false;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'capital', {
    get: function() {
        if (Game.flags.capital && Game.flags.capital.room == this) return true;
        return false;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'remote', {
    get: function() {
        const remote = [];

        for (let i in Memory.remoteRooms) {
            if (Memory.remoteRooms[i].master === this.name) remote.push(Memory.remoteRooms[i]);
        }

        return remote;
    },
    configurable: true,
});

Object.defineProperty(Room.prototype, 'defenseFlag', {
    get: function() {
        let flags = this.find(FIND_FLAGS);
        flags = flags.filter(flag => (flag.color === COLOR_RED && flag.secondaryColor === COLOR_WHITE));
        return flags;
    },
    configurable: true,
});

/* CONSOLE */

Object.defineProperty(global, 'help', {
    get: function() {
        return _vikingConsole.help();
    },
    configurable: true,
});