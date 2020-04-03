// Logging start here

/**
* @param {string} message
*/
function logging(message) {
    console.log(`<p style="color: grey">[LOG] ${message}</p>`)
}

/**
* @param {string} message
*/
function warning(message) {
    console.log(`<p style="color: orange">[WARNING] ${message}</p>`)
}

/**
* @param {string} message
*/
function error(message) {
    console.log(`<p style="color: red">[ERROR] ${message}</p>`)
}

/**
* @param {string} message
*/
function info(message) {
    console.log(`<p style="color: white">[INFO] ${message}</p>`)
}
