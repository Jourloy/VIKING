StructureTower.prototype.findHostileCreeps = function () {
    const tower = this;
    return tower.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
        filter: (creep) => {
            return (!friends.includes(creep.owner.username) && creep.owner.username !== 'JOURLOY')
        }
    })
};