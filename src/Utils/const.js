// const.js

const creepArray = [];
let roomsArray = [];
const roles = [];
let queue = [];

const information = {
    username: {
        my: 'JOURLOY',
        your: 'soon'
    },
    roomSign: 'VIKING',
}

const colors = {
    CONSTRUCTION_SITE: '#78997a',
    RESOURCE_ENERGY: '#fee56d'
}

const refillStructuresArray = [STRUCTURE_EXTENSION, STRUCTURE_SPAWN, STRUCTURE_TOWER]

const friends = ['JOURLOY'];

const ERR_ROOM_WITHOUT_CONTROLLER = 'ERR_ROOM_WITHOUT_CONTROLLER';
const ERR_ROOM_HOSTILE_CONTROLLER = 'ERR_ROOM_HOSTILE_CONTROLLER';
const ERR_ROOM_WAS_CREATED = 'ERR_ROOM_WAS_CREATED';
const ERR_ROOM_NOT_FOUND = 'ERR_ROOM_NOT_FOUND';
const ERR_ARGS = 'ERR_ARGS';
const ERR_USERNAME = 'ERR_USERNAME';
const ERR_ROOM_INFORMATION_NOT_FOUND = 'ERR_ROOM_INFORMATION_NOT_FOUND';

const EXIT_TOP = 1;
const EXIT_RIGHT = 3;
const EXIT_BOTTOM = 5;
const EXIT_LEFT = 7;

const asciiLogoSmall = [`_    _ ___ _ _ ___ _  _ ____`,
` \\  /   |  |/   |  |\\ | | __`,
`  \\/   _|_ |\\_ _|_ | \\| |__/`
]