#! /usr/bin/evn node

// Reset a USB device
//
// Based on http://askubuntu.com/questions/645/how-do-you-reset-a-usb-device-from-the-command-line
// Which is in turn based on http://marc.info/?l=linux-usb&m=121459435621262&w=2

var debug = require('debug')('usbreset');
var usb = require('usb');
var fs = require('fs');
var ioctl = require('ioctl');

var usbreset = function () {
    this._USBDEVFS_RESET = 0x5514;
};

usbreset.prototype.reset = function (VID, PID) {
    // find USB device
    var device = usb.findByIds(VID,PID);
    var bus_num = ('000' + device.busNumber).slice(-3);
    var device_addr = ('000' + device.deviceAddress).slice(-3);
    var usb_path = '/dev/bus/usb/' + bus_num + '/' + device_addr;
    debug("USB path: " + usb_path);

    // open device file for writing
    var usb_fd = fs.openSync(usb_path, 'w');
    if (usb_fd < 0) {
        return "ERROR: Invalid descriptor for USB device file";
    }

    // reset the USB device
    var error = ioctl(usb_fd, this._USBDEVFS_RESET);
    if (error) {
        return "ERROR: ioctl returned " + error;
    }

    // close file
    fs.close(usb_fd);
};

module.exports = new usbreset();
