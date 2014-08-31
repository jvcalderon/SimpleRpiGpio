/**
 * SimpleRpiGpio is a very simple class to Raspberry PI's GPIO port usage
 *
 * @author José Vte. Calderón Cabrera <jvcalcab@gmail.com>
 */

var exec = require('child_process').exec,
    child;

var SimpleRpiGpio = function () {
    this.__construct();
};

SimpleRpiGpio.prototype.__construct = function () {
    //Pin > gpio mapping "pinMapping[pinNumber] = idGpio"
    this.pinMapping = new Array();
    this.pinMapping[3] = 2;
    this.pinMapping[5] = 3;
    this.pinMapping[7] = 4;
    this.pinMapping[8] = 14;
    this.pinMapping[10] = 15;
    this.pinMapping[11] = 17;
    this.pinMapping[12] = 18;
    this.pinMapping[13] = 27;
    this.pinMapping[15] = 22;
    this.pinMapping[16] = 23;
    this.pinMapping[18] = 24;
    this.pinMapping[19] = 10;
    this.pinMapping[21] = 9;
    this.pinMapping[22] = 25;
    this.pinMapping[23] = 11;
    this.pinMapping[24] = 8;
    this.pinMapping[26] = 7;
};

/**
 * open method open a GPIO pin. This action is needed before read or write
 *
 * @param pinNumber
 * @param direction in or out
 */
SimpleRpiGpio.prototype.open = function (pinNumber, direction) {

    var gpioNumber = this.getGpioNumber(pinNumber);

    if (gpioNumber !== false &&
        (direction == 'in' || direction == 'out')) {
        this.exec(
            'echo ' + gpioNumber + ' > /sys/class/gpio/unexport; ' +
                'echo ' + gpioNumber + ' > /sys/class/gpio/export; ' +
                'echo ' + direction + ' > /sys/class/gpio/gpio' + gpioNumber + '/direction'
        );
    }
    else {
        console.log('Only allowed "in" or "out" values for direction');
    }
};

/**
 * openAll method open all GPIO pins with same direction
 *
 * @param direction in or out
 */
SimpleRpiGpio.prototype.openAll = function (direction) {
    for (pinNumber in this.pinMapping) {
        if (this.pinMapping.hasOwnProperty(pinNumber)) {
            this.open(pinNumber, direction);
        }
    }
};

/**
 * out method sends signal to Rpi's GPIO pin number
 *
 * @param pinNumber
 * @param action bool (0 = LV | 1 = HV)
 */
SimpleRpiGpio.prototype.out = function (pinNumber, action) {
    var gpioNumber = this.getGpioNumber(pinNumber);
    if (gpioNumber !== false) {
        this.exec('echo ' + action + ' > /sys/class/gpio/gpio' + gpioNumber + '/value');
    }
};

/**
 * exec method executes a UNIX command
 *
 * @param command
 */
SimpleRpiGpio.prototype.exec = function (command) {
    child = exec(command,
        function (error) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
};

/**
 * Get the GPIO number associated to pin number
 *
 * @param pinNumber
 * @returns false when pinNumber is not valid
 */
SimpleRpiGpio.prototype.getGpioNumber = function (pinNumber) {
    var gpioNumber = this.pinMapping[pinNumber];
    if (gpioNumber != undefined) {
        return gpioNumber;
    }
    console.log(pinNumber + ' is not a valid pin number');
    return false;
};

module.exports = new SimpleRpiGpio;
