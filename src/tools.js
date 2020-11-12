// Tools.js

const _ = {
    /**
     * @return {boolean}
     */
    public: () => Game.shard.name.includes('shard'),
    /**
     * @param {number} length 
     */
    generateString: function(length) {
        const chars = '0123456789abcdefghij';
        let result = '';
        for (let i = 0; i < length; i++) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },
}

const _screeps = {
    information: function() {
        return {
            username: {
                my: 'JOURLOY',
                your: 'soon'
            },
            roomSign: 'VIKING',
        }
    },
    colors: function() {
        return {
            CONSTRUCTION_SITE: '#78997a',
            RESOURCE_ENERGY: '#fee56d'
        }
    },
    friends: function() {
        return [
            'JOURLOY',
        ]
    },
    defenceDirection: function(direction) {
        switch (direction) {
            case TOP: return BOTTOM;
            case TOP_LEFT: return BOTTOM_RIGHT;
            case LEFT: return RIGHT;
            case BOTTOM_LEFT: return TOP_RIGHT;
            case BOTTOM: return TOP;
            case BOTTOM_RIGHT: return TOP_LEFT;
            case RIGHT: return LEFT;
            case TOP_RIGHT: return BOTTOM_LEFT;
        }
    },
    bodyPriority: function(bodyPart) {
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