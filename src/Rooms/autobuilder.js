// autobuilder.js

function getBuildingsPosition(x, y) {
    return buildingsPosition = {
        'RCL': {
            2: {
                "road":{"pos":[{"x":x,"y":y-1},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x,"y":y+1},{"x":x+3,"y":y+1}]},
                "spawn":{"pos":[{"x":x,"y":y}]},
                "extension":{"pos":[{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2}]}
            },
            3: {
                "road":{"pos":[{"x":x+3,"y":y-2},{"x":x,"y":y-1},{"x":x+2,"y":y-1},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x,"y":y+1},{"x":x+3,"y":y+1},{"x":x+4,"y":y+2}]},
                "extension":{"pos":[{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+4,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2}]},
                "spawn":{"pos":[{"x":x,"y":y}]},
                "tower":{"pos":[{"x":x+5,"y":y+3}]}
            },
            4: {
                "extension":{"pos":[{"x":x+4,"y":y-3},{"x":x+5,"y":y-3},{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+5,"y":y-1},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+5,"y":y},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+4,"y":y+1},{"x":x+5,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+5,"y":y+2},{"x":x+1,"y":y+3},{"x":x+2,"y":y+3},{"x":x+3,"y":y+3},{"x":x+4,"y":y+3}]},
                "road":{"pos":[{"x":x+1,"y":y-2},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2},{"x":x+5,"y":y-2},{"x":x,"y":y-1},{"x":x+2,"y":y-1},{"x":x+6,"y":y-1},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x+6,"y":y},{"x":x,"y":y+1},{"x":x+3,"y":y+1},{"x":x+6,"y":y+1},{"x":x,"y":y+2},{"x":x+4,"y":y+2},{"x":x+6,"y":y+2},{"x":x,"y":y+3},{"x":x+6,"y":y+3},{"x":x+1,"y":y+4},{"x":x+2,"y":y+4},{"x":x+3,"y":y+4},{"x":x+4,"y":y+4},{"x":x+5,"y":y+4}]},
                "storage":{"pos":[{"x":x+1,"y":y-1}]},
                "spawn":{"pos":[{"x":x,"y":y}]},
                "tower":{"pos":[{"x":x+5,"y":y+3}]}
            },
            5: {
                "extension":{"pos":[{"x":x+4,"y":y-7},{"x":x+2,"y":y-6},{"x":x+3,"y":y-6},{"x":x+5,"y":y-6},{"x":x+2,"y":y-5},{"x":x+4,"y":y-5},{"x":x+5,"y":y-5},{"x":x+3,"y":y-4},{"x":x+4,"y":y-4},{"x":x+5,"y":y-4},{"x":x+4,"y":y-3},{"x":x+5,"y":y-3},{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+5,"y":y-1},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+5,"y":y},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+4,"y":y+1},{"x":x+5,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+5,"y":y+2},{"x":x+1,"y":y+3},{"x":x+2,"y":y+3},{"x":x+3,"y":y+3},{"x":x+4,"y":y+3}]},
                "road":{"pos":[{"x":x+4,"y":y-6},{"x":x+3,"y":y-5},{"x":x+2,"y":y-4},{"x":x+2,"y":y-3},{"x":x+6,"y":y-3},{"x":x+1,"y":y-2},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2},{"x":x+5,"y":y-2},{"x":x,"y":y-1},{"x":x+2,"y":y-1},{"x":x+6,"y":y-1},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x+6,"y":y},{"x":x,"y":y+1},{"x":x+3,"y":y+1},{"x":x+6,"y":y+1},{"x":x,"y":y+2},{"x":x+4,"y":y+2},{"x":x+6,"y":y+2},{"x":x,"y":y+3},{"x":x+6,"y":y+3},{"x":x+1,"y":y+4},{"x":x+2,"y":y+4},{"x":x+3,"y":y+4},{"x":x+4,"y":y+4},{"x":x+5,"y":y+4},{"x":x+6,"y":y+4}]},
                "tower":{"pos":[{"x":x+3,"y":y-3},{"x":x+5,"y":y+3}]},
                "storage":{"pos":[{"x":x+1,"y":y-1}]},
                "spawn":{"pos":[{"x":x,"y":y}]}
            },
            6: {
                "road":{"pos":[{"x":x-1,"y":y-8},{"x":x,"y":y-8},{"x":x+1,"y":y-8},{"x":x+2,"y":y-8},{"x":x+3,"y":y-8},{"x":x+4,"y":y-8},{"x":x+5,"y":y-8},{"x":x+6,"y":y-8},{"x":x,"y":y-7},{"x":x+6,"y":y-7},{"x":x,"y":y-6},{"x":x+4,"y":y-6},{"x":x+6,"y":y-6},{"x":x-3,"y":y-5},{"x":x,"y":y-5},{"x":x+3,"y":y-5},{"x":x+6,"y":y-5},{"x":x-2,"y":y-4},{"x":x-1,"y":y-4},{"x":x+1,"y":y-4},{"x":x+2,"y":y-4},{"x":x+6,"y":y-4},{"x":x-2,"y":y-3},{"x":x+2,"y":y-3},{"x":x+6,"y":y-3},{"x":x-3,"y":y-2},{"x":x-1,"y":y-2},{"x":x+1,"y":y-2},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2},{"x":x+5,"y":y-2},{"x":x+6,"y":y-2},{"x":x-2,"y":y-1},{"x":x,"y":y-1},{"x":x+2,"y":y-1},{"x":x+6,"y":y-1},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x+6,"y":y},{"x":x,"y":y+1},{"x":x+3,"y":y+1},{"x":x+6,"y":y+1},{"x":x,"y":y+2},{"x":x+4,"y":y+2},{"x":x+6,"y":y+2},{"x":x,"y":y+3},{"x":x+6,"y":y+3},{"x":x+1,"y":y+4},{"x":x+2,"y":y+4},{"x":x+3,"y":y+4},{"x":x+4,"y":y+4},{"x":x+5,"y":y+4},{"x":x+6,"y":y+4}]},
                "extension":{"pos":[{"x":x-2,"y":y-7},{"x":x-1,"y":y-7},{"x":x+1,"y":y-7},{"x":x+2,"y":y-7},{"x":x+3,"y":y-7},{"x":x+4,"y":y-7},{"x":x-1,"y":y-6},{"x":x+1,"y":y-6},{"x":x+2,"y":y-6},{"x":x+3,"y":y-6},{"x":x+5,"y":y-6},{"x":x-1,"y":y-5},{"x":x+1,"y":y-5},{"x":x+2,"y":y-5},{"x":x+4,"y":y-5},{"x":x+5,"y":y-5},{"x":x+3,"y":y-4},{"x":x+4,"y":y-4},{"x":x+5,"y":y-4},{"x":x-3,"y":y-3},{"x":x+4,"y":y-3},{"x":x+5,"y":y-3},{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+5,"y":y-1},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+5,"y":y},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+4,"y":y+1},{"x":x+5,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+5,"y":y+2},{"x":x+1,"y":y+3},{"x":x+2,"y":y+3},{"x":x+3,"y":y+3},{"x":x+4,"y":y+3}]},
                "lab":{"pos":[{"x":x-3,"y":y-6},{"x":x-2,"y":y-6},{"x":x-2,"y":y-5}]},
                "tower":{"pos":[{"x":x+3,"y":y-3},{"x":x+5,"y":y+3}]},
                "container":{"pos":[{"x":x,"y":y-2}]},
                "terminal":{"pos":[{"x":x-1,"y":y-1}]},
                "storage":{"pos":[{"x":x+1,"y":y-1}]},
                "spawn":{"pos":[{"x":x,"y":y}]}
            },
            7: {
                "road":{"pos":[{"x":x-1,"y":y-8},{"x":x,"y":y-8},{"x":x+1,"y":y-8},{"x":x+2,"y":y-8},{"x":x+3,"y":y-8},{"x":x+4,"y":y-8},{"x":x+5,"y":y-8},{"x":x+6,"y":y-8},{"x":x,"y":y-7},{"x":x+6,"y":y-7},{"x":x-4,"y":y-6},{"x":x,"y":y-6},{"x":x+4,"y":y-6},{"x":x+6,"y":y-6},{"x":x-3,"y":y-5},{"x":x,"y":y-5},{"x":x+3,"y":y-5},{"x":x+6,"y":y-5},{"x":x-2,"y":y-4},{"x":x-1,"y":y-4},{"x":x+1,"y":y-4},{"x":x+2,"y":y-4},{"x":x+6,"y":y-4},{"x":x-2,"y":y-3},{"x":x,"y":y-3},{"x":x+2,"y":y-3},{"x":x+6,"y":y-3},{"x":x-3,"y":y-2},{"x":x-1,"y":y-2},{"x":x+1,"y":y-2},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2},{"x":x+5,"y":y-2},{"x":x+6,"y":y-2},{"x":x-2,"y":y-1},{"x":x,"y":y-1},{"x":x+2,"y":y-1},{"x":x+6,"y":y-1},{"x":x-2,"y":y},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x+6,"y":y},{"x":x-3,"y":y+1},{"x":x,"y":y+1},{"x":x+3,"y":y+1},{"x":x+6,"y":y+1},{"x":x-4,"y":y+2},{"x":x,"y":y+2},{"x":x+4,"y":y+2},{"x":x+6,"y":y+2},{"x":x,"y":y+3},{"x":x+6,"y":y+3},{"x":x-1,"y":y+4},{"x":x+1,"y":y+4},{"x":x+2,"y":y+4},{"x":x+3,"y":y+4},{"x":x+4,"y":y+4},{"x":x+5,"y":y+4},{"x":x+6,"y":y+4}]},
                "tower":{"pos":[{"x":x-5,"y":y-7},{"x":x+3,"y":y-3},{"x":x+5,"y":y+3}]},
                "extension":{"pos":[{"x":x-2,"y":y-7},{"x":x-1,"y":y-7},{"x":x+1,"y":y-7},{"x":x+2,"y":y-7},{"x":x+3,"y":y-7},{"x":x+4,"y":y-7},{"x":x-1,"y":y-6},{"x":x+1,"y":y-6},{"x":x+2,"y":y-6},{"x":x+3,"y":y-6},{"x":x+5,"y":y-6},{"x":x-1,"y":y-5},{"x":x+1,"y":y-5},{"x":x+2,"y":y-5},{"x":x+4,"y":y-5},{"x":x+5,"y":y-5},{"x":x+3,"y":y-4},{"x":x+4,"y":y-4},{"x":x+5,"y":y-4},{"x":x-4,"y":y-3},{"x":x-3,"y":y-3},{"x":x+4,"y":y-3},{"x":x+5,"y":y-3},{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+5,"y":y-1},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+5,"y":y},{"x":x-2,"y":y+1},{"x":x-1,"y":y+1},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+4,"y":y+1},{"x":x+5,"y":y+1},{"x":x-3,"y":y+2},{"x":x-2,"y":y+2},{"x":x-1,"y":y+2},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+5,"y":y+2},{"x":x-4,"y":y+3},{"x":x-3,"y":y+3},{"x":x-2,"y":y+3},{"x":x-1,"y":y+3},{"x":x+1,"y":y+3},{"x":x+2,"y":y+3},{"x":x+3,"y":y+3},{"x":x+4,"y":y+3}]},
                "lab":{"pos":[{"x":x-3,"y":y-6},{"x":x-2,"y":y-6},{"x":x-4,"y":y-5},{"x":x-2,"y":y-5},{"x":x-4,"y":y-4},{"x":x-3,"y":y-4}]},
                "container":{"pos":[{"x":x,"y":y-2}]},
                "spawn":{"pos":[{"x":x+2,"y":y-2},{"x":x,"y":y}]},
                "terminal":{"pos":[{"x":x-1,"y":y-1}]},
                "storage":{"pos":[{"x":x+1,"y":y-1}]}
            },
            8: {
                "road":{"pos":[{"x":x-6,"y":y-8},{"x":x-5,"y":y-8},{"x":x-4,"y":y-8},{"x":x-3,"y":y-8},{"x":x-2,"y":y-8},{"x":x-1,"y":y-8},{"x":x,"y":y-8},{"x":x+1,"y":y-8},{"x":x+2,"y":y-8},{"x":x+3,"y":y-8},{"x":x+4,"y":y-8},{"x":x+5,"y":y-8},{"x":x+6,"y":y-8},{"x":x-6,"y":y-7},{"x":x,"y":y-7},{"x":x+6,"y":y-7},{"x":x-6,"y":y-6},{"x":x-4,"y":y-6},{"x":x,"y":y-6},{"x":x+4,"y":y-6},{"x":x+6,"y":y-6},{"x":x-6,"y":y-5},{"x":x-3,"y":y-5},{"x":x,"y":y-5},{"x":x+3,"y":y-5},{"x":x+6,"y":y-5},{"x":x-6,"y":y-4},{"x":x-2,"y":y-4},{"x":x-1,"y":y-4},{"x":x+1,"y":y-4},{"x":x+2,"y":y-4},{"x":x+6,"y":y-4},{"x":x-6,"y":y-3},{"x":x-2,"y":y-3},{"x":x,"y":y-3},{"x":x+2,"y":y-3},{"x":x+6,"y":y-3},{"x":x-6,"y":y-2},{"x":x-5,"y":y-2},{"x":x-4,"y":y-2},{"x":x-3,"y":y-2},{"x":x-1,"y":y-2},{"x":x+1,"y":y-2},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2},{"x":x+5,"y":y-2},{"x":x+6,"y":y-2},{"x":x-6,"y":y-1},{"x":x-2,"y":y-1},{"x":x,"y":y-1},{"x":x+2,"y":y-1},{"x":x+6,"y":y-1},{"x":x-6,"y":y},{"x":x-2,"y":y},{"x":x-1,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x+6,"y":y},{"x":x-6,"y":y+1},{"x":x-3,"y":y+1},{"x":x,"y":y+1},{"x":x+3,"y":y+1},{"x":x+6,"y":y+1},{"x":x-6,"y":y+2},{"x":x-4,"y":y+2},{"x":x,"y":y+2},{"x":x+4,"y":y+2},{"x":x+6,"y":y+2},{"x":x-6,"y":y+3},{"x":x,"y":y+3},{"x":x+6,"y":y+3},{"x":x-6,"y":y+4},{"x":x-5,"y":y+4},{"x":x-4,"y":y+4},{"x":x-3,"y":y+4},{"x":x-2,"y":y+4},{"x":x-1,"y":y+4},{"x":x,"y":y+4},{"x":x+1,"y":y+4},{"x":x+2,"y":y+4},{"x":x+3,"y":y+4},{"x":x+4,"y":y+4},{"x":x+5,"y":y+4},{"x":x+6,"y":y+4}]},
                "tower":{"pos":[{"x":x-5,"y":y-7},{"x":x+5,"y":y-7},{"x":x+3,"y":y-3},{"x":x-3,"y":y-1},{"x":x-5,"y":y+3},{"x":x+5,"y":y+3}]},
                "lab":{"pos":[{"x":x-4,"y":y-7},{"x":x-3,"y":y-7},{"x":x-5,"y":y-6},{"x":x-3,"y":y-6},{"x":x-2,"y":y-6},{"x":x-5,"y":y-5},{"x":x-4,"y":y-5},{"x":x-2,"y":y-5},{"x":x-4,"y":y-4},{"x":x-3,"y":y-4}]},
                "extension":{"pos":[{"x":x-2,"y":y-7},{"x":x-1,"y":y-7},{"x":x+1,"y":y-7},{"x":x+2,"y":y-7},{"x":x+3,"y":y-7},{"x":x+4,"y":y-7},{"x":x-1,"y":y-6},{"x":x+1,"y":y-6},{"x":x+2,"y":y-6},{"x":x+3,"y":y-6},{"x":x+5,"y":y-6},{"x":x-1,"y":y-5},{"x":x+1,"y":y-5},{"x":x+2,"y":y-5},{"x":x+4,"y":y-5},{"x":x+5,"y":y-5},{"x":x-5,"y":y-4},{"x":x+3,"y":y-4},{"x":x+4,"y":y-4},{"x":x+5,"y":y-4},{"x":x-5,"y":y-3},{"x":x-4,"y":y-3},{"x":x-3,"y":y-3},{"x":x+4,"y":y-3},{"x":x+5,"y":y-3},{"x":x-5,"y":y-1},{"x":x-4,"y":y-1},{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+5,"y":y-1},{"x":x-5,"y":y},{"x":x-4,"y":y},{"x":x-3,"y":y},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+5,"y":y},{"x":x-5,"y":y+1},{"x":x-4,"y":y+1},{"x":x-2,"y":y+1},{"x":x-1,"y":y+1},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+4,"y":y+1},{"x":x+5,"y":y+1},{"x":x-5,"y":y+2},{"x":x-3,"y":y+2},{"x":x-2,"y":y+2},{"x":x-1,"y":y+2},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+5,"y":y+2},{"x":x-4,"y":y+3},{"x":x-3,"y":y+3},{"x":x-2,"y":y+3},{"x":x-1,"y":y+3},{"x":x+1,"y":y+3},{"x":x+2,"y":y+3},{"x":x+3,"y":y+3},{"x":x+4,"y":y+3}]},
                "spawn":{"pos":[{"x":x,"y":y-4},{"x":x+2,"y":y-2},{"x":x,"y":y}]},
                "nuker":{"pos":[{"x":x-1,"y":y-3}]},
                "observer":{"pos":[{"x":x+1,"y":y-3}]},
                "powerSpawn":{"pos":[{"x":x-2,"y":y-2}]},
                "container":{"pos":[{"x":x,"y":y-2}]},
                "terminal":{"pos":[{"x":x-1,"y":y-1}]},
                "storage":{"pos":[{"x":x+1,"y":y-1}]}
            }
        },
        'Ramparts': {
            "pos":[{"x":x-6,"y":y-8},{"x":x-5,"y":y-8},{"x":x-4,"y":y-8},{"x":x-3,"y":y-8},{"x":x-2,"y":y-8},{"x":x-1,"y":y-8},{"x":x,"y":y-8},{"x":x+1,"y":y-8},{"x":x+2,"y":y-8},{"x":x+3,"y":y-8},{"x":x+4,"y":y-8},{"x":x+5,"y":y-8},{"x":x+6,"y":y-8},{"x":x-6,"y":y-7},{"x":x-5,"y":y-7},{"x":x-4,"y":y-7},{"x":x-3,"y":y-7},{"x":x-2,"y":y-7},{"x":x-1,"y":y-7},{"x":x,"y":y-7},{"x":x+1,"y":y-7},{"x":x+2,"y":y-7},{"x":x+3,"y":y-7},{"x":x+4,"y":y-7},{"x":x+5,"y":y-7},{"x":x+6,"y":y-7},{"x":x-6,"y":y-6},{"x":x-5,"y":y-6},{"x":x-4,"y":y-6},{"x":x-3,"y":y-6},{"x":x-2,"y":y-6},{"x":x-1,"y":y-6},{"x":x,"y":y-6},{"x":x+1,"y":y-6},{"x":x+2,"y":y-6},{"x":x+3,"y":y-6},{"x":x+4,"y":y-6},{"x":x+5,"y":y-6},{"x":x+6,"y":y-6},{"x":x-6,"y":y-5},{"x":x-5,"y":y-5},{"x":x-4,"y":y-5},{"x":x-3,"y":y-5},{"x":x-2,"y":y-5},{"x":x-1,"y":y-5},{"x":x,"y":y-5},{"x":x+1,"y":y-5},{"x":x+2,"y":y-5},{"x":x+3,"y":y-5},{"x":x+4,"y":y-5},{"x":x+5,"y":y-5},{"x":x+6,"y":y-5},{"x":x-6,"y":y-4},{"x":x-5,"y":y-4},{"x":x-4,"y":y-4},{"x":x-3,"y":y-4},{"x":x-2,"y":y-4},{"x":x-1,"y":y-4},{"x":x,"y":y-4},{"x":x+1,"y":y-4},{"x":x+2,"y":y-4},{"x":x+3,"y":y-4},{"x":x+4,"y":y-4},{"x":x+5,"y":y-4},{"x":x+6,"y":y-4},{"x":x-6,"y":y-3},{"x":x-5,"y":y-3},{"x":x-4,"y":y-3},{"x":x-3,"y":y-3},{"x":x-2,"y":y-3},{"x":x-1,"y":y-3},{"x":x,"y":y-3},{"x":x+1,"y":y-3},{"x":x+2,"y":y-3},{"x":x+3,"y":y-3},{"x":x+4,"y":y-3},{"x":x+5,"y":y-3},{"x":x+6,"y":y-3},{"x":x-6,"y":y-2},{"x":x-5,"y":y-2},{"x":x-4,"y":y-2},{"x":x-3,"y":y-2},{"x":x-2,"y":y-2},{"x":x-1,"y":y-2},{"x":x,"y":y-2},{"x":x+1,"y":y-2},{"x":x+2,"y":y-2},{"x":x+3,"y":y-2},{"x":x+4,"y":y-2},{"x":x+5,"y":y-2},{"x":x+6,"y":y-2},{"x":x-6,"y":y-1},{"x":x-5,"y":y-1},{"x":x-4,"y":y-1},{"x":x-3,"y":y-1},{"x":x-2,"y":y-1},{"x":x-1,"y":y-1},{"x":x,"y":y-1},{"x":x+1,"y":y-1},{"x":x+2,"y":y-1},{"x":x+3,"y":y-1},{"x":x+4,"y":y-1},{"x":x+5,"y":y-1},{"x":x+6,"y":y-1},{"x":x-6,"y":y},{"x":x-5,"y":y},{"x":x-4,"y":y},{"x":x-3,"y":y},{"x":x-2,"y":y},{"x":x-1,"y":y},{"x":x,"y":y},{"x":x+1,"y":y},{"x":x+2,"y":y},{"x":x+3,"y":y},{"x":x+4,"y":y},{"x":x+5,"y":y},{"x":x+6,"y":y},{"x":x-6,"y":y+1},{"x":x-5,"y":y+1},{"x":x-4,"y":y+1},{"x":x-3,"y":y+1},{"x":x-2,"y":y+1},{"x":x-1,"y":y+1},{"x":x,"y":y+1},{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+3,"y":y+1},{"x":x+4,"y":y+1},{"x":x+5,"y":y+1},{"x":x+6,"y":y+1},{"x":x-6,"y":y+2},{"x":x-5,"y":y+2},{"x":x-4,"y":y+2},{"x":x-3,"y":y+2},{"x":x-2,"y":y+2},{"x":x-1,"y":y+2},{"x":x,"y":y+2},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2},{"x":x+4,"y":y+2},{"x":x+5,"y":y+2},{"x":x+6,"y":y+2},{"x":x-6,"y":y+3},{"x":x-5,"y":y+3},{"x":x-4,"y":y+3},{"x":x-3,"y":y+3},{"x":x-2,"y":y+3},{"x":x-1,"y":y+3},{"x":x,"y":y+3},{"x":x+1,"y":y+3},{"x":x+2,"y":y+3},{"x":x+3,"y":y+3},{"x":x+4,"y":y+3},{"x":x+5,"y":y+3},{"x":x+6,"y":y+3},{"x":x-6,"y":y+4},{"x":x-5,"y":y+4},{"x":x-4,"y":y+4},{"x":x-3,"y":y+4},{"x":x-2,"y":y+4},{"x":x-1,"y":y+4},{"x":x,"y":y+4},{"x":x+1,"y":y+4},{"x":x+2,"y":y+4},{"x":x+3,"y":y+4},{"x":x+4,"y":y+4},{"x":x+5,"y":y+4},{"x":x+6,"y":y+4}]
        }
    }
}

