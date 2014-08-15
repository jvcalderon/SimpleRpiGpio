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
 * Send signal to Rpi's GPIO pin number
 *
 * @param pinNumber
 * @param action bool (0 = LV | 1 = HV)
 */
SimpleRpiGpio.prototype.out = function (pinNumber, action) {

    var gpioNumber = this.pinMapping[pinNumber];

    if (gpioNumber != undefined) {
        child = exec('echo ' + action + ' > /sys/class/gpio/gpio' + gpioNumber + '/value',
            function (error) {
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
    }
    else {
        console.log(pinNumber + ' is not a valid pin number');
    }

};

module.exports = SimpleRpiGpio;
