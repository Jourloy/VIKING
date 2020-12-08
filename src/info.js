/**
 *
 *
 * _____________________ Screeps AI _____________________
 * @VIKING_repository: https://github.com/Jourloy/VIKING
 * @author: JOURLOY
 *
 */

 /**
  * How add new creep role:
  * 
  * 1. Create Creep's file
  * 2. Create Creep's info (look example)
  * 3. Create Creep's role (look example)
  * 4. Add Creep's role in memory in SetMemory.js
  * 5. Add Creep's info in creepInfo in CreepManager.js
  * 6. Add Creep's role in startCreep in CreepManager.js
  */

  /**
   * EXAMPLE of Creep's info
   */
  const RoleInfo = {
    name:'VIKING [role]', // string
    role:'role', // string
    pattern:[WORK,CARRY], // Any body parts
    count:25, // 25 max
    mustBe:[], // Any body parts
    isForRoad:false, // true or false
    useBoost:null, // only null now
    moveParts:false, // true or false
    skipCarry:false, // true or false
}

/**
 * EXAMPLE of Creep's role
 */
const exampleRole = {
    /**
     * @param {Creep} creep
     */
    control(creep) {
        if (creep.room.name == creep.memory.room) {
            // WORK
        } else {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room), moveParams);
        }
    }
}