/**
 *
 */
function BuildInRoom(room) {
    const mySpawns = room.find(FIND_MY_SPAWNS);

    const x = mySpawns[0].pos.x;
    const y = mySpawns[0].pos.y;

    const source = room.find(FIND_SOURCES);
    const path1 = PathFinder.search(mySpawns[0].pos, {pos: source[0].pos, range: 1})
    const path2 = PathFinder.search(mySpawns[0].pos, {pos: source[1].pos, range: 1})
    const containers = [path1.path[path1.path.length - 1], path2.path[path2.path.length - 1]];

    //const RCL2 = {"extension":{"pos":[{"x":x+1,"y":y+1},{"x":x+2,"y":y+1},{"x":x+1,"y":y+2},{"x":x+2,"y":y+2},{"x":x+3,"y":y+2}]},"road":{"pos":[{"x":x,"y":y+1},{"x":x+1,"y":y},{"x":x,"y":y-1},{"x":x-1,"y":y},{"x":x+2,"y":y},{"x":x+4,"y":y+1}]}}

    const buildingsPosition = getBuildingsPosition(x, y);

    for (i in buildingsPosition['RCL'][mySpawns[0].room.controller.level]) {
        for (j in buildingsPosition['RCL'][mySpawns[0].room.controller.level][i]['pos']) {
            room.createConstructionSite(buildingsPosition['RCL'][mySpawns[0].room.controller.level][i]['pos'][j]['x'], buildingsPosition['RCL'][mySpawns[0].room.controller.level][i]['pos'][j]['y'], i)
        }
    }
    //for (i in RCL2['extension']['pos']) {
    //    room.createConstructionSite(RCL2['extension']['pos'][i].x, RCL2['extension']['pos'][i].y, STRUCTURE_EXTENSION)
    //}
    if (room.controller.level >= 2) for (i in containers) room.createConstructionSite(containers[i], STRUCTURE_CONTAINER);
}

