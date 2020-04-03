// Logging start here

class logging {
    /**
    * @param {string} message
    */
    static info(message) {
        console.log(`<p style="color: grey">[LOG] ${message}</p>`)
    }

    /**
    * @param {string} message
    */
    static warning(message) {
        console.log(`<p style="color: orange">[WARNING] ${message}</p>`)
    }

    /**
    * @param {string} message
    */
    static error(message) {
        console.log(`<p style="color: red">[ERROR] ${message}</p>`)
    }
}
