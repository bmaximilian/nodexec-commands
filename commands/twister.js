
const { isEmpty } = require('lodash');
const chalk = require('chalk');

/**
 * twister
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function twister(options, config, command) {
    const colors = [
        {
            label: 'grün',
            colorize: chalk.green,
        },
        {
            label: 'gelb',
            colorize: chalk.yellow,
        },
        {
            label: 'rot',
            colorize: chalk.red,
        },
        {
            label: 'blau',
            colorize: chalk.blue,
        },
    ];

    const bodyParts = [
        'Rechter Fuß',
        'Linker Fuß',
        'Rechte Hand',
        'Linke Hand',
    ];

    const players = [
        'Max',
        'Maya',
    ];

    let currentPlayer = 0;
    process.stdin.on('data', () => {
        const name = players[currentPlayer];

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomBodyPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];

        if (!isEmpty(name)) {
            console.log(`${name}: ${randomBodyPart} auf ${randomColor.colorize(randomColor.label)}`);
        } else {
            console.log(`${randomBodyPart} auf ${randomColor.colorize(randomColor.label)}`);
        }
        console.log();

        currentPlayer = currentPlayer + 1 < players.length ? currentPlayer + 1 : 0;
    });
}

module.exports = {
    name: 'twister',
    command: twister,
    description: '',
    scope: '/game',
    aliases: [],
};