function CheckStructures(room, basicStructures) {
    let spawnsState;
    let extensionsState;
    let towersState;
    let storageState;
    let terminalState;
    let containerState;

    if (basicStructures.spawns) {
        const spawns = room.find(FIND_MY_SPAWNS);
        if (spawns.length < basicStructures.spawns) spawnsState = false;
        else spawnsState = true;
    } else spawnsState = true;

    if (basicStructures.extensions) {
        const extensions = room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_EXTENSION});
        if (extensions.length < basicStructures.extensions) extensionsState = false;
        else extensionsState = true;
    } else extensionsState = true;

    if (basicStructures.towers) {
        const towers = room.find(FIND_MY_STRUCTURES, {filter: s => s.structureType == STRUCTURE_TOWER});
        if (towers.length < towers.extensions) towersState = false;
        else towersState = true;
    } else towersState = true;

    if (basicStructures.storage) {
        if (!room.storage) storageState = false;
        else storageState = true;
    } else storageState = true;

    if (basicStructures.terminal) {
        if (!room.terminal) terminalState = false;
        else terminalState = true;
    } else terminalState = true;

    //if (basicStructures.container) {
    //    if (!room.terminal) terminalState = false;
    //    else terminalState = true;
    //} else terminalState = true;

    if (!spawnsState || !extensionsState || !towersState || !storageState ||
        !terminalState || !containerState) {
            BuildInRoom(room);
        }
}

