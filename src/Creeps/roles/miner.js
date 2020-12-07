// miner.js

const miner = new VikingCreep({
    role: 'miner',
    body: {
        pattern: [WORK],
        count: 5,
        mustBe: [CARRY],
        moveParts: false,
    }
});

miner.run = (creep) => {
    // Logic
}