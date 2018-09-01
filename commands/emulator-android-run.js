
const { exec } = require('child_process');
const { isEmpty, get } = require('lodash');
const inquirer = require('inquirer');
const chalk = require('chalk');

/**
 * Returns the available avds
 *
 * @return {Promise<string[]>} : Available avds
 */
function getAvailableAvds() {
    return new Promise((resolve, reject) => {
        exec('emulator -list-avds', (error, stdout) => {
            const avds = stdout.split('\n').filter(line => !isEmpty(line));

            if (error) {
                return reject(error);
            }

            return resolve(avds);
        });
    });
}

/**
 * Starts the avd
 *
 * @param {string} avd : string : The avd to start
 * @return {void}
 */
function startAvd(avd) {
    const emulatorProcess = exec(
        `\${ANDROID_HOME}/emulator/emulator -avd ${avd} -partition-size 512 -writable-system`,
        (error) => {
            if (error) {
                throw error;
            }
        },
    );

    emulatorProcess.stdout.pipe(process.stdout);
    emulatorProcess.stderr.pipe(process.stderr);
}

/**
 * emulator:android:run
 *
 * @param {Object} options : Object : The parsed options from process.argv
 * @param {Object} config : Object : The configuration from ~/.nodexec/config.json
 * @param {Object} command : Object : The exported command from this directory
 * @returns {void}
 */
function emulatorAndroidRun(options, config, command) {
    getAvailableAvds()
    .then((avds) => {
        if (isEmpty(avds)) {
            console.log(chalk.red('No avd set up. Please set up an Android Virtual Device first'));
        }

        if (avds.length > 1) {
            const interactivePrompt = inquirer.createPromptModule();
            interactivePrompt([
                {
                    type: 'list',
                    name: 'avd',
                    message: 'Which avd do you want to start?',
                    default: avds[0],
                    choices: avds,
                },
            ])
            .then(
                (inputAnswers) => {
                    startAvd(get(inputAnswers, 'avd', avds[0]));
                },
                (err) => {
                    throw err;
                },
            );
        }
    });
}

module.exports = {
    name: 'emulator:android:run',
    command: emulatorAndroidRun,
    description: 'Runs an android emulator',
    scope: '/emulator',
    aliases: [],
};