/**
 * @param {Object} room
 */
function RCL2RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns: 1,
            extensions: 5,
            container: 2
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL3RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:10,
            towers:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL4RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:20,
            towers:1,
            storage:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL5RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:30,
            towers:2,
            storage:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL6RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:1,
            extensions:40,
            towers:2,
            storage:1,
            terminal:1,
            lab:3,
            container:1,
            extractor:1
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL7RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:2,
            extensions:50,
            towers:3,
            storage:1,
            terminal:1,
            lab:6,
            container:1,
            extractor:1,
        }

        CheckStructures(room, basicStructures);
    }
}

function RCL8RoomBuilder(room) {
    if (!room.memory.build) {
        const basicStructures = {
            spawns:3,
            extensions:60,
            towers:6,
            storage:1,
            terminal:1,
            lab:10,
            container:1,
            extractor:1,
            observer:1,
            powerSpawn:1,
            nuker:1
        }

        CheckStructures(room, basicStructures);
    }
}

/**
 * @param {Object} room
 */
function Autobuild(room) {
    switch(room.controller.level) {
        case 2:
            if (Game.time%21===20) RCL2RoomBuilder(room)
            break;
        case 3:
            if (Game.time%21===20) RCL3RoomBuilder(room)
            break;
        case 4:
            if (Game.time%21===20) RCL4RoomBuilder(room)
            break;
        case 5:
            if (Game.time%21===20) RCL5RoomBuilder(room)
            break;
        case 6:
            if (Game.time%21===20) RCL6RoomBuilder(room)
            break;
        case 7:
            if (Game.time%21===20) RCL7RoomBuilder(room)
            break;
        case 8:
            if (Game.time%21===20) RCL8RoomBuilder(room)
            break;
    }
}