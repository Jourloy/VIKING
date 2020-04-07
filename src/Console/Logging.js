// Logging start here

/**
 * Print in console message with [LOG] mark with grey color
 *
 * @param {string} message
 */
function logging(message) {
    console.log(`<p style="color: grey">[LOG] ${message}</p>`)
}

/**
 * Print in console message with [WARNING] mark with orange color
 *
 * @param {string} message
 */
function warning(message) {
    console.log(`<p style="color: orange">[WARNING] ${message}</p>`)
}

/**
 * Print in console message with [ERROR] mark with red color
 *
 * @param {string} message
 */
function error(message) {
    console.log(`<p style="color: red">[ERROR] ${message}</p>`)
}
