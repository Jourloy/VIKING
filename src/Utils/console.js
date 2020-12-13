class _vikingConsole {
    static toColums(descr) {
        let width = 0;

        for (let i in descr) if (i.length > width) width = i.length;
        width += 1;

        let msg = [];
        for (let i in descr) {
            const widthStr = i.length;
            msg.push(`${i}${' '.repeat(width - widthStr)}${descr[i]}`);
        }
        return msg;
    }

    static help() {
        let msg = '\n<font color="#ff0000">';
        for (let line of asciiLogoSmall) {
            msg += line + '\n';
        }
        msg += '</font>';
        let descr = {};

        descr['help'] = '- show this message';
        descr['info'] = '- Print information about all your rooms. Add \'.help()\' to get more information';
        descr['convert'] = '- Convert ticks to real time. Add \'.help()\' to get more information';
        descr['creeps'] = '- Calculate cost and time of build creep. Add \'.help()\' to get more information';

        let descrMsg = this.toColums(descr);
        msg += descrMsg.join('\n');
        msg += '\n\nRefer to the repository for more information\n';
        return msg;
    }
}